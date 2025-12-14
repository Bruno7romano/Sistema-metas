'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FormNovaMeta } from '@/componentes/formularioNovaMeta'
import { FormEditarMeta } from '@/componentes/formularioEditarMeta'

type Meta = {
  id: number
  titulo: string
  responsavel: string
  categoria: string
  prazo: string
  status: string
  progresso: number
}

export default function Home() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [loading, setLoading] = useState(true)
  const [metaEditando, setMetaEditando] = useState<Meta | null>(null)

  useEffect(() => {
    buscarMetas()
  }, [])

  async function buscarMetas() {
    try {
      const { data, error } = await supabase
        .from('metas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar metas:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        return
      }

      setMetas(data || [])
    } catch (error) {
      console.error('Erro ao buscar metas:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deletarMeta(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta meta?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('metas')
        .delete()
        .eq('id', id)

      if (error) {
        alert('Erro ao deletar meta: ' + error.message)
        return
      }

      alert('✅ Meta deletada com sucesso!')
      buscarMetas()
    } catch (error) {
      console.error('Erro ao deletar meta:', error)
      alert('Erro ao deletar meta')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando metas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Metas 2026 - Bruno & Zaira
          </h1>
          <p className="text-gray-600">
            Nossa jornada de crescimento e conquistas juntos 🚀
          </p>
        </div>

        <div className="mb-6">
          <FormNovaMeta onMetaAdicionada={buscarMetas} />
        </div>

        {metaEditando && (
          <FormEditarMeta
            meta={metaEditando}
            onCancelar={() => setMetaEditando(null)}
            onMetaEditada={() => {
              buscarMetas()
              setMetaEditando(null)
            }}
          />
        )}

        {metas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">Nenhuma meta cadastrada ainda.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {metas.map(meta => (
              <CardMeta
                key={meta.id}
                {...meta}
                onEditar={() => setMetaEditando(meta)}
                onDeletar={() => deletarMeta(meta.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CardMeta({ titulo, responsavel, categoria, prazo, status, progresso, onEditar, onDeletar }: Omit<Meta, 'id'> & { onEditar: () => void, onDeletar: () => void }) {
  const coresStatus: Record<string, string> = {
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Pendente': 'bg-red-100 text-red-800',
    'Concluída': 'bg-green-100 text-green-800',
  }

  const coresCategorias: Record<string, string> = {
    'Saúde': 'bg-blue-100 text-blue-800',
    'Carreira': 'bg-orange-100 text-orange-800',
    'Financeiro': 'bg-green-100 text-green-800',
    'Lazer': 'bg-pink-100 text-pink-800',
    'Espiritualidade': 'bg-purple-100 text-purple-800',
  }

  // Formatar data brasileira
  const dataFormatada = new Date(prazo + 'T00:00:00').toLocaleDateString('pt-BR')

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{titulo}</h3>
        <div className="flex gap-2 items-center">
          <button
            onClick={onEditar}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            ✏️ Editar
          </button>
          <button
            onClick={onDeletar}
            className="text-gray-600 hover:text-red-600 transition-colors p-1"
            title="Deletar meta"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${coresStatus[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {responsavel.split(',').map((resp, i) => (
          <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            {resp.trim()}
          </span>
        ))}
        <span className={`px-3 py-1 rounded-full text-sm ${coresCategorias[categoria] || 'bg-gray-100 text-gray-800'}`}>
          📁 {categoria}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        📅 Prazo: {dataFormatada}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progresso</span>
          <span className="font-semibold text-gray-900">{progresso}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </div>
  )
}
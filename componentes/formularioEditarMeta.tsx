'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Meta = {
  id: number
  titulo: string
  responsavel: string
  categoria: string
  prazo: string
  status: string
  progresso: number
}

type FormEditarMetaProps = {
  meta: Meta
  onMetaEditada: () => void
  onCancelar: () => void
}

export function FormEditarMeta({ meta, onMetaEditada, onCancelar }: FormEditarMetaProps) {
  const [salvando, setSalvando] = useState(false)
  
  const [titulo, setTitulo] = useState(meta.titulo)
  const [responsavel, setResponsavel] = useState(meta.responsavel)
  const [categoria, setCategoria] = useState(meta.categoria)
  const [prazo, setPrazo] = useState(meta.prazo)
  const [status, setStatus] = useState(meta.status)
  const [progresso, setProgresso] = useState(meta.progresso)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)

    try {
      const { error } = await supabase
        .from('metas')
        .update({
          titulo,
          responsavel,
          categoria,
          prazo,
          status,
          progresso
        })
        .eq('id', meta.id)

      if (error) {
        alert('Erro ao editar meta: ' + error.message)
        return
      }

      alert('✅ Meta atualizada com sucesso!')
      onMetaEditada()
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao editar meta')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">✏️ Editar Meta</h2>
            <button
              onClick={onCancelar}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Meta *
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Responsável */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsável *
              </label>
              <select
                required
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                <option value="Bruno">Bruno</option>
                <option value="Zaira">Zaira</option>
                <option value="Bruno, Zaira">Bruno e Zaira</option>
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Saúde">🏥 Saúde</option>
                <option value="Carreira">💼 Carreira</option>
                <option value="Financeiro">💰 Financeiro</option>
                <option value="Lazer">🎮 Lazer</option>
                <option value="Espiritualidade">🙏 Espiritualidade</option>
              </select>
            </div>

            {/* Prazo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo *
              </label>
              <input
                type="date"
                required
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pendente">⏸️ Pendente</option>
                <option value="Em andamento">⏳ Em andamento</option>
                <option value="Concluída">✅ Concluída</option>
              </select>
            </div>

            {/* Progresso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progresso: {progresso}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progresso}
                onChange={(e) => setProgresso(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancelar}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={salvando}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
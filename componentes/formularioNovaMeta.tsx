'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type FormNovametaProps = {
  onMetaAdicionada: () => void
}

export function FormNovaMeta({ onMetaAdicionada }: FormNovametaProps) {
  const [aberto, setAberto] = useState(false)
  const [salvando, setSalvando] = useState(false)
  
  const [titulo, setTitulo] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [categoria, setCategoria] = useState('Saúde')
  const [prazo, setPrazo] = useState('')
  const [status, setStatus] = useState('Pendente')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)

    try {
      const { error } = await supabase
        .from('metas')
        .insert([
          {
            titulo,
            responsavel,
            categoria,
            prazo,
            status,
            progresso: 0
          }
        ])

      if (error) {
        alert('Erro ao adicionar meta: ' + error.message)
        return
      }

      // Limpar formulário
      setTitulo('')
      setResponsavel('')
      setCategoria('Saúde')
      setPrazo('')
      setStatus('Pendente')
      
      // Fechar modal
      setAberto(false)
      
      // Atualizar lista
      onMetaAdicionada()
      
      alert('✅ Meta adicionada com sucesso!')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao adicionar meta')
    } finally {
      setSalvando(false)
    }
  }

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        Adicionar Nova Meta
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🎯 Nova Meta</h2>
            <button
              onClick={() => setAberto(false)}
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
                placeholder="Ex: Perder 5kg"
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

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={salvando}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {salvando ? 'Salvando...' : 'Adicionar Meta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default function Home() {
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

        <div className="grid gap-4">
          <CardMeta 
            titulo="Perder 5kg"
            responsavel="Bruno"
            categoria="Saúde"
            prazo="31/07/2026"
            status="Em andamento"
            progresso={40}
          />
          
          <CardMeta 
            titulo="Tirar carteira de motorista"
            responsavel="Zaira"
            categoria="Carreira"
            prazo="30/06/2026"
            status="Pendente"
            progresso={0}
          />
          
          <CardMeta 
            titulo="Economizar R$ 20.000"
            responsavel="Bruno, Zaira"
            categoria="Financeiro"
            prazo="31/12/2026"
            status="Em andamento"
            progresso={25}
          />

          <CardMeta
            titulo="Dar de comer para Exu/pomba gira"
            responsavel="Bruno"
            categoria="Espiritualidade"
            prazo="30/12/2025"
            status="Pendente"
            progresso={0}
          />
        </div>
      </div>
    </div>
  )
}

function CardMeta({ titulo, responsavel, categoria, prazo, status, progresso }: {
  titulo: string
  responsavel: string
  categoria: string
  prazo: string
  status: string
  progresso: number
}) {
  const coresStatus = {
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Pendente': 'bg-red-100 text-red-800',
    'Concluída': 'bg-green-100 text-green-800',
  }

  const coresCategorias = {
    'Saúde': 'bg-blue-100 text-blue-800',
    'Carreira': 'bg-orange-100 text-orange-800',
    'Financeiro': 'bg-green-100 text-green-800',
    'Lazer': 'bg-pink-100 text-pink-800',
    'Espiritual': 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{titulo}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${coresStatus[status as keyof typeof coresStatus]}`}>
          {status}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        {responsavel.split(',').map((resp, i) => (
          <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            {resp.trim()}
          </span>
        ))}
        <span className={`px-3 py-1 rounded-full text-sm ${coresCategorias[categoria as keyof typeof coresCategorias]}`}>
          📁 {categoria}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        📅 Prazo: {prazo}
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

import { requireAuth } from '@/lib/auth'
import { getDataByEmail } from '@/lib/googleSheets'
import { calculateDashboard } from '@/lib/dashboardCalculations'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import ProfileCard from '@/components/ProfileCard'

export default async function PerfilPage() {
  const session = await requireAuth()
  const email = session.user.email!

  const records = await getDataByEmail(email)
  const data = calculateDashboard(records)

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
      <div>
        <p className="text-gray-600 text-sm">Sua Performance</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Meu Perfil</h1>
      </div>

      <ProfileCard
        nome={data.user.nome}
        cargo={data.user.cargo}
        email={email}
        fotoUrl={data.user.foto_url}
        userId={session.user.id}
      />

      <div className="bg-cppem-card border border-cppem-border rounded-2xl p-6">
        <h3 className="text-white font-bold mb-5">Resumo do Mês</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Total Vendido', value: formatCurrency(data.totalVendido) },
            { label: 'Meta Mensal', value: formatCurrency(data.metaMensal) },
            { label: '% da Meta', value: formatPercent(data.percentualMeta) },
            { label: 'Total de Vendas', value: String(data.totalQuantidade) },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-cppem-bg rounded-xl p-4 border border-cppem-border"
            >
              <p className="text-gray-600 text-xs mb-1">{item.label}</p>
              <p className="text-white font-black text-lg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

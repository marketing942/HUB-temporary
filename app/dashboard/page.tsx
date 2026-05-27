import { requireAuth } from '@/lib/auth'
import { getDataByEmail } from '@/lib/googleSheets'
import { calculateDashboard } from '@/lib/dashboardCalculations'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import DashboardCard from '@/components/DashboardCard'
import SalesChart from '@/components/SalesChart'
import GoalProgress from '@/components/GoalProgress'
import EmptyState from '@/components/EmptyState'
import DailySalesTable from '@/components/DailySalesTable'
import { DollarSign, Target, TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react'

export const revalidate = 300

export default async function DashboardPage() {
  const session = await requireAuth()
  const email = session.user.email!

  const records = await getDataByEmail(email)
  const data = calculateDashboard(records)

  const hasData = data.vendasPorDia.length > 0
  const firstName = data.user.nome?.split(' ')[0] ?? ''

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header da página */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm">Missão do mês</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {firstName ? `Olá, ${firstName}!` : 'Seu Dashboard'}
          </h1>
          {data.user.cargo && (
            <p className="text-gray-500 text-sm mt-0.5">{data.user.cargo}</p>
          )}
        </div>
        <div className="hidden sm:block px-4 py-2.5 rounded-xl bg-cppem-card border border-cppem-border text-right">
          <p className="text-xs text-gray-600">Atualizado em</p>
          <p className="text-sm text-cppem-neon font-semibold">
            {new Date(data.ultimaAtualizacao).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {!hasData ? (
        <EmptyState
          title="Nenhuma venda registrada"
          description="Seus dados de vendas ainda não foram lançados na planilha. Quando forem, aparecerão aqui automaticamente."
        />
      ) : (
        <>
          {/* Cards KPI */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Vendido"
              value={formatCurrency(data.totalVendido)}
              subtitle="Resultado acumulado"
              icon={DollarSign}
              color="green"
            />
            <DashboardCard
              title="Meta do Mês"
              value={formatCurrency(data.metaMensal)}
              subtitle="Missão do mês"
              icon={Target}
              color="gold"
            />
            <DashboardCard
              title="% da Meta"
              value={formatPercent(data.percentualMeta)}
              subtitle={
                data.percentualMeta >= 100
                  ? 'Meta atingida!'
                  : 'Continue avançando'
              }
              icon={
                data.percentualMeta >= 50 ? TrendingUp : TrendingDown
              }
              color={
                data.percentualMeta >= 100
                  ? 'green'
                  : data.percentualMeta >= 50
                  ? 'gold'
                  : 'red'
              }
            />
            <DashboardCard
              title="Ticket Médio"
              value={formatCurrency(data.ticketMedio)}
              subtitle={`${data.totalQuantidade} venda${data.totalQuantidade !== 1 ? 's' : ''}`}
              icon={ShoppingCart}
              color="blue"
            />
          </div>

          {/* Barra de progresso */}
          <GoalProgress
            totalVendido={data.totalVendido}
            metaMensal={data.metaMensal}
            percentual={data.percentualMeta}
          />

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart
              data={data.vendasPorDia}
              title="Evolução Diária de Vendas"
              dataKey="totalValue"
              defaultType="bar"
            />
            <SalesChart
              data={data.vendasPorDia}
              title="% da Meta Acumulada"
              dataKey="percentage"
              defaultType="area"
              unit="%"
            />
          </div>

          {/* Tabela de vendas por dia */}
          <DailySalesTable data={data.vendasPorDia} />
        </>
      )}
    </div>
  )
}

import { SaleRecord, DailySales, DashboardData } from '@/types'
import { normalizeDate, formatDisplayDate } from './formatters'

export function calculateDashboard(records: SaleRecord[]): DashboardData {
  const empty: DashboardData = {
    user: { nome: '', cargo: '', email: '' },
    totalVendido: 0,
    metaMensal: 0,
    percentualMeta: 0,
    ticketMedio: 0,
    totalQuantidade: 0,
    vendasPorDia: [],
    ultimaAtualizacao: new Date().toISOString(),
  }

  if (!records.length) return empty

  const first = records[0]
  const user = {
    nome: first.nome,
    cargo: first.cargo,
    email: first.email,
    foto_url: first.foto_url,
  }

  const totalVendido = records.reduce((sum, r) => sum + r.valor_venda, 0)
  const totalQuantidade = records.reduce((sum, r) => sum + r.quantidade_vendas, 0)
  // Pega a meta mais recente
  const metaMensal = records.find(r => r.meta_mensal > 0)?.meta_mensal ?? 0
  const percentualMeta = metaMensal > 0 ? (totalVendido / metaMensal) * 100 : 0
  const ticketMedio = totalQuantidade > 0 ? totalVendido / totalQuantidade : 0

  // Agrupa por data
  const byDate: Record<string, { value: number; qty: number }> = {}
  for (const r of records) {
    const date = normalizeDate(r.data)
    if (!date) continue
    if (!byDate[date]) byDate[date] = { value: 0, qty: 0 }
    byDate[date].value += r.valor_venda
    byDate[date].qty += r.quantidade_vendas
  }

  const sortedDates = Object.keys(byDate).sort()
  let cumulative = 0

  const vendasPorDia: DailySales[] = sortedDates.map((date, i) => {
    const curr = byDate[date].value
    const prev = i > 0 ? byDate[sortedDates[i - 1]].value : null
    const growth =
      prev !== null && prev > 0 ? ((curr - prev) / prev) * 100 : 0
    cumulative += curr

    return {
      date,
      displayDate: formatDisplayDate(date),
      totalValue: curr,
      quantity: byDate[date].qty,
      percentage: metaMensal > 0 ? (cumulative / metaMensal) * 100 : 0,
      growth,
    }
  })

  return {
    user,
    totalVendido,
    metaMensal,
    percentualMeta,
    ticketMedio,
    totalQuantidade,
    vendasPorDia,
    ultimaAtualizacao: new Date().toISOString(),
  }
}

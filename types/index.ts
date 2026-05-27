export interface SaleRecord {
  email: string
  nome: string
  cargo: string
  data: string
  produto: string
  valor_venda: number
  quantidade_vendas: number
  meta_mensal: number
  etapa?: string
  observacao?: string
  foto_url?: string
}

export interface DailySales {
  date: string
  displayDate: string
  totalValue: number
  quantity: number
  percentage: number
  growth: number
}

export interface DashboardData {
  user: {
    nome: string
    cargo: string
    email: string
    foto_url?: string
  }
  totalVendido: number
  metaMensal: number
  percentualMeta: number
  ticketMedio: number
  totalQuantidade: number
  vendasPorDia: DailySales[]
  ultimaAtualizacao: string
}

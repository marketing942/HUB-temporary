import { formatCurrency, formatPercent } from '@/lib/formatters'
import { Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoalProgressProps {
  totalVendido: number
  metaMensal: number
  percentual: number
}

function getMessage(pct: number): string {
  if (pct >= 100) return 'Meta atingida! Missão cumprida.'
  if (pct >= 75) return 'Ótimo ritmo! Continue avançando.'
  if (pct >= 50) return 'Meta em andamento. Acelere o passo!'
  if (pct >= 25) return 'Missão exige mais velocidade. Vai que vai!'
  return 'Começar é a metade do caminho. Foco total!'
}

function getColors(pct: number) {
  if (pct >= 100) return { bar: 'bg-cppem-green', text: 'text-cppem-neon' }
  if (pct >= 75) return { bar: 'bg-cppem-gold', text: 'text-cppem-gold' }
  if (pct >= 50) return { bar: 'bg-yellow-400', text: 'text-yellow-400' }
  return { bar: 'bg-red-500', text: 'text-red-400' }
}

export default function GoalProgress({
  totalVendido,
  metaMensal,
  percentual,
}: GoalProgressProps) {
  const clamped = Math.min(percentual, 100)
  const { bar, text } = getColors(percentual)

  return (
    <div className="bg-cppem-card border border-cppem-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cppem-gold" />
          <h3 className="text-white font-bold">Meta em Andamento</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cppem-bg border border-cppem-border">
          <Zap className="w-3.5 h-3.5 text-cppem-gold" />
          <span className={cn('font-black text-sm', text)}>
            {formatPercent(percentual)}
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mb-5">
        <div className="h-3 bg-cppem-bg rounded-full border border-cppem-border overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-1000 ease-out', bar)}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-gray-600 text-xs mb-0.5">Realizado</p>
          <p className="text-white font-black text-lg">
            {formatCurrency(totalVendido)}
          </p>
        </div>
        <p className="text-gray-600 text-xs italic">{getMessage(percentual)}</p>
        <div className="text-right">
          <p className="text-gray-600 text-xs mb-0.5">Meta</p>
          <p className="text-cppem-gold font-black text-lg">
            {formatCurrency(metaMensal)}
          </p>
        </div>
      </div>
    </div>
  )
}

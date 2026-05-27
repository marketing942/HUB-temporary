import { DailySales } from '@/types'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react'

interface DailySalesTableProps {
  data: DailySales[]
}

export default function DailySalesTable({ data }: DailySalesTableProps) {
  const sorted = [...data].reverse()

  return (
    <div className="bg-cppem-card border border-cppem-border rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <BarChart2 className="w-5 h-5 text-cppem-neon" />
        <h3 className="text-white font-bold">Vendas por Dia</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 border-b border-cppem-border text-xs uppercase tracking-wider">
              <th className="pb-3 text-left font-medium">Data</th>
              <th className="pb-3 text-right font-medium">Vendas</th>
              <th className="pb-3 text-right font-medium">Qtd</th>
              <th className="pb-3 text-right font-medium">% Meta</th>
              <th className="pb-3 text-right font-medium">Crescimento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cppem-border/40">
            {sorted.map((day, i) => (
              <tr
                key={i}
                className="hover:bg-cppem-surface/20 transition-colors"
              >
                <td className="py-3 text-gray-300 font-semibold">
                  {day.displayDate}
                </td>
                <td className="py-3 text-right text-cppem-neon font-bold">
                  {formatCurrency(day.totalValue)}
                </td>
                <td className="py-3 text-right text-gray-500">
                  {day.quantity}
                </td>
                <td className="py-3 text-right text-gray-400">
                  {formatPercent(day.percentage)}
                </td>
                <td className="py-3 text-right">
                  {day.growth === 0 ? (
                    <span className="text-gray-600">—</span>
                  ) : day.growth > 0 ? (
                    <span className="text-cppem-neon inline-flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{formatPercent(day.growth)}
                    </span>
                  ) : (
                    <span className="text-red-400 inline-flex items-center justify-end gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {formatPercent(day.growth)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

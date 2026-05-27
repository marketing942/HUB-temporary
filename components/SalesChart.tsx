'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { DailySales } from '@/types'
import { BarChart2, TrendingUp, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

type ChartType = 'bar' | 'line' | 'area'

interface SalesChartProps {
  data: DailySales[]
  title: string
  dataKey: keyof DailySales
  defaultType?: ChartType
  unit?: string
}

const CHART_TYPES: { id: ChartType; icon: React.ElementType; label: string }[] = [
  { id: 'bar', icon: BarChart2, label: 'Barras' },
  { id: 'line', icon: TrendingUp, label: 'Linha' },
  { id: 'area', icon: Activity, label: 'Área' },
]

const TOOLTIP_STYLE = {
  backgroundColor: '#0a1a0a',
  border: '1px solid #1a3a1a',
  borderRadius: '10px',
  color: '#f0f0f0',
  fontSize: '12px',
}

export default function SalesChart({
  data,
  title,
  dataKey,
  defaultType = 'bar',
  unit = '',
}: SalesChartProps) {
  const [type, setType] = useState<ChartType>(defaultType)

  const tooltipFormatter = (value: number) => {
    if (unit === '%') return [`${value.toFixed(1)}%`, '']
    return [
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value),
      '',
    ]
  }

  const yFormatter = (v: number) =>
    unit === '%' ? `${v.toFixed(0)}%` : `${(v / 1000).toFixed(0)}k`

  const sharedProps = {
    data,
    margin: { top: 4, right: 4, bottom: 4, left: -8 },
  }

  const axisProps = {
    xAxis: {
      dataKey: 'displayDate' as const,
      stroke: 'transparent',
      tick: { fill: '#4b5563', fontSize: 11 },
    },
    yAxis: {
      stroke: 'transparent',
      tick: { fill: '#4b5563', fontSize: 11 },
      tickFormatter: yFormatter,
      width: 40,
    },
  }

  return (
    <div className="bg-cppem-card border border-cppem-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold text-sm">{title}</h3>
        <div className="flex items-center gap-0.5 bg-cppem-bg rounded-lg p-1">
          {CHART_TYPES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setType(id)}
              className={cn(
                'p-1.5 rounded-md transition-all duration-150',
                type === id
                  ? 'bg-cppem-green/15 text-cppem-neon'
                  : 'text-gray-700 hover:text-gray-500'
              )}
              title={id}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {type === 'bar' ? (
          <BarChart {...sharedProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1a3a1a"
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={tooltipFormatter}
              cursor={{ fill: '#1a3a1a' }}
            />
            <Bar
              dataKey={String(dataKey)}
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        ) : type === 'line' ? (
          <LineChart {...sharedProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1a3a1a"
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={tooltipFormatter}
            />
            <Line
              dataKey={String(dataKey)}
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#4ade80' }}
            />
          </LineChart>
        ) : (
          <AreaChart {...sharedProps}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1a3a1a"
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={tooltipFormatter}
            />
            <Area
              dataKey={String(dataKey)}
              stroke="#22c55e"
              strokeWidth={2}
              fill={`url(#grad-${dataKey})`}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

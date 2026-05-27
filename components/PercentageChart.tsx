import SalesChart from './SalesChart'
import { DailySales } from '@/types'

interface PercentageChartProps {
  data: DailySales[]
  title?: string
}

export default function PercentageChart({
  data,
  title = '% da Meta Acumulada',
}: PercentageChartProps) {
  return (
    <SalesChart
      data={data}
      title={title}
      dataKey="percentage"
      defaultType="area"
      unit="%"
    />
  )
}

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CardColor = 'green' | 'gold' | 'red' | 'blue'

interface DashboardCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  color?: CardColor
}

const colorMap: Record<CardColor, { border: string; iconBg: string; iconColor: string; value: string }> = {
  green: {
    border: 'border-cppem-green/20',
    iconBg: 'bg-cppem-green/10',
    iconColor: 'text-cppem-neon',
    value: 'text-cppem-neon',
  },
  gold: {
    border: 'border-cppem-gold/20',
    iconBg: 'bg-cppem-gold/10',
    iconColor: 'text-cppem-gold',
    value: 'text-cppem-gold',
  },
  red: {
    border: 'border-red-800/25',
    iconBg: 'bg-red-900/15',
    iconColor: 'text-red-400',
    value: 'text-red-400',
  },
  blue: {
    border: 'border-blue-800/25',
    iconBg: 'bg-blue-900/15',
    iconColor: 'text-blue-400',
    value: 'text-blue-400',
  },
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'green',
}: DashboardCardProps) {
  const c = colorMap[color]

  return (
    <div
      className={cn(
        'bg-cppem-card border rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200',
        c.border
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center mb-4',
          c.iconBg
        )}
      >
        <Icon className={cn('w-5 h-5', c.iconColor)} />
      </div>
      <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className={cn('text-xl sm:text-2xl font-black leading-tight', c.value)}>
        {value}
      </p>
      <p className="text-gray-700 text-xs mt-1">{subtitle}</p>
    </div>
  )
}

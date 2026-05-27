'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MonthFilterProps {
  months: string[]
  selectedMonth?: string
}

const MONTH_NAMES = [
  '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

function formatMonth(m: string): string {
  const [year, month] = m.split('-')
  const name = MONTH_NAMES[parseInt(month)] ?? month
  return `${name} ${year}`
}

export default function MonthFilter({ months, selectedMonth }: MonthFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function select(month: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (month) {
      params.set('month', month)
    } else {
      params.delete('month')
    }
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ''}`)
  }

  if (!months.length) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Calendar className="w-3.5 h-3.5 text-gray-600 shrink-0" />
      <button
        onClick={() => select(null)}
        className={cn(
          'px-3 py-1 rounded-lg text-xs font-semibold transition-all border',
          !selectedMonth
            ? 'bg-cppem-green/10 border-cppem-green/25 text-cppem-neon'
            : 'bg-cppem-card border-cppem-border text-gray-600 hover:text-gray-300'
        )}
      >
        Todos
      </button>
      {months.map((m) => (
        <button
          key={m}
          onClick={() => select(m)}
          className={cn(
            'px-3 py-1 rounded-lg text-xs font-semibold transition-all border',
            selectedMonth === m
              ? 'bg-cppem-green/10 border-cppem-green/25 text-cppem-neon'
              : 'bg-cppem-card border-cppem-border text-gray-600 hover:text-gray-300'
          )}
        >
          {formatMonth(m)}
        </button>
      ))}
    </div>
  )
}

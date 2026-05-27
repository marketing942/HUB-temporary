import { BarChart2 } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export default function EmptyState({
  title = 'Nenhum dado encontrado',
  description = 'Ainda não há dados disponíveis para exibição.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 bg-cppem-card border border-cppem-border rounded-2xl">
      <div className="w-16 h-16 rounded-2xl bg-cppem-bg border border-cppem-border flex items-center justify-center">
        <BarChart2 className="w-8 h-8 text-gray-700" />
      </div>
      <div className="text-center max-w-sm px-4">
        <h3 className="text-white font-bold mb-1.5">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

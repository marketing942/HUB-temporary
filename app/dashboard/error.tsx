'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Dashboard error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 bg-cppem-card border border-cppem-border rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-red-900/20 border border-red-800/30 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>
      <div className="text-center">
        <h3 className="text-white font-bold mb-1.5">Erro ao carregar dados</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Não foi possível buscar seus dados. Verifique a conexão com a planilha.
        </p>
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 bg-cppem-green text-cppem-dark font-bold rounded-xl hover:bg-cppem-neon transition-colors text-sm"
      >
        <RefreshCcw className="w-4 h-4" />
        Tentar novamente
      </button>
    </div>
  )
}

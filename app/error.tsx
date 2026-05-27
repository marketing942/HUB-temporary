'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-cppem-bg flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-900/20 border border-red-800/30 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Algo deu errado</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cppem-green text-cppem-dark font-bold rounded-xl hover:bg-cppem-neon transition-colors text-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          Tentar novamente
        </button>
      </div>
    </div>
  )
}

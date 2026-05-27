'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RefreshButton() {
  const [spinning, setSpinning] = useState(false)
  const router = useRouter()

  function handleRefresh() {
    setSpinning(true)
    router.refresh()
    setTimeout(() => setSpinning(false), 1200)
  }

  return (
    <button
      onClick={handleRefresh}
      title="Atualizar dados"
      className="p-2 rounded-xl hover:bg-cppem-card text-gray-600 hover:text-cppem-neon transition-colors"
    >
      <RefreshCcw
        className={cn('w-4 h-4 transition-transform', spinning && 'animate-spin')}
      />
    </button>
  )
}

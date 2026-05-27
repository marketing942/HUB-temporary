'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const CONFIG: Record<ToastType, { icon: React.ElementType; style: string }> = {
  success: { icon: CheckCircle, style: 'border-cppem-green/30 text-cppem-neon' },
  error:   { icon: XCircle,      style: 'border-red-800/30 text-red-400' },
  info:    { icon: Info,         style: 'border-cppem-gold/30 text-cppem-gold' },
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  const { icon: Icon, style } = CONFIG[type]

  return (
    <div
      className={cn(
        'fixed bottom-24 lg:bottom-6 right-4 z-[100] flex items-center gap-3',
        'px-4 py-3 rounded-xl shadow-2xl bg-cppem-card border animate-slide-up max-w-sm'
        , style
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-sm font-medium text-white flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-gray-300 transition-colors ml-1 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

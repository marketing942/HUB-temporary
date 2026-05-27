import { cn } from '@/lib/utils'

interface ThemeWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function ThemeWrapper({ children, className }: ThemeWrapperProps) {
  return (
    <div className={cn('min-h-screen bg-cppem-bg text-white', className)}>
      {children}
    </div>
  )
}

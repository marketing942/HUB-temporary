'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, BarChart2, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/perfil', label: 'Meu Perfil', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar fixo */}
      <aside className="hidden lg:flex flex-col w-64 bg-cppem-card border-r border-cppem-border min-h-screen fixed top-0 left-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-cppem-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cppem-gold/8 border border-cppem-gold/25 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cppem-gold" />
            </div>
            <div>
              <p className="font-black text-white tracking-widest text-sm">CPPEM</p>
              <p className="text-xs text-gray-700">HUB de Performance</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                pathname === href
                  ? 'bg-cppem-green/10 border border-cppem-green/20 text-cppem-neon'
                  : 'text-gray-600 hover:bg-cppem-surface hover:text-gray-300 border border-transparent'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-cppem-border">
          <p className="text-xs text-gray-700 text-center tracking-wider">
            Disciplina. Resultado. Missão.
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cppem-card border-t border-cppem-border safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-0.5 p-2 text-gray-700 hover:text-gray-400 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </Link>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 p-2 transition-colors',
                pathname === href
                  ? 'text-cppem-neon'
                  : 'text-gray-700 hover:text-gray-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}

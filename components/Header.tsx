'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { LogOut, User as UserIcon } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface HeaderProps {
  user: User
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = (user.email ?? 'US').slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-30 bg-cppem-bg/90 backdrop-blur-md border-b border-cppem-border px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm hidden sm:block">
          Hoje é dia de bater a meta
        </p>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/perfil"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-cppem-card transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-cppem-green/15 border border-cppem-green/25 flex items-center justify-center text-cppem-neon text-xs font-black">
              {initials}
            </div>
            <span className="text-sm text-gray-500 hidden sm:block max-w-[180px] truncate">
              {user.email}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            title="Sair"
            className="p-2 rounded-xl hover:bg-cppem-card text-gray-600 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

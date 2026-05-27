'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Shield, Eye, EyeOff, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (authError) {
      setError(
        'E-mail ou senha incorretos. Verifique os dados e tente novamente.'
      )
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-cppem-bg flex items-center justify-center px-4 py-12 relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a3a1a10_1px,transparent_1px),linear-gradient(to_bottom,#1a3a1a10_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cppem-green/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-cppem-card border border-cppem-border flex items-center justify-center">
              <Shield className="w-8 h-8 text-cppem-gold" />
            </div>
            <span className="text-2xl font-black tracking-widest text-white">
              CPPEM HUB
            </span>
          </Link>
          <p className="text-gray-600 text-sm mt-2">
            Acesso restrito — Missão em andamento
          </p>
        </div>

        {/* Card */}
        <div className="bg-cppem-card border border-cppem-border rounded-2xl p-8">
          <h1 className="text-xl font-black text-white mb-1">Entrar no sistema</h1>
          <p className="text-gray-600 text-sm mb-7">Use seu e-mail e senha de acesso</p>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-cppem-bg border border-cppem-border rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-cppem-green transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-cppem-bg border border-cppem-border rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-cppem-green transition-colors pr-12 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-cppem-green text-cppem-dark font-black rounded-xl hover:bg-cppem-neon transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-cppem-dark border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar na Missão
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          CPPEM — Disciplina. Resultado. Missão.
        </p>
      </div>
    </div>
  )
}

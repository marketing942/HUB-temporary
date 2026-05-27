import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cppem-bg flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-cppem-card border border-cppem-border flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-cppem-gold" />
        </div>
        <h1 className="text-7xl font-black text-cppem-neon mb-3">404</h1>
        <h2 className="text-xl font-bold text-white mb-3">Rota não encontrada</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
          Essa missão não existe. Verifique o endereço ou retorne ao início.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cppem-green text-cppem-dark font-bold rounded-xl hover:bg-cppem-neon transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}

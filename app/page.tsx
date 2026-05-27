import Link from 'next/link'
import {
  Shield,
  TrendingUp,
  Target,
  Award,
  BarChart2,
  Users,
  ChevronRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cppem-bg text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-cppem-bg/80 backdrop-blur-md border-b border-cppem-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cppem-gold/10 border border-cppem-gold/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cppem-gold" />
              </div>
              <span className="text-lg font-black tracking-widest text-white">CPPEM</span>
            </div>
            <Link
              href="/login"
              className="px-5 py-2 bg-cppem-green text-cppem-dark font-bold rounded-xl hover:bg-cppem-neon transition-all duration-200 text-sm flex items-center gap-2"
            >
              Acessar HUB
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a3a1a12_1px,transparent_1px),linear-gradient(to_bottom,#1a3a1a12_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cppem-green/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cppem-card border border-cppem-border text-cppem-neon text-sm font-medium mb-10">
            <span className="w-2 h-2 rounded-full bg-cppem-neon animate-pulse" />
            Missão ativa — Resultados em tempo real
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-7">
            <span className="text-white">Sua </span>
            <span className="text-cppem-neon">Performance</span>
            <br />
            <span className="text-white">em Tempo Real</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Acompanhe suas vendas, evolução diária e metas com precisão.
            Disciplina, dados e resultados — tudo em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-cppem-green text-cppem-dark font-black rounded-2xl hover:bg-cppem-neon transition-all duration-200 text-lg shadow-xl shadow-cppem-green/20 hover:shadow-cppem-neon/30"
            >
              <Target className="w-5 h-5" />
              Acessar meu HUB
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: 'Alta performance', value: 'Vendedores' },
              { label: 'Atualização', value: 'Automática' },
              { label: 'Dados', value: 'Criptografados' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-cppem-card border border-cppem-border rounded-2xl p-4 text-center"
              >
                <p className="text-cppem-neon font-bold text-sm">{stat.value}</p>
                <p className="text-gray-600 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Tudo que você precisa para{' '}
              <span className="text-cppem-gold">bater a meta</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Ferramentas de alta performance para o profissional de resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Evolução Diária',
                desc: 'Acompanhe o crescimento das suas vendas dia a dia com gráficos claros e comparativos.',
              },
              {
                icon: Target,
                title: 'Missão do Mês',
                desc: 'Veja em tempo real o percentual da sua meta mensal atingido. Saiba exatamente onde está.',
              },
              {
                icon: BarChart2,
                title: 'Análise Completa',
                desc: 'Ticket médio, quantidade de vendas, valor acumulado. Tudo em um só painel.',
              },
              {
                icon: Award,
                title: 'Performance Visual',
                desc: 'Indicadores visuais de crescimento ou queda para ação rápida e assertiva.',
              },
              {
                icon: Shield,
                title: 'Dados Seguros',
                desc: 'Cada vendedor acessa apenas seus próprios dados. Privacidade e segurança garantidas.',
              },
              {
                icon: Users,
                title: 'Perfil Personalizado',
                desc: 'Foto de perfil, cargo e informações pessoais. Seu HUB, sua identidade.',
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-cppem-card border border-cppem-border rounded-2xl p-6 hover:border-cppem-green/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cppem-green/8 border border-cppem-green/15 flex items-center justify-center mb-5 group-hover:bg-cppem-green/15 transition-all">
                  <feat.icon className="w-6 h-6 text-cppem-neon" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-cppem-card to-cppem-bg border border-cppem-border rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a3a1a08_1px,transparent_1px),linear-gradient(to_bottom,#1a3a1a08_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Hoje é dia de{' '}
                <span className="text-cppem-neon">bater a meta</span>
              </h2>
              <p className="text-gray-500 mb-8 text-lg">
                Acesse seu painel e veja onde você está na missão do mês.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-cppem-gold text-cppem-dark font-black rounded-2xl hover:bg-cppem-goldLight transition-all duration-200 text-lg"
              >
                <Shield className="w-5 h-5" />
                Entrar no HUB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cppem-border py-8 px-4 mt-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-cppem-gold" />
            <span className="font-black tracking-widest text-sm text-gray-500">CPPEM HUB</span>
          </div>
          <p className="text-gray-700 text-xs">Disciplina. Resultado. Missão.</p>
        </div>
      </footer>
    </div>
  )
}

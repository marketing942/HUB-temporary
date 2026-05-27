import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'CPPEM HUB — Sua Performance em Tempo Real',
  description:
    'Plataforma de acompanhamento de desempenho e vendas do CPPEM. Disciplina. Resultado. Missão.',
  keywords: ['CPPEM', 'vendas', 'performance', 'dashboard', 'metas'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-cppem-bg text-white antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

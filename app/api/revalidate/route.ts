import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// Rota para forçar a atualização do cache da planilha sem aguardar os 5 min
// Uso: POST /api/revalidate  com header Authorization: Bearer <REVALIDATE_SECRET>
// Defina REVALIDATE_SECRET no .env.local para habilitar

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'REVALIDATE_SECRET não configurado' },
      { status: 500 }
    )
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('sheet-data')

  return NextResponse.json({
    ok: true,
    revalidated: true,
    message: 'Cache da planilha invalidado. Próxima requisição buscará dados frescos.',
    timestamp: new Date().toISOString(),
  })
}

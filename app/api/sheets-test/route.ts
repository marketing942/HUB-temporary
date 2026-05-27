import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Endpoint de diagnóstico — use durante o setup para verificar a conexão
// Acesse em desenvolvimento: GET /api/sheets-test
// Não funciona em produção (retorna 404)

export async function GET(_request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  const SHEET_ID = process.env.GOOGLE_SHEETS_ID ?? ''

  const envCheck = {
    GOOGLE_SHEETS_ID: !!SHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const allSet = Object.values(envCheck).every(Boolean)

  if (!allSet) {
    return NextResponse.json({
      ok: false,
      error: 'Variáveis de ambiente faltando',
      env: envCheck,
    })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(
          /\\n/g,
          '\n'
        ),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Metadados da planilha: título e lista de abas
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
      fields: 'properties.title,sheets.properties',
    })

    // Prévia das primeiras 3 linhas (cabeçalho + 2 registros)
    const preview = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'A1:Z3',
    })

    return NextResponse.json({
      ok: true,
      spreadsheet: {
        id: SHEET_ID,
        title: meta.data.properties?.title,
      },
      sheets: meta.data.sheets?.map((s) => ({
        name: s.properties?.title,
        gid: s.properties?.sheetId,
        index: s.properties?.index,
        hint:
          s.properties?.index === 0
            ? 'Primeira aba (padrão se GOOGLE_SHEETS_RANGE não especificar nome)'
            : `Use "${s.properties?.title}!A1:Z1000" no GOOGLE_SHEETS_RANGE`,
      })),
      preview: {
        headers: preview.data.values?.[0] ?? [],
        sample_rows: preview.data.values?.slice(1) ?? [],
      },
      env: envCheck,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ ok: false, error: message, env: envCheck }, { status: 500 })
  }
}

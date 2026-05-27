import { google } from 'googleapis'
import { unstable_cache } from 'next/cache'
import { SaleRecord } from '@/types'
import { parseBrazilianCurrency, normalizeDate } from './formatters'

const SHEET_ID = process.env.GOOGLE_SHEETS_ID ?? ''
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RANGE ?? 'A1:Z1000'

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '_')
    .trim()
}

const COLUMN_MAP: Record<string, string> = {
  email: 'email',
  e_mail: 'email',
  nome: 'nome',
  name: 'nome',
  cargo: 'cargo',
  funcao: 'cargo',
  data: 'data',
  date: 'data',
  produto: 'produto',
  product: 'produto',
  item: 'produto',
  valor_venda: 'valor_venda',
  valor: 'valor_venda',
  venda: 'valor_venda',
  value: 'valor_venda',
  quantidade_vendas: 'quantidade_vendas',
  quantidade: 'quantidade_vendas',
  qtd: 'quantidade_vendas',
  qty: 'quantidade_vendas',
  meta_mensal: 'meta_mensal',
  meta: 'meta_mensal',
  goal: 'meta_mensal',
  etapa: 'etapa',
  stage: 'etapa',
  observacao: 'observacao',
  obs: 'observacao',
  nota: 'observacao',
  foto_url: 'foto_url',
  foto: 'foto_url',
  avatar: 'foto_url',
}

function mapHeader(h: string): string {
  const norm = normalizeHeader(h)
  return COLUMN_MAP[norm] ?? norm
}

async function fetchSheetData(): Promise<SaleRecord[]> {
  if (
    !SHEET_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    console.warn(
      '[googleSheets] Credenciais não configuradas. Defina as variáveis de ambiente.'
    )
    return []
  }

  try {
    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) return []

    const headers = (rows[0] as string[]).map(mapHeader)
    const records: SaleRecord[] = []

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i] as string[]
      if (!row || row.every((cell) => !cell?.trim())) continue

      const raw: Record<string, string> = {}
      headers.forEach((header, j) => {
        raw[header] = row[j]?.trim() ?? ''
      })

      const email = raw['email']?.toLowerCase()
      if (!email) continue

      records.push({
        email,
        nome: raw['nome'] ?? '',
        cargo: raw['cargo'] ?? '',
        data: normalizeDate(raw['data'] ?? ''),
        produto: raw['produto'] ?? '',
        valor_venda: parseBrazilianCurrency(raw['valor_venda'] ?? '0'),
        quantidade_vendas: parseInt(raw['quantidade_vendas'] ?? '1') || 1,
        meta_mensal: parseBrazilianCurrency(raw['meta_mensal'] ?? '0'),
        etapa: raw['etapa'] ?? '',
        observacao: raw['observacao'] ?? '',
        foto_url: raw['foto_url'] ?? '',
      })
    }

    return records
  } catch (err) {
    console.error('[googleSheets] Erro ao ler planilha:', err)
    return []
  }
}

// Cache de 5 minutos via Next.js Data Cache
// Todos os usuários compartilham o mesmo cache da planilha inteira;
// a filtragem por e-mail acontece depois, em memória.
export const getSheetData = unstable_cache(
  fetchSheetData,
  ['cppem-sheet-data'],
  {
    revalidate: 300,
    tags: ['sheet-data'],
  }
)

export async function getDataByEmail(email: string): Promise<SaleRecord[]> {
  const all = await getSheetData()
  return all.filter((r) => r.email === email.toLowerCase().trim())
}

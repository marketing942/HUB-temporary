export function parseBrazilianCurrency(value: string | number): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value
  if (!value) return 0

  let str = String(value).trim()
  // Remove R$, espaços
  str = str.replace(/R\$\s?/g, '')
  // Remove pontos de milhar
  str = str.replace(/\./g, '')
  // Troca vírgula decimal por ponto
  str = str.replace(',', '.')

  const num = parseFloat(str)
  return isNaN(num) ? 0 : num
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function normalizeDate(dateStr: string): string {
  if (!dateStr) return ''

  // DD/MM/YYYY
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const [d, m, y] = parts
      return `${y.padStart(4, '20')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
    }
  }

  // Serial Excel/Sheets (número inteiro)
  if (/^\d{5}$/.test(dateStr.trim())) {
    const serial = parseInt(dateStr.trim())
    const date = new Date((serial - 25569) * 86400 * 1000)
    return date.toISOString().split('T')[0]
  }

  // Já está em YYYY-MM-DD
  return dateStr
}

export function formatDisplayDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      const [, month, day] = parts
      return `${day}/${month}`
    }
    return dateStr
  } catch {
    return dateStr
  }
}

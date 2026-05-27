import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getDataByEmail } from '@/lib/googleSheets'
import { calculateDashboard } from '@/lib/dashboardCalculations'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const records = await getDataByEmail(session.user.email!)
  const data = calculateDashboard(records)

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'private, max-age=300',
    },
  })
}

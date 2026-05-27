import { createServerSupabaseClient } from './supabaseServer'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function getAuthUser() {
  const session = await getSession()
  if (!session) return null
  return session.user
}

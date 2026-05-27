import { createServerSupabaseClient } from './supabaseServer'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }
  return { user }
}

export async function getAuthUser() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

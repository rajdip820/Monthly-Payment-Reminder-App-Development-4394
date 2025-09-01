import { createClient } from '@supabase/supabase-js'

// Updated Supabase configuration with correct credentials
const supabaseUrl = 'https://wxwpnbesxjbqiqykzlyt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4d3BuYmVzeGpicWlxeWt6bHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTk3NjAsImV4cCI6MjA3MjIzNTc2MH0.tR_qSjzPXnTqfc0VYIiWJP9jSBqhPUBts_lcAUHErzM'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('payments_pm2025').select('count', { count: 'exact', head: true })
    if (error) throw error
    console.log('✅ Supabase connected successfully!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return false
  }
}
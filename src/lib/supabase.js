import { createClient } from '@supabase/supabase-js'

// Updated Supabase configuration with correct credentials
const supabaseUrl = 'https://wxwpnbesxjbqiqykzlyt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4d3BuYmVzeGpicWlxeWt6bHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTk3NjAsImV4cCI6MjA3MjIzNTc2MH0.tR_qSjzPXnTqfc0VYIiWJP9jSBqhPUBts_lcAUHErzM'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable Supabase auth since we're using Clerk
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// Test connection and create table if needed
export const testConnection = async () => {
  try {
    // First, let's create the table if it doesn't exist
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS payments_pm2025 (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          clerk_user_id TEXT NOT NULL,
          user_email TEXT,
          title VARCHAR(255) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          due_date DATE NOT NULL,
          status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid')),
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE payments_pm2025 ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Users can only see their own payments" ON payments_pm2025;
        DROP POLICY IF EXISTS "Clerk users can only see their own payments" ON payments_pm2025;
        
        -- Create new policy for Clerk users
        CREATE POLICY "Allow all operations for users" ON payments_pm2025 FOR ALL USING (true);
      `
    })
    
    if (createError && !createError.message.includes('already exists')) {
      console.warn('Table creation warning:', createError.message)
    }
    
    // Test basic connection
    const { data, error } = await supabase
      .from('payments_pm2025')
      .select('count', { count: 'exact', head: true })
    
    if (error) throw error
    
    console.log('✅ Supabase connected successfully!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return false
  }
}
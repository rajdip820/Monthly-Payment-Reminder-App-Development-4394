import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const usePayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const fetchPayments = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('payments_pm2025')
        .select('*')
        .order('due_date', { ascending: true })

      if (error) throw error
      setPayments(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addPayment = async (paymentData) => {
    try {
      const { data, error } = await supabase
        .from('payments_pm2025')
        .insert([{
          ...paymentData,
          user_id: user.id
        }])
        .select()

      if (error) throw error
      setPayments(prev => [...prev, ...data])
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const updatePayment = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('payments_pm2025')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      setPayments(prev => prev.map(p => p.id === id ? data[0] : p))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const deletePayment = async (id) => {
    try {
      const { error } = await supabase
        .from('payments_pm2025')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPayments(prev => prev.filter(p => p.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const markAsPaid = async (id) => {
    return updatePayment(id, { status: 'Paid' })
  }

  useEffect(() => {
    fetchPayments()
  }, [user])

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment,
    deletePayment,
    markAsPaid,
    refetch: fetchPayments
  }
}
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isBefore, isAfter, addDays } from 'date-fns'
import { usePayments } from '../hooks/usePayments'
import { generatePaymentReceipt } from '../utils/pdfGenerator'
import Layout from '../components/Layout'
import PaymentCard from '../components/Payments/PaymentCard'
import PaymentForm from '../components/Payments/PaymentForm'
import PaymentFilters from '../components/Payments/PaymentFilters'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiTrendingUp, FiClock, FiDollarSign, FiAlertTriangle } = FiIcons

const Dashboard = () => {
  const { payments, loading, addPayment, updatePayment, deletePayment, markAsPaid } = usePayments()
  const [showForm, setShowForm] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all' })

  // Filter and search payments
  const filteredPayments = useMemo(() => {
    const today = new Date()
    
    return payments.filter(payment => {
      // Search filter
      const matchesSearch = payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Status filter
      let matchesStatus = true
      if (filters.status !== 'all') {
        const dueDate = new Date(payment.due_date)
        
        switch (filters.status) {
          case 'pending':
            matchesStatus = payment.status === 'Pending'
            break
          case 'paid':
            matchesStatus = payment.status === 'Paid'
            break
          case 'overdue':
            matchesStatus = payment.status === 'Pending' && isBefore(dueDate, today)
            break
          case 'due_soon':
            matchesStatus = payment.status === 'Pending' && 
                           isAfter(dueDate, today) && 
                           isBefore(dueDate, addDays(today, 7))
            break
        }
      }
      
      return matchesSearch && matchesStatus
    })
  }, [payments, searchTerm, filters])

  // Dashboard stats
  const stats = useMemo(() => {
    const today = new Date()
    const pendingPayments = payments.filter(p => p.status === 'Pending')
    
    return {
      total: payments.length,
      pending: pendingPayments.length,
      overdue: pendingPayments.filter(p => isBefore(new Date(p.due_date), today)).length,
      totalAmount: pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0)
    }
  }, [payments])

  const handleSubmit = async (formData) => {
    setFormLoading(true)
    
    try {
      if (editingPayment) {
        await updatePayment(editingPayment.id, formData)
      } else {
        await addPayment(formData)
      }
      setShowForm(false)
      setEditingPayment(null)
    } catch (error) {
      console.error('Error saving payment:', error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (payment) => {
    setEditingPayment(payment)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await deletePayment(id)
    }
  }

  const handleMarkPaid = async (id) => {
    await markAsPaid(id)
  }

  const handleGenerateReceipt = (payment) => {
    const pdf = generatePaymentReceipt(payment)
    pdf.save(`receipt-${payment.title.replace(/\s+/g, '-')}.pdf`)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPayment(null)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your monthly payment reminders</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="h-5 w-5" />
            <span>Add Payment</span>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiTrendingUp} className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiClock} className="h-8 w-8 text-warning-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="h-8 w-8 text-danger-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiDollarSign} className="h-8 w-8 text-success-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <PaymentFilters
          filters={filters}
          onFiltersChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Payments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <PaymentCard
                  payment={payment}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onMarkPaid={handleMarkPaid}
                  onGenerateReceipt={handleGenerateReceipt}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiClock} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filters.status !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first payment reminder'
              }
            </p>
            {!searchTerm && filters.status === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 mx-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="h-5 w-5" />
                <span>Add Your First Payment</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Payment Form Modal */}
        <AnimatePresence>
          {showForm && (
            <PaymentForm
              payment={editingPayment}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              loading={formLoading}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default Dashboard
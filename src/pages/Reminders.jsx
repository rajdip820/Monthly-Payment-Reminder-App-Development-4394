import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { isBefore, isAfter, addDays, format } from 'date-fns'
import { usePayments } from '../hooks/usePayments'
import Layout from '../components/Layout'
import PaymentCard from '../components/Payments/PaymentCard'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiBell, FiClock, FiAlertTriangle, FiCalendar } = FiIcons

const Reminders = () => {
  const { payments, loading, markAsPaid, deletePayment } = usePayments()

  // Get upcoming and overdue payments
  const { upcomingPayments, overduePayments } = useMemo(() => {
    const today = new Date()
    const sevenDaysFromNow = addDays(today, 7)
    
    const pending = payments.filter(p => p.status === 'Pending')
    
    return {
      upcomingPayments: pending.filter(p => {
        const dueDate = new Date(p.due_date)
        return isAfter(dueDate, today) && isBefore(dueDate, sevenDaysFromNow)
      }),
      overduePayments: pending.filter(p => {
        const dueDate = new Date(p.due_date)
        return isBefore(dueDate, today)
      })
    }
  }, [payments])

  const handleMarkPaid = async (id) => {
    await markAsPaid(id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await deletePayment(id)
    }
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
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Reminders</h1>
          <p className="text-gray-600">Stay on top of your upcoming and overdue payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-danger-500 to-danger-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-danger-100">Overdue Payments</p>
                <p className="text-3xl font-bold">{overduePayments.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-warning-500 to-warning-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiClock} className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-warning-100">Due This Week</p>
                <p className="text-3xl font-bold">{upcomingPayments.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center">
              <SafeIcon icon={FiCalendar} className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-primary-100">Total Reminders</p>
                <p className="text-3xl font-bold">{overduePayments.length + upcomingPayments.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Overdue Payments */}
        {overduePayments.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <SafeIcon icon={FiAlertTriangle} className="h-6 w-6 text-danger-600" />
              <h2 className="text-2xl font-bold text-gray-900">Overdue Payments</h2>
              <span className="bg-danger-100 text-danger-800 px-2 py-1 rounded-full text-sm font-medium">
                {overduePayments.length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {overduePayments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PaymentCard
                    payment={payment}
                    onEdit={() => {}} // Disable edit in reminders page
                    onDelete={handleDelete}
                    onMarkPaid={handleMarkPaid}
                    onGenerateReceipt={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Payments */}
        {upcomingPayments.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <SafeIcon icon={FiClock} className="h-6 w-6 text-warning-600" />
              <h2 className="text-2xl font-bold text-gray-900">Due This Week</h2>
              <span className="bg-warning-100 text-warning-800 px-2 py-1 rounded-full text-sm font-medium">
                {upcomingPayments.length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingPayments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PaymentCard
                    payment={payment}
                    onEdit={() => {}} // Disable edit in reminders page
                    onDelete={handleDelete}
                    onMarkPaid={handleMarkPaid}
                    onGenerateReceipt={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {overduePayments.length === 0 && upcomingPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <SafeIcon icon={FiBell} className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You have no overdue or upcoming payments. Great job staying on top of your finances!
            </p>
          </motion.div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary-50 rounded-lg p-6 border border-primary-200"
        >
          <h3 className="text-lg font-semibold text-primary-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-primary-800">
            <li>• Set up automatic payments for recurring bills to avoid overdue payments</li>
            <li>• Review your reminders weekly to stay ahead of due dates</li>
            <li>• Add notes to payments with account numbers or reference information</li>
            <li>• Mark payments as paid immediately after completing them</li>
          </ul>
        </motion.div>
      </div>
    </Layout>
  )
}

export default Reminders
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns'
import { useClerkPayments } from '../hooks/useClerkPayments'
import { generatePaymentReceipt, exportPaymentsToCSV } from '../utils/pdfGenerator'
import ClerkNavbar from '../components/ClerkNavbar'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiArchive, FiDownload, FiFileText, FiCalendar, FiDollarSign, FiFilter } = FiIcons

const ClerkHistory = () => {
  const { payments, loading } = useClerkPayments()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  // Filter paid payments by selected month
  const { paidPayments, monthlyStats } = useMemo(() => {
    const paid = payments.filter(p => p.status === 'Paid')

    // Filter by selected month if specified
    const filtered = selectedMonth
      ? paid.filter(p => {
          const paymentDate = parseISO(p.updated_at)
          const monthStart = startOfMonth(new Date(selectedMonth))
          const monthEnd = endOfMonth(new Date(selectedMonth))
          return paymentDate >= monthStart && paymentDate <= monthEnd
        })
      : paid

    // Calculate stats
    const totalAmount = filtered.reduce((sum, p) => sum + parseFloat(p.amount), 0)
    const totalPayments = filtered.length

    return {
      paidPayments: filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)),
      monthlyStats: { totalAmount, totalPayments }
    }
  }, [payments, selectedMonth])

  // Get available months for filter
  const availableMonths = useMemo(() => {
    const months = new Set()
    payments
      .filter(p => p.status === 'Paid')
      .forEach(p => {
        const date = new Date(p.updated_at)
        months.add(date.toISOString().slice(0, 7))
      })
    return Array.from(months).sort().reverse()
  }, [payments])

  const handleGenerateReceipt = (payment) => {
    const pdf = generatePaymentReceipt(payment)
    pdf.save(`receipt-${payment.title.replace(/\s+/g, '-')}.pdf`)
  }

  const handleExportCSV = () => {
    exportPaymentsToCSV(paidPayments)
  }

  const handleExportPDF = () => {
    // Generate a comprehensive PDF report
    const pdf = generatePaymentReceipt({
      id: 'report',
      title: `Payment History Report - ${format(new Date(selectedMonth), 'MMMM yyyy')}`,
      amount: monthlyStats.totalAmount,
      due_date: new Date().toISOString(),
      status: 'Report',
      notes: `Total payments: ${monthlyStats.totalPayments}`
    })
    pdf.save(`payment-history-${selectedMonth}.pdf`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ClerkNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClerkNavbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
              <p className="text-gray-600 mt-1">View and export your completed payments</p>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
              >
                <SafeIcon icon={FiDownload} className="h-4 w-4" />
                <span>Export CSV</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiFileText} className="h-4 w-4" />
                <span>Export PDF</span>
              </motion.button>
            </div>
          </div>

          {/* Stats and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiArchive} className="h-8 w-8 text-primary-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Payments</p>
                    <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalPayments}</p>
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
                  <SafeIcon icon={FiDollarSign} className="h-8 w-8 text-success-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${monthlyStats.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Month Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiFilter} className="h-5 w-5 text-gray-600" />
                <h3 className="ml-2 text-lg font-semibold text-gray-900">Filter by Month</h3>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Months</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {format(new Date(month), 'MMMM yyyy')}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Payment History Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {paidPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paidPayments.map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{payment.title}</div>
                            {payment.notes && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">{payment.notes}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">${payment.amount}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2 text-gray-400" />
                            {format(new Date(payment.due_date), 'MMM dd, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {format(new Date(payment.updated_at), 'MMM dd, yyyy')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleGenerateReceipt(payment)}
                            className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                          >
                            <SafeIcon icon={FiFileText} className="h-4 w-4" />
                            <span>Receipt</span>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <SafeIcon icon={FiArchive} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
                <p className="text-gray-600">
                  {selectedMonth
                    ? 'No payments found for the selected month'
                    : 'Start making payments to see your history here'
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}

export default ClerkHistory
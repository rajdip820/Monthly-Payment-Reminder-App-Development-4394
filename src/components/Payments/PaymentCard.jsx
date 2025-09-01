import React from 'react'
import { motion } from 'framer-motion'
import { format, isAfter, isBefore, addDays } from 'date-fns'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiDollarSign, FiEdit, FiTrash2, FiCheck, FiClock, FiFileText } = FiIcons

const PaymentCard = ({ payment, onEdit, onDelete, onMarkPaid, onGenerateReceipt }) => {
  const dueDate = new Date(payment.due_date)
  const today = new Date()
  const isOverdue = isBefore(dueDate, today) && payment.status === 'Pending'
  const isDueSoon = isAfter(dueDate, today) && isBefore(dueDate, addDays(today, 7)) && payment.status === 'Pending'

  const getStatusColor = () => {
    if (payment.status === 'Paid') return 'bg-success-100 text-success-800'
    if (isOverdue) return 'bg-danger-100 text-danger-800'
    if (isDueSoon) return 'bg-warning-100 text-warning-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getCardBorder = () => {
    if (payment.status === 'Paid') return 'border-success-200'
    if (isOverdue) return 'border-danger-200'
    if (isDueSoon) return 'border-warning-200'
    return 'border-gray-200'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg shadow-md border-l-4 ${getCardBorder()} p-6 hover:shadow-lg transition-shadow`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{payment.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiDollarSign} className="h-4 w-4" />
              <span className="font-medium">${payment.amount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="h-4 w-4" />
              <span>{format(dueDate, 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {payment.status}
        </span>
      </div>

      {/* Notes */}
      {payment.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3">
            {payment.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(payment)}
            className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
          >
            <SafeIcon icon={FiEdit} className="h-4 w-4" />
            <span>Edit</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(payment.id)}
            className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="h-4 w-4" />
            <span>Delete</span>
          </motion.button>
        </div>

        <div className="flex space-x-2">
          {payment.status === 'Paid' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onGenerateReceipt(payment)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <SafeIcon icon={FiFileText} className="h-4 w-4" />
              <span>Receipt</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMarkPaid(payment.id)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-success-600 hover:bg-success-700 rounded-md transition-colors"
            >
              <SafeIcon icon={FiCheck} className="h-4 w-4" />
              <span>Mark Paid</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Overdue/Due Soon Warning */}
      {(isOverdue || isDueSoon) && payment.status === 'Pending' && (
        <div className={`mt-4 p-3 rounded-md flex items-center space-x-2 ${
          isOverdue ? 'bg-danger-50 text-danger-700' : 'bg-warning-50 text-warning-700'
        }`}>
          <SafeIcon icon={FiClock} className="h-4 w-4" />
          <span className="text-sm font-medium">
            {isOverdue ? 'Overdue!' : 'Due soon'}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default PaymentCard
import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiBell, FiCalendar, FiShield, FiBarChart3, FiDownload, FiSmartphone } = FiIcons

const LandingFeatures = () => {
  const features = [
    {
      icon: FiBell,
      title: 'Smart Reminders',
      description: 'Get notified before payments are due with intelligent reminder system that learns your preferences.',
      color: 'primary'
    },
    {
      icon: FiCalendar,
      title: 'Payment Tracking',
      description: 'Keep track of all your recurring payments, bills, and subscriptions in one organized dashboard.',
      color: 'success'
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your financial data is protected with bank-level security and encrypted cloud storage.',
      color: 'warning'
    },
    {
      icon: FiBarChart3,
      title: 'Analytics & Reports',
      description: 'Gain insights into your spending patterns with detailed analytics and exportable reports.',
      color: 'danger'
    },
    {
      icon: FiDownload,
      title: 'Export & Backup',
      description: 'Export your payment history to PDF or CSV formats for record keeping and tax purposes.',
      color: 'primary'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Responsive',
      description: 'Access your payment reminders anywhere, anytime with our fully responsive mobile interface.',
      color: 'success'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PayReminder comes packed with powerful features to help you manage your payments 
            efficiently and never miss a due date again.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                <SafeIcon icon={feature.icon} className={`h-7 w-7 text-${feature.color}-600`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingFeatures
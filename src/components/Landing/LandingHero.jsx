import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlay, FiArrowRight, FiCheck, FiClock, FiShield } = FiIcons

const LandingHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              <SafeIcon icon={FiShield} className="h-4 w-4" />
              <span>Secure & Reliable</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Never Miss a
                <span className="text-primary-600 block">Payment Again</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take control of your finances with smart payment reminders. Track due dates, 
                manage recurring bills, and stay on top of your financial commitments effortlessly.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                'Smart payment tracking and reminders',
                'Automatic overdue detection',
                'Secure cloud synchronization',
                'Export receipts and reports'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <SafeIcon icon={FiCheck} className="h-5 w-5 text-success-600" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                >
                  <span>Start Free Today</span>
                  <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-300 hover:text-primary-600 transition-colors font-semibold text-lg"
              >
                <SafeIcon icon={FiPlay} className="h-5 w-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by thousands of users worldwide</p>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiShield} className="h-5 w-5" />
                  <span className="text-sm">Bank-level Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiClock} className="h-5 w-5" />
                  <span className="text-sm">24/7 Monitoring</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-sm text-primary-600 font-medium">Total Payments</p>
                    <p className="text-2xl font-bold text-primary-700">12</p>
                  </div>
                  <div className="bg-success-50 rounded-lg p-4">
                    <p className="text-sm text-success-600 font-medium">This Month</p>
                    <p className="text-2xl font-bold text-success-700">$2,450</p>
                  </div>
                </div>

                {/* Payment Items */}
                <div className="space-y-3">
                  {[
                    { name: 'Rent Payment', amount: '$1,200', status: 'paid', color: 'success' },
                    { name: 'Internet Bill', amount: '$89', status: 'due', color: 'warning' },
                    { name: 'Insurance', amount: '$350', status: 'overdue', color: 'danger' }
                  ].map((payment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${payment.color}-400`}></div>
                        <span className="font-medium text-gray-900">{payment.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{payment.amount}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-success-500 text-white p-3 rounded-xl shadow-lg"
            >
              <SafeIcon icon={FiCheck} className="h-6 w-6" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-primary-500 text-white p-3 rounded-xl shadow-lg"
            >
              <SafeIcon icon={FiClock} className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LandingHero
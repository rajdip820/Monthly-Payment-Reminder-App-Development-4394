import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUserPlus, FiPlus, FiBell, FiTrendingUp } = FiIcons

const LandingHowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: 'Sign Up',
      description: 'Create your free account in seconds with just your email address.',
      color: 'primary'
    },
    {
      icon: FiPlus,
      title: 'Add Payments',
      description: 'Add your recurring bills, subscriptions, and payment reminders.',
      color: 'success'
    },
    {
      icon: FiBell,
      title: 'Get Reminded',
      description: 'Receive timely notifications before your payments are due.',
      color: 'warning'
    },
    {
      icon: FiTrendingUp,
      title: 'Stay Organized',
      description: 'Track your payment history and analyze your spending patterns.',
      color: 'danger'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
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
            How PayReminder Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these four easy steps to take control 
            of your payment schedule.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Step Number */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 bg-${step.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <SafeIcon icon={step.icon} className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 w-3 h-3 bg-gray-300 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/auth"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
          >
            <span>Get Started Now</span>
            <SafeIcon icon={FiUserPlus} className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default LandingHowItWorks
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCreditCard, FiShield, FiCalendar, FiTrendingUp, FiCheck, FiDollarSign, FiClock, FiFileText, FiBell, FiMail, FiMenu, FiX, FiStar, FiUsers, FiArrowRight } = FiIcons

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: FiCalendar,
      title: "Smart Reminders",
      description: "Never miss a payment with intelligent reminders for upcoming and overdue bills."
    },
    {
      icon: FiShield,
      title: "Secure & Private",
      description: "Your financial data is protected with enterprise-grade security and encryption."
    },
    {
      icon: FiTrendingUp,
      title: "Payment Analytics",
      description: "Track your spending patterns and get insights into your payment history."
    },
    {
      icon: FiFileText,
      title: "Receipt Generation",
      description: "Generate professional receipts and export your payment history to PDF or CSV."
    },
    {
      icon: FiBell,
      title: "Real-time Notifications",
      description: "Get instant notifications for due dates, overdue payments, and payment confirmations."
    },
    {
      icon: FiDollarSign,
      title: "Budget Tracking",
      description: "Monitor your monthly expenses and stay on top of your financial goals."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "PayReminder has transformed how I manage my business expenses. Never missed a payment since I started using it!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content: "The automatic reminders and receipt generation features save me hours every month. Highly recommended!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Financial Planner",
      content: "Perfect for both personal and professional use. The analytics help my clients understand their spending better.",
      rating: 5
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "500K+", label: "Payments Tracked" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <SafeIcon icon={FiCreditCard} className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">PayReminder</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <Link to="/auth" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                  Sign In
                </Link>
                <Link to="/auth" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Get Started
                </Link>
              </SignedOut>
              
              <SignedIn>
                <Link to="/dashboard" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Go to Dashboard
                </Link>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden border-t border-gray-200 py-4 space-y-4"
            >
              <a href="#features" className="block text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-primary-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="block text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              <a href="#contact" className="block text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <SignedOut>
                  <Link to="/auth" className="block text-center text-gray-600 hover:text-primary-600 transition-colors font-medium py-2">
                    Sign In
                  </Link>
                  <Link to="/auth" className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    Get Started
                  </Link>
                </SignedOut>
                
                <SignedIn>
                  <Link to="/dashboard" className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                    Go to Dashboard
                  </Link>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Never Miss a <span className="text-primary-600">Payment</span> Again
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Take control of your finances with smart payment reminders, automated tracking, and powerful analytics. Stay organized and never pay late fees again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignedOut>
                  <Link to="/auth" className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Start Free Trial</span>
                    <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                  </Link>
                </SignedOut>
                
                <SignedIn>
                  <Link to="/dashboard" className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Go to Dashboard</span>
                    <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                  </Link>
                </SignedIn>
                
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your payments efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <SafeIcon icon={feature.icon} className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps and take control of your payments today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Add Your Payments",
                description: "Quickly add all your recurring payments with due dates, amounts, and notes."
              },
              {
                step: "02",
                title: "Set Up Reminders",
                description: "Configure smart reminders to notify you before payments are due."
              },
              {
                step: "03",
                title: "Stay Organized",
                description: "Track your payment history, generate receipts, and analyze your spending."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their payment management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: [
                  "Up to 5 payments",
                  "Basic reminders",
                  "Payment history",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Pro",
                price: "$9",
                period: "per month",
                features: [
                  "Unlimited payments",
                  "Smart notifications",
                  "Receipt generation",
                  "Export to PDF/CSV",
                  "Advanced analytics",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Business",
                price: "$29",
                period: "per month",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "Custom categories",
                  "API access",
                  "White-label options",
                  "Dedicated support"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl border-2 p-8 ${
                  plan.popular ? 'border-primary-600 shadow-lg' : 'border-gray-200 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <SafeIcon icon={FiCheck} className="h-5 w-5 text-primary-600 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <SignedOut>
                  <Link to="/auth" className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition-colors ${
                    plan.popular 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Get Started
                  </Link>
                </SignedOut>
                
                <SignedIn>
                  <Link to="/dashboard" className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition-colors ${
                    plan.popular 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Go to Dashboard
                  </Link>
                </SignedIn>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Payments?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who never miss a payment. Start your free trial today.
            </p>
            <SignedOut>
              <Link to="/auth" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                <span>Start Free Trial</span>
                <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link to="/dashboard" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                <span>Go to Dashboard</span>
                <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiCreditCard} className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">PayReminder</span>
              </div>
              <p className="text-gray-400 mb-4">
                The smart way to manage your payments and never miss a due date.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <SafeIcon icon={FiMail} className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PayReminder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
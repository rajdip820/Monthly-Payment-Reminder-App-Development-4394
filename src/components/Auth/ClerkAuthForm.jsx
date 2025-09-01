import React from 'react'
import { motion } from 'framer-motion'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { useState } from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCreditCard } = FiIcons

const ClerkAuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <SafeIcon icon={FiCreditCard} className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
            </p>
          </div>

          {/* Clerk Auth Component */}
          <div className="flex justify-center">
            {isSignUp ? (
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
                    footerActionLink: "text-primary-600 hover:text-primary-700"
                  }
                }}
              />
            ) : (
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
                    footerActionLink: "text-primary-600 hover:text-primary-700"
                  }
                }}
              />
            )}
          </div>

          {/* Toggle Form */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClerkAuthForm
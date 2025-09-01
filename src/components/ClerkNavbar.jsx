import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { useClerkAuth } from '../contexts/ClerkAuthContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCreditCard, FiHome, FiClock, FiArchive, FiUser } = FiIcons

const ClerkNavbar = () => {
  const { user } = useClerkAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Reminders', href: '/reminders', icon: FiClock },
    { name: 'History', href: '/history', icon: FiArchive },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <SafeIcon icon={FiCreditCard} className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">PayReminder</span>
          </Link>

          {/* Navigation Links - Only show when signed in */}
          <SignedIn>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </SignedIn>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiUser} className="h-4 w-4" />
                <span className="hidden sm:block">{user?.emailAddresses[0]?.emailAddress}</span>
              </div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <span>Sign In</span>
                </motion.button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Navigation - Only show when signed in */}
        <SignedIn>
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex justify-around">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="h-5 w-5 mb-1" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}

export default ClerkNavbar
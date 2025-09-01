import React, { createContext, useContext } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'

const ClerkAuthContext = createContext({})

export const useClerkAuth = () => {
  const context = useContext(ClerkAuthContext)
  if (!context) {
    throw new Error('useClerkAuth must be used within a ClerkAuthProvider')
  }
  return context
}

export const ClerkAuthProvider = ({ children }) => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser()
  const { signOut, isLoaded: authLoaded } = useAuth()

  const loading = !userLoaded || !authLoaded

  const value = {
    user: isSignedIn ? user : null,
    loading,
    signOut,
    isSignedIn: isSignedIn || false
  }

  return (
    <ClerkAuthContext.Provider value={value}>
      {children}
    </ClerkAuthContext.Provider>
  )
}
import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { ClerkAuthProvider } from './contexts/ClerkAuthContext'
import { testConnection } from './lib/supabase'
import LandingPage from './pages/LandingPage'
import ClerkAuthForm from './components/Auth/ClerkAuthForm'
import Dashboard from './pages/ClerkDashboard'
import Reminders from './pages/ClerkReminders'
import History from './pages/ClerkHistory'
import './App.css'

const ProtectedRoute = ({ children }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  )
}

const PublicRoute = ({ children }) => {
  return (
    <>
      <SignedOut>
        {children}
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
    </>
  )
}

const AppContent = () => {
  React.useEffect(() => {
    // Test Supabase connection on app load
    testConnection()
  }, [])

  return (
    <ClerkAuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Landing Page - Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Authentication - Public Route */}
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <ClerkAuthForm />
                </PublicRoute>
              } 
            />
            
            {/* App Routes - Protected */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reminders" 
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect unknown routes to landing */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ClerkAuthProvider>
  )
}

function App() {
  return <AppContent />
}

export default App
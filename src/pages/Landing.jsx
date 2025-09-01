import React from 'react'
import LandingHeader from '../components/Landing/LandingHeader'
import LandingHero from '../components/Landing/LandingHero'
import LandingFeatures from '../components/Landing/LandingFeatures'
import LandingHowItWorks from '../components/Landing/LandingHowItWorks'
import LandingPricing from '../components/Landing/LandingPricing'
import LandingFooter from '../components/Landing/LandingFooter'

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingFooter />
    </div>
  )
}

export default Landing
import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'events calendar micro-site for ninjaHQ & injective 📆',
  description: 'events calendar micro-site for ninjaHQ & injective 📆',
  keywords: ['events', 'calendar', 'ninjaHQ', 'injective', 'micro-site', 'web3', 'community'],
  openGraph: {
    title: 'events calendar micro-site for ninjaHQ & injective 📆',
    description: 'events calendar micro-site for ninjaHQ & injective 📆',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'events calendar micro-site for ninjaHQ & injective 📆',
    description: 'events calendar micro-site for ninjaHQ & injective 📆',
  },
}

export default function LandingPage() {
  return <LandingPageContent />
}

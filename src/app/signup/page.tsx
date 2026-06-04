import type { Metadata } from 'next'
import { SignupClient } from '@/components/auth/SignupClient'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your free RideFlow account to rent and buy vehicles with crypto.',

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  alternates: {
    canonical: '/signup',
  },
}

export default function SignupPage() {
  return <SignupClient />
}
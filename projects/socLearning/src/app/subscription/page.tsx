'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { useEffect } from 'react'
import { CreditCard, AlertCircle, CheckCircle } from 'lucide-react'

export default function SubscriptionPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navbar />

      {/* Hero Section */}
      <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Subscription Management
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage your subscription and billing settings
          </p>
        </div>
      </div>

      {/* Subscription Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Current Plan */}
        <div className={`rounded-lg border mb-8 overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Current Plan
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Plan Type
                </p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Starter (Free)
                </p>
              </div>
              <CheckCircle className={`w-12 h-12 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            </div>

            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Status
              </p>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                ✅ Active
              </p>
            </div>

            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Renewal Date
              </p>
              <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Renews monthly (ongoing)
              </p>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition">
              Upgrade to Professional
            </button>
          </div>
        </div>

        {/* Billing Information */}
        <div className={`rounded-lg border mb-8 overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} flex items-center gap-3`}>
            <CreditCard className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Billing Information
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                Payment Method
              </p>
              <button className={`px-4 py-3 rounded-lg border transition ${
                theme === 'dark'
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}>
                Add Payment Method
              </button>
            </div>

            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                Billing Email
              </p>
              <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {user.email}
              </p>
            </div>

            <button className={`px-4 py-3 rounded-lg border transition ${
              theme === 'dark'
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}>
              Download Invoices
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className={`rounded-lg border p-6 flex items-start gap-4 ${
          theme === 'dark'
            ? 'bg-blue-900/20 border-blue-800'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <p className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>
              Need help?
            </p>
            <p className={theme === 'dark' ? 'text-blue-200/80' : 'text-blue-800/80'}>
              Contact our support team at support@socacademy.com or visit our Contact page
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

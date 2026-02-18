'use client'

import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const { user } = useAuth()
  const { theme } = useTheme()

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'Perfect for beginners',
      features: [
        'Access to 5 beginner lessons',
        'Basic quizzes',
        'Community forum access',
        'Limited lab access',
        'Email support'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For serious learners',
      features: [
        'All Starter features',
        'Unlimited lessons',
        'Advanced labs',
        'Interactive challenges',
        'Priority support',
        'Certificate of completion',
        'One-on-one mentoring (2/month)'
      ],
      cta: 'Subscribe Now',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For teams & organizations',
      features: [
        'All Professional features',
        'Team collaboration tools',
        'Custom curriculum',
        'Dedicated account manager',
        'Advanced analytics',
        'API access',
        'Unlimited mentoring'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {user && <Navbar />}

      {/* Hero Section */}
      <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Pricing Plans
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Choose the perfect plan for your learning journey
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border transition ${
                plan.highlighted
                  ? theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900 to-slate-800 border-blue-500 ring-2 ring-blue-500 shadow-xl scale-105'
                    : 'bg-gradient-to-br from-blue-50 to-white border-blue-500 ring-2 ring-blue-500 shadow-xl scale-105'
                  : theme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              } p-8`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {plan.name}
              </h3>

              <p className={`mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {plan.price}
                </span>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                  {plan.period}
                </span>
              </div>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition mb-8 ${
                plan.highlighted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      plan.highlighted
                        ? theme === 'dark'
                          ? 'text-blue-400'
                          : 'text-blue-600'
                        : theme === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }`} />
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, cancel your subscription at any time with no penalties.' },
              { q: 'Is there a free trial?', a: 'Yes! Start with our Starter plan completely free.' },
              { q: 'Do you offer refunds?', a: '30-day money-back guarantee on all paid plans.' },
              { q: 'Can I upgrade/downgrade?', a: 'Yes, switch plans anytime. Credits are prorated.' }
            ].map((faq, i) => (
              <div key={i} className={`p-6 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {faq.q}
                </h3>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

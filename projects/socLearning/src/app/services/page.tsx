'use client'

import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { Shield, Code, Zap, Users, BookOpen, Award } from 'lucide-react'

export default function ServicesPage() {
  const { user } = useAuth()
  const { theme } = useTheme()

  const services = [
    {
      icon: Code,
      title: 'Interactive Labs',
      description: 'Hands-on practical exercises with real-world scenarios',
      features: ['Live command execution', 'Real-time feedback', 'Progressive difficulty']
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Lessons',
      description: 'In-depth tutorials covering SOC fundamentals to advanced topics',
      features: ['Video tutorials', 'Code examples', 'Downloadable resources']
    },
    {
      icon: Shield,
      title: 'Security Challenges',
      description: 'Capture-the-flag style challenges to test your skills',
      features: ['Scoring system', 'Leaderboards', 'Certificate rewards']
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with SOC professionals and get mentorship',
      features: ['Forums', 'Live Q&A sessions', 'Networking events']
    },
    {
      icon: Zap,
      title: 'Quiz & Assessments',
      description: 'Test your knowledge with comprehensive quizzes',
      features: ['Instant feedback', 'Performance tracking', 'Detailed reports']
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn industry-recognized certifications upon completion',
      features: ['Digital badges', 'LinkedIn integration', 'Resume-ready credentials']
    },
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {user && <Navbar />}

      {/* Hero Section */}
      <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Our Services
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Comprehensive SOC training and hands-on experience for blue team professionals
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border transition hover:shadow-lg ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-500'
                    : 'bg-white border-slate-200 hover:border-blue-500'
                }`}
              >
                <div className={`inline-block p-3 rounded-lg mb-4 ${
                  theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>

                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {service.title}
                </h3>

                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Ready to get started?
          </h2>
          {user ? (
            <Link
              href="/home"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { useTheme } from '@/providers/ThemeProvider'
import { BookOpen, Code, Zap, Award } from 'lucide-react'
import Link from 'next/link'

export default function AuthenticatedHomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navbar />

      {/* Welcome Section */}
      <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Welcome back, {user.username}! 👋
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            You're logged in as <span className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{user.role}</span>
          </p>
          <p className={`mt-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
            Role: {user.role} | Lessons Completed: {user.completedLessons.length}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Your Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              label: 'Lessons Completed',
              value: user.completedLessons.length.toString(),
              color: 'from-blue-600 to-blue-500'
            },
            {
              icon: Code,
              label: 'Commands Learned',
              value: user.commandsLearned.toString(),
              color: 'from-purple-600 to-purple-500'
            },
            {
              icon: Zap,
              label: 'Current Streak',
              value: user.streakDays.toString(),
              color: 'from-orange-600 to-orange-500'
            },
            {
              icon: Award,
              label: 'Quiz Score',
              value: `${user.quizScore}%`,
              color: 'from-green-600 to-green-500'
            }
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg p-6 border transition hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800 to-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/dashboard"
            className={`rounded-lg p-8 border transition hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-800 to-slate-800 border-slate-700 hover:border-blue-600'
                : 'bg-white border-slate-200 hover:border-blue-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  📊 Go to Dashboard
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Access all your lessons, quizzes, certifications, and reports
                </p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>

          <Link
            href="/services"
            className={`rounded-lg p-8 border transition hover:shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-800 to-slate-800 border-slate-700 hover:border-purple-600'
                : 'bg-white border-slate-200 hover:border-purple-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  🎯 Explore Services
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Check out our premium training programs and certifications
                </p>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-lg p-8 border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            📈 Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                Total Hours Learned
              </span>
              <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {user.hoursLearned} hours
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                Labs Completed
              </span>
              <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {user.completedLabs.length} labs
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                Last Active
              </span>
              <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {new Date(user.lastActive).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

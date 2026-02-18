'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { useTheme } from '@/providers/ThemeProvider'
import { 
  BookOpen, Code, Zap, Award, TrendingUp, Target, Lightbulb, CheckCircle2, 
  ArrowRight, Clock, Users, Star, Flame, Rocket, Shield, GraduationCap
} from 'lucide-react'
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

  const stats = [
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: user.completedLessons.length.toString(),
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Code,
      label: 'Commands Learned',
      value: user.commandsLearned.toString(),
      color: 'from-purple-600 to-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: user.streakDays.toString(),
      color: 'from-orange-600 to-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      icon: Award,
      label: 'Quiz Score',
      value: `${user.quizScore}%`,
      color: 'from-green-600 to-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    }
  ]

  const learningPaths = [
    {
      title: 'Windows Security',
      description: 'Master Windows security fundamentals and advanced techniques',
      progress: 65,
      lessons: 12,
      icon: Shield,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Network Analysis',
      description: 'Learn packet analysis and network monitoring tools',
      progress: 40,
      lessons: 8,
      icon: Zap,
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Incident Response',
      description: 'Develop incident response and threat hunting skills',
      progress: 25,
      lessons: 15,
      icon: Target,
      color: 'from-orange-600 to-red-600'
    },
    {
      title: 'SIEM & Tools',
      description: 'Master Splunk, ELK, and other security tools',
      progress: 55,
      lessons: 10,
      icon: Rocket,
      color: 'from-green-600 to-emerald-600'
    }
  ]

  const achievements = [
    { icon: GraduationCap, label: 'Level 3 - Analyst', earned: true },
    { icon: TrendingUp, label: 'Perfect Week', earned: true },
    { icon: Zap, label: '30 Day Streak', earned: false },
    { icon: Star, label: 'Top Scorer', earned: false },
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navbar />

      {/* Hero Banner */}
      <div className={`relative overflow-hidden border-b ${theme === 'dark' ? 'border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'border-slate-200 bg-gradient-to-br from-slate-50 to-white'}`}>
        <div className="absolute inset-0 opacity-50">
          <div className={`absolute top-0 left-0 w-96 h-96 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-3xl`}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold">
                👋 Welcome Back
              </div>
              <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Ready to Level Up? 🚀
              </h1>
              <p className={`text-xl mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Continue your SOC Blue Team journey and master cybersecurity skills
              </p>
              <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                You're <span className="font-semibold text-blue-500">{user.role}</span> • {user.completedLessons.length} lessons completed • {user.streakDays} day streak 🔥
              </p>
            </div>
            <div className={`hidden lg:block text-6xl opacity-20`}>
              🛡️
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg p-6 border transition hover:shadow-lg hover:scale-105 transform ${
                theme === 'dark'
                  ? `bg-slate-800/80 border-slate-700 ${stat.borderColor} hover:border-slate-600`
                  : `bg-white border-slate-200 ${stat.borderColor} hover:border-slate-300`
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

        {/* Learning Paths */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                📚 Your Learning Paths
              </h2>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                Master cybersecurity skills with our curated learning tracks
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => {
              const Icon = path.icon
              return (
                <div
                  key={path.title}
                  className={`rounded-lg p-6 border transition hover:shadow-lg overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                      {path.progress}%
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {path.title}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {path.description}
                  </p>
                  <div className={`w-full rounded-full h-2 mb-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <div className={`h-2 rounded-full bg-gradient-to-r ${path.color}`} style={{ width: `${path.progress}%` }}></div>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                    {path.lessons} lessons • Continue learning
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievements & Badges */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            🏆 Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon
              return (
                <div
                  key={idx}
                  className={`rounded-lg p-6 text-center transition transform hover:scale-105 ${
                    achievement.earned
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border border-yellow-700/50'
                        : 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200'
                      : theme === 'dark'
                        ? 'bg-slate-800/50 border border-slate-700 opacity-50'
                        : 'bg-slate-100/50 border border-slate-200 opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.earned ? 'bg-gradient-to-br from-yellow-500 to-amber-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}>
                    <Icon className={achievement.earned ? 'text-white' : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} size={28} />
                  </div>
                  <p className={`font-semibold ${achievement.earned ? (theme === 'dark' ? 'text-yellow-400' : 'text-amber-600') : theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {achievement.label}
                  </p>
                  {achievement.earned && (
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      ✓ Earned
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link
            href="/dashboard"
            className={`rounded-lg p-8 border transition hover:shadow-lg hover:scale-105 transform ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700/50 hover:border-blue-600'
                : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  📊 Dashboard
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Access lessons, quizzes, and certifications
                </p>
              </div>
              <ArrowRight className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={24} />
            </div>
          </Link>

          <Link
            href="/services"
            className={`rounded-lg p-8 border transition hover:shadow-lg hover:scale-105 transform ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700/50 hover:border-purple-600'
                : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  🎯 Services
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Explore premium training programs
                </p>
              </div>
              <ArrowRight className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
          </Link>

          <Link
            href="/dashboard?section=lessons"
            className={`rounded-lg p-8 border transition hover:shadow-lg hover:scale-105 transform ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700/50 hover:border-green-600'
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  📖 Continue Learning
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Resume your last lesson
                </p>
              </div>
              <ArrowRight className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} size={24} />
            </div>
          </Link>
        </div>

        {/* Stats Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Learning Stats */}
          <div className={`rounded-lg p-8 border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                <Clock className="text-white" size={20} />
              </div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Learning Statistics
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Total Hours Learned
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {user.hoursLearned} hours
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600" style={{ width: `${Math.min((user.hoursLearned / 100) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Labs Completed
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {user.completedLabs.length} / 25
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" style={{ width: `${(user.completedLabs.length / 25) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                    Commands Mastered
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {user.commandsLearned} / 100
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="h-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600" style={{ width: `${(user.commandsLearned / 100) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className={`rounded-lg p-8 border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Account Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Username</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.username}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Role</span>
                <span className={`font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm`}>{user.role}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Last Active</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{new Date(user.lastActive).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Member Since</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Jan 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Recommendations */}
        <div className={`rounded-lg p-8 border mb-8 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-700' : 'bg-gradient-to-br from-slate-50 to-white border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
              <Lightbulb className="text-white" size={20} />
            </div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              💡 Recommended Next Steps
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Complete Windows Security Path
                  </p>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    3 lessons remaining to master Windows security
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <Target className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Take SIEM Tools Quiz
                  </p>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Test your knowledge on SIEM tools
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <TrendingUp className="text-purple-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Maintain Your Streak
                  </p>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    You're on a {user.streakDays} day streak! Keep it up 🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

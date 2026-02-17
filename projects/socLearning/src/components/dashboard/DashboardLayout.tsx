'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { User } from '@/types'
import OverviewSection from './sections/OverviewSection'
import ProfileSection from './sections/ProfileSection'
import QuizSection from './sections/QuizSection'
import RoadmapSection from './sections/RoadmapSection'
import LessonsSection from './sections/LessonsSection'
import CertificationsSection from './sections/CertificationsSection'
import ReportsSection from './sections/ReportsSection'

type Section = 'overview' | 'profile' | 'quiz' | 'roadmap' | 'lessons' | 'certifications' | 'reports'

export default function DashboardLayout({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const router = useRouter()
  const { logout } = useAuth()
  const { toggleTheme, theme } = useTheme()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">🛡️ Academy</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'profile', label: '👤 Profile', icon: '👤' },
            { id: 'lessons', label: '📚 Lessons', icon: '📚' },
            { id: 'quiz', label: '📝 Quiz', icon: '📝' },
            { id: 'roadmap', label: '🎯 Roadmap', icon: '🎯' },
            { id: 'certifications', label: '🏆 Certifications', icon: '🏆' },
            { id: 'reports', label: '📈 Reports', icon: '📈' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700 rounded-lg transition"
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-900/20 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-3xl font-bold text-white">Welcome, {user.username}! 👋</h2>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Role: {user.role}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeSection === 'overview' && <OverviewSection user={user} />}
          {activeSection === 'profile' && <ProfileSection user={user} />}
          {activeSection === 'lessons' && <LessonsSection user={user} />}
          {activeSection === 'quiz' && <QuizSection user={user} />}
          {activeSection === 'roadmap' && <RoadmapSection user={user} />}
          {activeSection === 'certifications' && <CertificationsSection />}
          {activeSection === 'reports' && <ReportsSection />}
        </div>
      </main>
    </div>
  )
}

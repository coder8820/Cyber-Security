'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { useDashboardTheme, type DashboardTheme } from '@/context/DashboardThemeContext'
import { User } from '@/types'
import OverviewSection from './sections/OverviewSection'
import ProfileSection from './sections/ProfileSection'
import QuizSection from './sections/QuizSection'
import RoadmapSection from './sections/RoadmapSection'
import LessonsSection from './sections/LessonsSection'
import CertificationsSection from './sections/CertificationsSection'
import ReportsSection from './sections/ReportsSection'
import { Home, User as UserIcon, BookOpen, FileText, Zap, Award, BarChart3, Menu, X, Palette } from 'lucide-react'

type Section = 'overview' | 'profile' | 'quiz' | 'roadmap' | 'lessons' | 'certifications' | 'reports'

const dashboardThemeOptions: { name: string; value: DashboardTheme; color: string }[] = [
  { name: 'Blue', value: 'blue', color: 'bg-blue-600' },
  { name: 'Purple', value: 'purple', color: 'bg-purple-600' },
  { name: 'Green', value: 'green', color: 'bg-green-600' },
  { name: 'Amber', value: 'amber', color: 'bg-amber-600' },
  { name: 'Rose', value: 'rose', color: 'bg-rose-600' },
  { name: 'Cyan', value: 'cyan', color: 'bg-cyan-600' },
]

function DashboardLayoutContent({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<Section>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()
  const { toggleTheme, theme } = useTheme()
  const { theme: dashboardTheme, setTheme: setDashboardTheme } = useDashboardTheme()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: FileText },
    { id: 'roadmap', label: 'Roadmap', icon: Zap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 p-4 flex flex-col transition-all duration-300 sticky top-0 h-screen shadow-2xl`}>
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🛡️</span>
              </div>
              <h1 className="text-xl font-bold text-white">Academy</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/50'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="space-y-2 pt-4 border-t border-slate-700/50">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition"
            >
              <Palette size={20} />
              {sidebarOpen && <span className="font-medium">Theme</span>}
            </button>
            
            {showThemeMenu && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-700 border border-slate-600 rounded-lg p-3 shadow-lg">
                <div className="grid grid-cols-3 gap-2">
                  {dashboardThemeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDashboardTheme(option.value)
                        setShowThemeMenu(false)
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${
                        dashboardTheme === option.value
                          ? `${option.color} text-white shadow-lg`
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            {sidebarOpen && <span className="font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-lg transition"
          >
            <Home size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 p-6 flex justify-between items-center sticky top-0 z-10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-white">Welcome, {user.username}! 👋</h2>
            <p className="text-slate-400 text-sm mt-1">Role: {user.role}</p>
          </div>
          <button
            onClick={() => router.push('/home')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-600/50"
          >
            🏠 Go to Home
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-8">
          {activeSection === 'overview' && <OverviewSection user={user} />}
          {activeSection === 'profile' && <ProfileSection user={user} />}
          {activeSection === 'lessons' && <LessonsSection user={user} />}
          {activeSection === 'quiz' && <QuizSection user={user} />}
          {activeSection === 'roadmap' && <RoadmapSection user={user} />}
          {activeSection === 'certifications' && <CertificationsSection />}
          {activeSection === 'reports' && <ReportsSection user={user} />}
        </div>
      </main>
    </div>
  )
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 p-4 flex flex-col transition-all duration-300 sticky top-0 h-screen shadow-2xl`}>
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🛡️</span>
              </div>
              <h1 className="text-xl font-bold text-white">Academy</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/50'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="space-y-2 pt-4 border-t border-slate-700/50">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition"
            >
              <Palette size={20} />
              {sidebarOpen && <span className="font-medium">Theme</span>}
            </button>
            
            {showThemeMenu && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-700 border border-slate-600 rounded-lg p-3 shadow-lg">
                <div className="grid grid-cols-3 gap-2">
                  {dashboardThemeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDashboardTheme(option.value)
                        setShowThemeMenu(false)
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${
                        dashboardTheme === option.value
                          ? `${option.color} text-white shadow-lg`
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            {sidebarOpen && <span className="font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-lg transition"
          >
            <Home size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 p-6 flex justify-between items-center sticky top-0 z-10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-white">Welcome, {user.username}! 👋</h2>
            <p className="text-slate-400 text-sm mt-1">Role: {user.role}</p>
          </div>
          <button
            onClick={() => router.push('/home')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition shadow-lg shadow-blue-600/50"
          >
            🏠 Go to Home
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-8">
          {activeSection === 'overview' && <OverviewSection user={user} />}
          {activeSection === 'profile' && <ProfileSection user={user} />}
          {activeSection === 'lessons' && <LessonsSection user={user} />}
          {activeSection === 'quiz' && <QuizSection user={user} />}
          {activeSection === 'roadmap' && <RoadmapSection user={user} />}
          {activeSection === 'certifications' && <CertificationsSection />}
          {activeSection === 'reports' && <ReportsSection user={user} />}
        </div>
      </main>
    </div>
  )
}

export default function DashboardLayout({ user }: { user: User }) {
  return <DashboardLayoutContent user={user} />
}

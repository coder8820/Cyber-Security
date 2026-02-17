'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import Link from 'next/link'
import { lessonsData } from '@/lib/data'
import { Star, Users, Clock, ArrowRight, BookOpen, Code, Terminal, ShieldAlert, Search } from 'lucide-react'
import EnrollmentModal from '@/components/home/EnrollmentModal'

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'

export default function HomePage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState<typeof lessonsData[0] | null>(null)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')

  const filteredCourses = lessonsData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  const handleEnrollClick = (course: typeof lessonsData[0]) => {
    setSelectedCourse(course)
    if (!user) {
      setShowEnrollModal(true)
    } else {
      router.push('/home')
    }
  }

  const handleLoginSuccess = () => {
    setShowEnrollModal(false)
    router.push('/home')
  }

  const difficultyStats = {
    Beginner: lessonsData.filter(c => c.difficulty === 'Beginner').length,
    Intermediate: lessonsData.filter(c => c.difficulty === 'Intermediate').length,
    Advanced: lessonsData.filter(c => c.difficulty === 'Advanced').length,
    Professional: lessonsData.filter(c => c.difficulty === 'Professional').length,
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Navigation */}
      <nav className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldAlert className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={32} />
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🛡️ SOC Academy
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg transition ${
                theme === 'dark'
                  ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            {user ? (
              <Link
                href="/home"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Home
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-slate-600 text-white hover:bg-slate-700'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                  } transition`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-600 to-blue-400'} text-white py-20 px-4`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Master SOC Operations & Blue Team Skills</h2>
          <p className="text-xl mb-8 opacity-90">
            Learn PowerShell, Command Prompt, networking, and advanced security operations from industry experts
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <BookOpen size={20} />
              <span>{lessonsData.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Users size={20} />
              <span>5000+ Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Star size={20} />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} py-8 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
                } focus:outline-none focus:border-blue-500 transition`}
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Professional'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
                    selectedDifficulty === level
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {level} {level !== 'All' && `(${difficultyStats[level as Exclude<typeof level, 'All'>]})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-3xl font-bold mb-12 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Available Courses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const difficultyColors: Record<Difficulty, string> = {
                Beginner: 'bg-green-100 text-green-800',
                Intermediate: 'bg-yellow-100 text-yellow-800',
                Advanced: 'bg-orange-100 text-orange-800',
                Professional: 'bg-red-100 text-red-800',
              }

              return (
                <div
                  key={course.id}
                  className={`rounded-lg overflow-hidden border transition hover:shadow-lg cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-500'
                      : 'bg-white border-slate-200 hover:border-blue-500'
                  }`}
                  onClick={() => {
                    setSelectedCourse(course)
                    setShowEnrollModal(true)
                  }}
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-3 py-1 rounded text-sm font-medium ${difficultyColors[course.difficulty as Difficulty]}`}>
                        {course.difficulty}
                      </div>
                      <Star className="fill-yellow-300 text-yellow-300" size={20} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                    <p className="text-blue-100">{course.description}</p>
                  </div>

                  {/* Course Stats */}
                  <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code size={16} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Category: {course.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="mb-4 space-y-2">
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {course.objectives?.length || 0} Learning Objectives
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {course.keyCommands?.length || 0} Key Commands
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {course.practiceExercises?.length || 0} Practice Exercises
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEnrollClick(course)
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      Enroll Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <p className="text-xl">No courses found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment Modal */}
      {showEnrollModal && selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
        />
      )}

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border-t py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                About
              </h5>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Premier SOC operations training platform for blue team professionals
              </p>
            </div>
            <div>
              <h5 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Courses</h5>
              <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-500">PowerShell</a></li>
                <li><a href="#" className="hover:text-blue-500">Network Security</a></li>
                <li><a href="#" className="hover:text-blue-500">Threat Hunting</a></li>
              </ul>
            </div>
            <div>
              <h5 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Resources</h5>
              <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-500">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-500">Blog</a></li>
                <li><a href="#" className="hover:text-blue-500">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Legal</h5>
              <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-500">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-500">Terms</a></li>
                <li><a href="#" className="hover:text-blue-500">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} pt-8 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>&copy; 2026 SOC Blue Team Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

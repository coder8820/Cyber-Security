'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import { X, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { UserRole } from '@/types'

interface EnrollmentModalProps {
  course: any
}

export default function EnrollmentModal({ course }: EnrollmentModalProps) {
  const { login, register } = useAuth()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'details' | 'login' | 'register'>('details')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login form state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student' as UserRole,
  })

  const closeModal = () => {
    // Navigate back or close
    window.history.back()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(loginForm.username, loginForm.password)
      if (result.success) {
        // Redirect to home
        window.location.href = '/home'
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await register(
        registerForm.username,
        registerForm.email,
        registerForm.password,
        registerForm.confirmPassword,
        registerForm.role
      )
      if (result.success) {
        // Registration successful - redirect to login page for user to login
        window.location.href = '/login'
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    // Google OAuth will be implemented in next phase
    // For now, show a placeholder
    alert('Google Login will be available soon! Currently, use email login.')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex`}>
        {/* Left Side - Course Details */}
        <div className={`w-2/5 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} p-6 overflow-y-auto hidden lg:flex flex-col`}>
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-4 text-white mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-blue-100">{course.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Duration:</span>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{course.duration}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Difficulty:</span>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{course.difficulty}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Category:</span>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{course.category}</p>
              </div>
            </div>
          </div>

          {course.objectives && (
            <div>
              <h4 className="font-bold mb-3 text-slate-900 dark:text-white">Learning Objectives</h4>
              <ul className="space-y-2">
                {course.objectives.slice(0, 5).map((obj: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-3/5 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-600">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Enroll in Course
            </h2>
            <button
              onClick={closeModal}
              className={`p-2 rounded-lg transition ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-600">
            {['details', 'login', 'register'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'details' | 'login' | 'register')}
                className={`flex-1 py-3 px-4 text-center font-medium transition ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-slate-300'
                      : 'text-slate-600 hover:text-slate-700'
                }`}
              >
                {tab === 'details' && '📋 Details'}
                {tab === 'login' && '🔐 Login'}
                {tab === 'register' && '✍️ Register'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Course Overview
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {course.description}
                  </p>
                </div>

                {course.keyCommands && (
                  <div>
                    <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Key Commands ({course.keyCommands.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {course.keyCommands.slice(0, 5).map((cmd: any, idx: number) => (
                        <div key={idx} className={`p-2 rounded text-sm ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                          <code className="font-mono text-blue-500">{cmd.command}</code>
                          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {cmd.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => setActiveTab('login')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Continue to Login
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Sign In to Your Account
                </h3>

                {error && (
                  <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Username
                  </label>
                  <div className="relative">
                    <User size={18} className={`absolute left-3 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      } focus:outline-none focus:border-blue-500`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className={`absolute left-3 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      } focus:outline-none focus:border-blue-500`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-600' : 'border-slate-300'}`} />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className={`px-2 ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-600'}`}>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className={`w-full py-2 rounded-lg border transition font-medium ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-700'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    🔵 Sign in with Google
                  </button>
                </div>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Register here
                  </button>
                </p>
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Create New Account
                </h3>

                {error && (
                  <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:border-blue-500`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:border-blue-500`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Role
                  </label>
                  <select
                    value={registerForm.role}
                    onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value as UserRole })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:border-blue-500`}
                  >
                    <option value="Student">Student</option>
                    <option value="SOC Analyst">SOC Analyst</option>
                    <option value="Instructor">Instructor</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars with uppercase, lowercase & numbers"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:border-blue-500 text-sm`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border pr-10 ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      } focus:outline-none focus:border-blue-500`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className={`w-full py-2 rounded-lg border transition font-medium ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-700'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    🔵 Sign up with Google
                  </button>
                </div>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

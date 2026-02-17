'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import Link from 'next/link'
import { UserRole } from '@/types'
import { Eye, EyeOff, Shield, Zap, Users, Award, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student' as UserRole,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.role
      )

      if (result.success) {
        router.push('/home')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setGoogleLoading(true)
    alert('🔵 Google Sign-up will be available soon!\n\nFor now, use the registration form above.')
    setGoogleLoading(false)
  }

  const features = [
    { icon: Shield, title: 'Secure Learning', desc: 'Enterprise-grade security for your training' },
    { icon: Zap, title: 'Real-Time Practice', desc: 'Hands-on labs with immediate feedback' },
    { icon: Users, title: 'Expert Community', desc: 'Learn from SOC professionals' },
    { icon: Award, title: 'Certifications', desc: 'Earn recognized industry credentials' },
  ]

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition transform hover:scale-110 ${
            theme === 'dark'
              ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
              : 'bg-white hover:bg-slate-100 text-slate-900 shadow-md'
          }`}
          title="Toggle Theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Left Section - Branding & Features */}
      <div className={`hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600'
      }`}>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />

        {/* Logo & Title */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className={theme === 'dark' ? 'text-blue-400' : 'text-white'} size={28} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                SOC Academy
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-white/80'}`}>
                Blue Team Training
              </p>
            </div>
          </div>
          <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-slate-300' : 'text-white/90'} max-w-md`}>
            Join thousands of professionals mastering security operations
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                theme === 'dark'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-white/20 text-white'
              }`}>
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-white/80'}`}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white/10 border border-white/20'}`}>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>5000+</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-white/80'}`}>Active Students</p>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white/10 border border-white/20'}`}>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>4.9★</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-white/80'}`}>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12`}>
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-purple-400 to-pink-400'
                : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Get Started
            </h2>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Create your SOC Academy account today
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose your username"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-purple-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800/80'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-purple-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800/80'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
                required
              />
            </div>

            {/* Role Field */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Your Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-purple-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="Student">Student - Learning SOC Operations</option>
                <option value="SOC Analyst">SOC Analyst - Professional Experience</option>
                <option value="Instructor">Instructor - Teaching Others</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars, mix of upper/lower/numbers"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-purple-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800/80'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition focus:outline-none focus:border-purple-500 ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800/80'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-3.5 transition ${
                    theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-lg border-l-4 ${
                theme === 'dark'
                  ? 'bg-red-900/20 border-red-500 text-red-300'
                  : 'bg-red-50 border-red-400 text-red-800'
              }`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-3 ${theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold border-2 transition flex items-center justify-center gap-2 ${
              theme === 'dark'
                ? 'border-slate-700 text-white hover:bg-slate-900'
                : 'border-slate-300 text-slate-900 hover:bg-slate-100'
            }`}
          >
            {googleLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <span>🔵</span>
                Sign up with Google
              </>
            )}
          </button>

          {/* Login Link */}
          <div className={`mt-8 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-500 hover:text-purple-600 font-semibold transition">
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className={`mt-4 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <Link
              href="/"
              className={`inline-flex items-center gap-1 text-sm hover:gap-2 transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

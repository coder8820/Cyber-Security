'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/providers/ThemeProvider'
import Link from 'next/link'
import { Eye, EyeOff, Shield, Zap, Users, Award, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { toggleTheme, theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password)
      if (result.success) {
        router.push('/home')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    alert('🔵 Google Login will be available soon!\n\nUse the demo credentials:\n- admin / admin123\n- analyst / analyst123\n- student / student123')
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
          : 'bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600'
      }`}>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />

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
            Master Security Operations Center skills with industry-leading training
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

      {/* Right Section - Login Form */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12`}>
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Welcome Back
            </h2>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Log in to your SOC Academy account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-blue-500 ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800/80'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition focus:outline-none focus:border-blue-500 ${
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className={`w-4 h-4 rounded border-2 cursor-pointer ${
                    theme === 'dark'
                      ? 'border-slate-600 bg-slate-800'
                      : 'border-slate-300 bg-slate-50'
                  }`}
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600 transition">
                Forgot password?
              </a>
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
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
                Sign in with Google
              </>
            )}
          </button>

          {/* Demo Info Box */}
          <div className={`mt-8 p-5 rounded-lg border-2 ${
            theme === 'dark'
              ? 'bg-blue-900/10 border-blue-500/30'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
            }`}>
              💡 Demo Credentials
            </p>
            <div className={`space-y-2 text-xs font-mono ${
              theme === 'dark'
                ? 'text-slate-300 bg-slate-900/30 p-3 rounded'
                : 'text-slate-700 bg-white/50 p-3 rounded'
            }`}>
              <div>admin <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>/ admin123</span></div>
              <div>analyst <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>/ analyst123</span></div>
              <div>student <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>/ student123</span></div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className={`mt-8 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <p className="text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-500 hover:text-blue-600 font-semibold transition">
                Create one
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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/providers/ThemeProvider'
import { authSystem } from '@/lib/auth'
import Link from 'next/link'

export default function ClearDataPage() {
  const [cleared, setCleared] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleClearAllData = () => {
    setLoading(true)
    try {
      authSystem.clearAllUsers()
      setCleared(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Error clearing data:', error)
      alert('Failed to clear data. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className={`max-w-md w-full rounded-lg p-8 text-center ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
        {!cleared ? (
          <>
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              ⚠️ Clear All Data
            </h1>
            <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              This will delete <strong>ALL users and sessions</strong>. You can then create new users from scratch.
            </p>
            <p className={`mb-8 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              ⚡ This action cannot be undone!
            </p>

            <button
              onClick={handleClearAllData}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {loading ? 'Clearing...' : '🗑️ Delete All Users & Data'}
            </button>

            <Link
              href="/"
              className={`block mt-4 py-2 px-4 rounded-lg font-semibold transition ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              Cancel
            </Link>
          </>
        ) : (
          <>
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              ✅ Success!
            </h1>
            <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              All user data has been cleared. You can now create new users.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              Redirecting to home page...
            </p>
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/providers/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { Mail, Calendar, Award } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth()
  const router = useRouter()
  const { theme } = useTheme()
  const [bio, setBio] = useState('')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      setBio(user.bio || '')
    }
  }, [user, loading, router])

  const handleSaveBio = () => {
    if (user) {
      updateUser({ bio })
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navbar />

      {/* Profile Header */}
      <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-start gap-8">
            <div className="flex-1">
              <div className={`text-6xl mb-4 ${user.profilePicture}`}>
                {user.profilePicture}
              </div>
              <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {user.username}
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {user.role}
              </p>
            </div>

            <div className={`rounded-lg border p-6 text-center ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Member Since
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className={`rounded-lg border p-6 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                About Me
              </h2>

              {!editing ? (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {bio || 'No bio yet. Tell us about yourself!'}
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    Edit Bio
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    maxLength={250}
                    className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {bio.length}/250 characters
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveBio}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false)
                        setBio(user.bio || '')
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        theme === 'dark'
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>

                  {saved && (
                    <div className={`p-3 rounded-lg font-semibold text-center ${
                      theme === 'dark'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      ✅ Bio updated!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className={`rounded-lg border p-6 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-6">
                <Award className={`w-6 h-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Certifications
                </h2>
              </div>

              {user.certifications.length > 0 ? (
                <div className="space-y-3">
                  {user.certifications.map((cert, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-slate-50 border-slate-200'
                    }`}>
                      🏆 {cert}
                    </div>
                  ))}
                </div>
              ) : (
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                  No certifications yet. Complete courses to earn them!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Stats Card */}
            {[
              { label: 'Lessons', value: user.lessonsCompleted, color: 'blue' },
              { label: 'Labs', value: user.labsCompleted, color: 'purple' },
              { label: 'Quiz Score', value: `${user.quizScore}%`, color: 'green' },
              { label: 'Streak', value: `${user.streakDays} days`, color: 'orange' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`rounded-lg border p-6 text-center ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </p>
              </div>
            ))}

            {/* Contact Info */}
            <div className={`rounded-lg border p-6 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Contact Info
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

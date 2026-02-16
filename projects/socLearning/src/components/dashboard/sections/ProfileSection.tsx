'use client'

import { useState } from 'react'
import { User } from '@/types'
import { authSystem } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import { Award, Flame, Clock, Target, Mail, Edit2, Save, X } from 'lucide-react'

export default function ProfileSection({ user }: { user: User }) {
  const { updateUser } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editBio, setEditBio] = useState(user.bio || '')
  const [editCertifications, setEditCertifications] = useState((user.certifications || []).join(', '))
  const [editSpecializations, setEditSpecializations] = useState((user.specializations || []).join(', '))

  const achievements = authSystem.getAchievements(user)
  const allAchievements = [
    { name: '🌱 First Steps', desc: 'Complete 1 lesson', unlocked: user.lessonsCompleted >= 1 },
    { name: '📚 Lesson Streak', desc: 'Complete 5 lessons', unlocked: user.lessonsCompleted >= 5 },
    { name: '🔬 Lab Master', desc: 'Complete 3 labs', unlocked: user.labsCompleted >= 3 },
    { name: '📝 Knowledge Test', desc: 'Score 80% on quiz', unlocked: user.quizScore >= 80 },
    { name: '⚡ Command Expert', desc: 'Learn 50+ commands', unlocked: user.commandsLearned >= 50 },
  ]

  const handleSaveProfile = () => {
    // Update user profile with new data
    const updatedUser = {
      ...user,
      bio: editBio,
      certifications: editCertifications.split(',').map(c => c.trim()).filter(c => c),
      specializations: editSpecializations.split(',').map(s => s.trim()).filter(s => s),
    }
    updateUser(updatedUser)
    setIsEditingProfile(false)
  }

  const completionPercentage = Math.round((user.lessonsCompleted / 10) * 100)
  const nextLevel = user.lessonsCompleted < 10 ? user.lessonsCompleted + 1 : 10

  return (
    <div className="space-y-6">
      {/* Profile Header with Edit */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl bg-white/20 w-20 h-20 rounded-full flex items-center justify-center font-bold">
              {user.profilePicture || user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm">{user.role}</span>
                {user.specializations && user.specializations.length > 0 && (
                  <span className="bg-cyan-700/50 px-3 py-1 rounded-full text-sm">
                    {user.specializations[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition"
          >
            <Edit2 size={20} />
          </button>
        </div>

        {isEditingProfile ? (
          <div className="space-y-3 mt-4">
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Add a bio..."
              className="w-full p-2 rounded text-slate-900 text-sm"
            />
            <input
              type="text"
              value={editCertifications}
              onChange={(e) => setEditCertifications(e.target.value)}
              placeholder="Certifications (comma separated)"
              className="w-full p-2 rounded text-slate-900 text-sm"
            />
            <input
              type="text"
              value={editSpecializations}
              onChange={(e) => setEditSpecializations(e.target.value)}
              placeholder="Specializations (comma separated)"
              className="w-full p-2 rounded text-slate-900 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-2"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            {editBio && <p className="text-sm opacity-90">{editBio}</p>}
            <p className="text-xs opacity-75 mt-2 flex items-center gap-2">
              <Mail size={14} /> {user.email}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<Target size={20} />}
          label="Lessons"
          value={user.lessonsCompleted}
          total="10"
          color="from-blue-600 to-blue-700"
        />
        <StatCard
          icon={<Award size={20} />}
          label="Labs Completed"
          value={user.labsCompleted}
          total="10"
          color="from-purple-600 to-purple-700"
        />
        <StatCard
          icon={<Flame size={20} />}
          label="Streak"
          value={user.streakDays || 0}
          suffix="days"
          color="from-red-600 to-orange-600"
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Hours Learned"
          value={user.hoursLearned || 0}
          suffix="h"
          color="from-cyan-600 to-blue-600"
        />
      </div>

      {/* Learning Progress */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-3">📈 Learning Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Level: {Math.floor(user.lessonsCompleted / 2) || 1}</span>
              <span className="text-slate-400">{completionPercentage}%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {nextLevel} lessons to next level
            </p>
          </div>

          {/* Quiz Score Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Quiz Proficiency</span>
              <span className="text-slate-400">{user.quizScore}%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-600 to-orange-600 h-full transition-all duration-300"
                style={{ width: `${user.quizScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Certifications and Specializations */}
      {(editCertifications || editSpecializations) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editCertifications && (
            <div className="bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award size={18} className="text-yellow-400" />
                Certifications
              </h4>
              <div className="space-y-2">
                {editCertifications.split(',').map((cert, idx) => (
                  cert.trim() && (
                    <span
                      key={idx}
                      className="inline-block bg-yellow-600/30 text-yellow-300 px-3 py-1 rounded-full text-sm mr-2"
                    >
                      {cert.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}

          {editSpecializations && (
            <div className="bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target size={18} className="text-purple-400" />
                Specializations
              </h4>
              <div className="space-y-2">
                {editSpecializations.split(',').map((spec, idx) => (
                  spec.trim() && (
                    <span
                      key={idx}
                      className="inline-block bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm mr-2"
                    >
                      {spec.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          🏆 Achievements ({achievements.length}/{allAchievements.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {allAchievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`rounded-lg p-4 text-center transition ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-yellow-600 shadow-lg shadow-yellow-600/20'
                  : 'bg-slate-700 border border-slate-600 opacity-40'
              }`}
            >
              <p className="text-3xl mb-2">{achievement.name.charAt(0)}</p>
              <p className="font-semibold text-white text-sm">{achievement.name}</p>
              <p className="text-xs text-slate-300">{achievement.desc}</p>
              {achievement.unlocked && (
                <p className="text-xs text-green-400 mt-2 font-semibold">✓ Unlocked</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Stats */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-4">📊 Activity Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-700 rounded p-3">
            <p className="text-2xl font-bold text-cyan-400">{user.lessonsCompleted}</p>
            <p className="text-sm text-slate-400">Lessons Completed</p>
          </div>
          <div className="bg-slate-700 rounded p-3">
            <p className="text-2xl font-bold text-purple-400">{user.labsCompleted}</p>
            <p className="text-sm text-slate-400">Labs Completed</p>
          </div>
          <div className="bg-slate-700 rounded p-3">
            <p className="text-2xl font-bold text-blue-400">{user.quizScore}%</p>
            <p className="text-sm text-slate-400">Quiz Score</p>
          </div>
          <div className="bg-slate-700 rounded p-3">
            <p className="text-2xl font-bold text-emerald-400">{user.commandsLearned}</p>
            <p className="text-sm text-slate-400">Commands Learned</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  total?: string
  suffix?: string
  color: string
}

function StatCard({ icon, label, value, total, suffix, color }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl opacity-80">{icon}</span>
        <span className="text-xs opacity-70">{label}</span>
      </div>
      <p className="text-2xl font-bold">
        {value}
        {total && <span className="text-sm opacity-80">/{total}</span>}
        {suffix && <span className="text-sm opacity-80">{suffix}</span>}
      </p>
    </div>
  )
}

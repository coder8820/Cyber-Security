'use client'

import { useState } from 'react'
import { User } from '@/types'
import { authSystem } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import { Award, Flame, Clock, Target, Mail, Edit2, Save, X, Zap, TrendingUp, Shield, Github, Linkedin, Twitter } from 'lucide-react'

export default function ProfileSection({ user }: { user: User }) {
  const { updateUser } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editBio, setEditBio] = useState(user.bio || '')
  const [editCertifications, setEditCertifications] = useState((user.certifications || []).join(', '))
  const [editSpecializations, setEditSpecializations] = useState((user.specializations || []).join(', '))
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'skills' | 'settings'>('overview')

  const achievements = authSystem.getAchievements(user)
  const allAchievements = [
    { name: '🌱 First Steps', desc: 'Complete 1 lesson', unlocked: user.lessonsCompleted >= 1 },
    { name: '📚 Lesson Streak', desc: 'Complete 5 lessons', unlocked: user.lessonsCompleted >= 5 },
    { name: '🔬 Lab Master', desc: 'Complete 3 labs', unlocked: user.labsCompleted >= 3 },
    { name: '📝 Knowledge Test', desc: 'Score 80% on quiz', unlocked: user.quizScore >= 80 },
    { name: '⚡ Command Expert', desc: 'Learn 50+ commands', unlocked: user.commandsLearned >= 50 },
    { name: '🏆 Master', desc: 'Complete 10 labs', unlocked: user.labsCompleted >= 10 },
    { name: '🌟 Elite', desc: 'Score 95%+ on quiz', unlocked: user.quizScore >= 95 },
    { name: '🚀 Legend', desc: 'Learn 100+ commands', unlocked: user.commandsLearned >= 100 },
  ]

  const handleSaveProfile = () => {
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
  const userLevel = Math.floor(user.lessonsCompleted / 2) + 1
  const userXP = (user.lessonsCompleted * 100) + (user.labsCompleted * 150) + (user.quizScore * 10)
  const nextLevelXP = userLevel * 1000
  const xpProgress = (userXP % 1000) / 10

  return (
    <div className="space-y-6">
      {/* Enhanced Profile Header */}
      <div className="bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-6">
            {/* Avatar with Level Badge */}
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30 shadow-lg">
                {user.profilePicture || user.username.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                {userLevel}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="bg-blue-700/60 px-4 py-1 rounded-full text-sm font-semibold">
                  {user.role}
                </span>
                {user.specializations && user.specializations.length > 0 && (
                  <span className="bg-cyan-700/60 px-4 py-1 rounded-full text-sm font-semibold">
                    {user.specializations[0]}
                  </span>
                )}
                <span className="bg-purple-700/60 px-4 py-1 rounded-full text-sm font-semibold">
                  {achievements.length}/{allAchievements.length} Achievements
                </span>
              </div>
              
              {/* XP Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Level {userLevel} • {userXP} XP</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Bio */}
              {editBio && <p className="text-sm opacity-90 italic">💭 {editBio}</p>}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition transform hover:scale-110"
          >
            <Edit2 size={20} />
          </button>
        </div>

        {/* Member Since Info */}
        <div className="pt-4 border-t border-white/20 text-sm opacity-80">
          <p>📅 Member since {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          <p>⏱️ Last active: {new Date(user.lastActive).toLocaleDateString()}</p>
        </div>

        {/* Edit Mode */}
        {isEditingProfile && (
          <div className="space-y-3 mt-4 bg-black/30 p-4 rounded-lg">
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Add a bio..."
              maxLength={150}
              className="w-full p-3 rounded text-slate-900 text-sm focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs opacity-80">{editBio.length}/150</p>
            <input
              type="text"
              value={editCertifications}
              onChange={(e) => setEditCertifications(e.target.value)}
              placeholder="Certifications (comma separated)"
              className="w-full p-3 rounded text-slate-900 text-sm focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={editSpecializations}
              onChange={(e) => setEditSpecializations(e.target.value)}
              placeholder="Specializations (comma separated)"
              className="w-full p-3 rounded text-slate-900 text-sm focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold transition flex items-center justify-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
        {[
          { id: 'overview', label: '📊 Overview', icon: '📊' },
          { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
          { id: 'skills', label: '⚡ Skills', icon: '⚡' },
          { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
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
              label="Labs"
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
              label="Hours"
              value={user.hoursLearned || 0}
              suffix="h"
              color="from-cyan-600 to-blue-600"
            />
          </div>

          {/* Learning Progress */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6">📈 Learning Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-semibold">Lessons Completed</span>
                  <span className="text-blue-400 font-bold">{completionPercentage}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-full transition-all duration-300 shadow-lg"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {10 - user.lessonsCompleted} lessons remaining to 100%
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-semibold">Quiz Proficiency</span>
                  <span className="text-yellow-400 font-bold">{user.quizScore}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full transition-all duration-300 shadow-lg"
                    style={{ width: `${user.quizScore}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {user.quizScore >= 90 ? '🌟 Excellent performance!' : user.quizScore >= 75 ? '✨ Good job! Keep improving.' : '📚 Keep practicing!'}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-semibold">Lab Completion</span>
                  <span className="text-purple-400 font-bold">{Math.round((user.labsCompleted / 10) * 100)}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300 shadow-lg"
                    style={{ width: `${(user.labsCompleted / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mail size={20} /> Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
                <Mail size={16} className="text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
                <Shield size={16} className="text-green-400" />
                <div>
                  <p className="text-xs text-slate-400">Account Status</p>
                  <p className="text-white font-semibold">✅ Active & Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🏆 Achievements ({achievements.length}/{allAchievements.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allAchievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-4 text-center transition transform ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-900/60 to-orange-900/60 border-2 border-yellow-500 shadow-lg shadow-yellow-600/30 hover:scale-105'
                    : 'bg-slate-700 border border-slate-600 opacity-50 hover:opacity-70'
                }`}
              >
                <p className="text-3xl mb-2">{achievement.name.charAt(0)}</p>
                <p className="font-semibold text-white text-sm">{achievement.name}</p>
                <p className="text-xs text-slate-300 mt-1">{achievement.desc}</p>
                {achievement.unlocked && (
                  <p className="text-xs text-green-400 mt-2 font-semibold">✓ Unlocked</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="bg-slate-800 rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            ⚡ Technical Skills
          </h3>
          
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {editSpecializations ? editSpecializations.split(',').map((spec, idx) => (
                spec.trim() && (
                  <span key={idx} className="bg-purple-600/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500">
                    {spec.trim()}
                  </span>
                )
              )) : (
                <p className="text-slate-400 text-sm">No specializations added yet</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {editCertifications ? editCertifications.split(',').map((cert, idx) => (
                cert.trim() && (
                  <span key={idx} className="bg-yellow-600/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500">
                    🏆 {cert.trim()}
                  </span>
                )
              )) : (
                <p className="text-slate-400 text-sm">No certifications added yet</p>
              )}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-blue-400">💡 Tip:</span> Edit your profile to add certifications and specializations!
            </p>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              ⚙️ Account Settings
            </h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-slate-300 mb-2"><span className="font-semibold">Username:</span> {user.username}</p>
                <p className="text-sm text-slate-300 mb-2"><span className="font-semibold">Role:</span> {user.role}</p>
                <p className="text-sm text-slate-300"><span className="font-semibold">Account Level:</span> {userLevel}</p>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                🔐 Change Password
              </button>
              
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg font-semibold transition">
                🔔 Notification Settings
              </button>

              <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg font-semibold transition">
                🌐 Social Connections
              </button>

              <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg mt-6 pt-6">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition">
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <div className={`bg-gradient-to-br ${color} rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl opacity-80">{icon}</span>
        <span className="text-xs opacity-70 font-semibold">{label}</span>
      </div>
      <p className="text-2xl font-bold">
        {value}
        {total && <span className="text-sm opacity-80 ml-1">/{total}</span>}
        {suffix && <span className="text-sm opacity-80 ml-1">{suffix}</span>}
      </p>
    </div>
  )
}

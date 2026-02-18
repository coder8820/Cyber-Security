'use client'

import { User } from '@/types'
import { TrendingUp, Target, Zap, Clock, Award, BookOpen, AlertCircle, Check } from 'lucide-react'

export default function OverviewSection({ user }: { user: User }) {
  const userLevel = Math.floor(user.lessonsCompleted / 2) + 1
  const userXP = (user.lessonsCompleted * 100) + (user.labsCompleted * 150) + (user.quizScore * 10)
  const completionPercentage = Math.round((user.lessonsCompleted / 10) * 100)
  const coursesAvailable = 8
  const coursesEnrolled = user.lessonsCompleted > 0 ? Math.min(user.lessonsCompleted, coursesAvailable) : 1

  const learningGoals = [
    { title: 'Azure Security', progress: 65, status: 'In Progress' },
    { title: 'Network Monitoring', progress: 40, status: 'In Progress' },
    { title: 'Incident Response', progress: 85, status: 'Almost Done' },
  ]

  const recommendations = [
    { id: 1, title: 'Advanced Threat Detection', difficulty: 'Advanced', estimatedTime: '4 hours' },
    { id: 2, title: 'SIEM Fundamentals', difficulty: 'Intermediate', estimatedTime: '3 hours' },
    { id: 3, title: 'Malware Analysis Basics', difficulty: 'Intermediate', estimatedTime: '2.5 hours' },
  ]

  const recentActivity = [
    { action: 'Completed Lab', item: 'Network Packet Analysis', date: 'Today', type: 'success' },
    { action: 'Earned Achievement', item: '⚡ Command Expert', date: '2 days ago', type: 'achievement' },
    { action: 'Completed Quiz', item: 'SOC Fundamentals', score: '88%', date: '3 days ago', type: 'quiz' },
    { action: 'Started Course', item: 'Advanced Python Security', date: '5 days ago', type: 'course' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Welcome back, {user.username}! 👋</h2>
            <p className="text-lg opacity-90">You're doing great! Keep up the momentum to reach your learning goals.</p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-white/20 rounded-lg px-6 py-3 backdrop-blur">
              <p className="text-sm opacity-80">Current Level</p>
              <p className="text-3xl font-bold">{userLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Lessons Completed', value: user.lessonsCompleted, icon: '📚', color: 'from-blue-600 to-blue-700' },
          { label: 'Labs Completed', value: user.labsCompleted, icon: '🔧', color: 'from-purple-600 to-purple-700' },
          { label: 'Quiz Score', value: `${user.quizScore}%`, icon: '📝', color: 'from-yellow-600 to-orange-600' },
          { label: 'Commands Learned', value: user.commandsLearned, icon: '⌨️', color: 'from-green-600 to-emerald-600' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{stat.icon}</span>
              <TrendingUp size={20} className="opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            Your Progress This Month
          </h3>

          <div className="space-y-6">
            {/* Lessons Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300 font-semibold">Lessons Completed</span>
                <span className="text-blue-400 font-bold">{completionPercentage}%</span>
              </div>
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Quiz Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300 font-semibold">Quiz Mastery</span>
                <span className="text-yellow-400 font-bold">{user.quizScore}%</span>
              </div>
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-300"
                  style={{ width: `${user.quizScore}%` }}
                />
              </div>
            </div>

            {/* Lab Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300 font-semibold">Lab Completion</span>
                <span className="text-purple-400 font-bold">{Math.round((user.labsCompleted / 10) * 100)}%</span>
              </div>
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${(user.labsCompleted / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* XP Bar */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-slate-300 font-semibold">XP Progress to Next Level</span>
                <span className="text-green-400 font-bold">{userXP} / {userLevel * 1000} XP</span>
              </div>
              <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(userXP % 1000) / 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Streak & Stats */}
        <div className="space-y-4">
          {/* Streak */}
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-600/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-orange-400" />
              Your Streak
            </h4>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-400">{user.streakDays || 0}</p>
              <p className="text-sm text-slate-400 mt-2">days in a row</p>
              <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition font-semibold">
                🔥 Keep Streak
              </button>
            </div>
          </div>

          {/* Hours Learned */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-600/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-cyan-400" />
              Hours Invested
            </h4>
            <div className="text-center">
              <p className="text-4xl font-bold text-cyan-400">{user.hoursLearned || 0}</p>
              <p className="text-sm text-slate-400 mt-2">hours of learning</p>
              <div className="text-xs text-slate-500 mt-3">
                Avg: {user.hoursLearned > 0 ? Math.round(user.hoursLearned / Math.max(1, user.lessonsCompleted)) : 0}h per lesson
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-lg p-6 border border-yellow-600/30">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award size={20} className="text-yellow-400" />
              Achievements
            </h4>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">
                {[
                  user.lessonsCompleted >= 1,
                  user.lessonsCompleted >= 5,
                  user.labsCompleted >= 3,
                  user.quizScore >= 80,
                  user.commandsLearned >= 50,
                ].filter(Boolean).length}
              </p>
              <p className="text-sm text-slate-400 mt-2">of 8 unlocked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target size={20} className="text-purple-400" />
          Your Learning Goals
        </h3>

        <div className="space-y-4">
          {learningGoals.map((goal, idx) => (
            <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{goal.title}</h4>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  goal.status === 'Almost Done'
                    ? 'bg-green-900/30 text-green-300'
                    : 'bg-blue-900/30 text-blue-300'
                }`}>
                  {goal.status}
                </span>
              </div>
              <div className="bg-slate-600 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    goal.progress >= 80
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-slate-400">{goal.progress}% complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen size={20} className="text-cyan-400" />
          Recommended For You
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((course) => (
            <div key={course.id} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition">
              <h4 className="text-white font-semibold mb-2">{course.title}</h4>
              <div className="flex justify-between items-center text-sm text-slate-400 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  course.difficulty === 'Advanced'
                    ? 'bg-red-900/30 text-red-300'
                    : 'bg-yellow-900/30 text-yellow-300'
                }`}>
                  {course.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.estimatedTime}
                </span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold text-sm">
                Start Course →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          📋 Recent Activity
        </h3>

        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                activity.type === 'success'
                  ? 'bg-green-900/30 text-green-400'
                  : activity.type === 'achievement'
                  ? 'bg-yellow-900/30 text-yellow-400'
                  : activity.type === 'quiz'
                  ? 'bg-blue-900/30 text-blue-400'
                  : 'bg-purple-900/30 text-purple-400'
              }`}>
                {activity.type === 'success' ? '✓' : activity.type === 'achievement' ? '⭐' : activity.type === 'quiz' ? '✏️' : '📚'}
              </div>

              <div className="flex-1">
                <p className="text-white font-semibold">{activity.action}</p>
                <p className="text-slate-400 text-sm">
                  {activity.item}
                  {activity.score && ` - ${activity.score}`}
                </p>
              </div>

              <div className="text-xs text-slate-500 text-right">
                {activity.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-6 border border-blue-600/30">
          <h3 className="text-xl font-bold text-white mb-3">🚀 Next Steps</h3>
          <p className="text-slate-300 mb-4">Continue your learning by starting the next recommended course.</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            Continue Learning
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-600/30">
          <h3 className="text-xl font-bold text-white mb-3">📊 View Detailed Analytics</h3>
          <p className="text-slate-300 mb-4">Track your progress, analyze weak areas, and optimize your learning path.</p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition">
            View Reports
          </button>
        </div>
      </div>
    </div>
  )
}

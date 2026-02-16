'use client'

import { User } from '@/types'

export default function OverviewSection({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">📊 Your Statistics</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Lessons', value: user.lessonsCompleted, icon: '📚' },
            { label: 'Labs', value: user.labsCompleted, icon: '🔧' },
            { label: 'Quiz Score', value: `${user.quizScore}%`, icon: '📝' },
            { label: 'Commands', value: user.commandsLearned, icon: '⌨️' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 border border-slate-600"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg p-6 border border-blue-700/50">
        <h3 className="text-xl font-bold text-white mb-4">🎯 Quick Start</h3>
        <p className="text-slate-300 mb-4">Start your learning journey with our PowerShell Fundamentals course.</p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          Begin Learning →
        </button>
      </div>
    </div>
  )
}

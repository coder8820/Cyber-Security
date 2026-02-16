'use client'

import { User } from '@/types'

export default function RoadmapSection({ user }: { user: User }) {
  const stages = [
    {
      title: 'Beginner',
      icon: '🌱',
      lessons: ['PowerShell Fundamentals', 'Command Prompt Essentials'],
      progress: Math.min((user.lessonsCompleted / 2) * 100, 100),
    },
    {
      title: 'Intermediate',
      icon: '🎯',
      lessons: ['Network Diagnostics', 'System Administration'],
      progress: Math.min(Math.max((user.lessonsCompleted - 2) / 2 * 100, 0), 100),
    },
    {
      title: 'Advanced',
      icon: '🏔️',
      lessons: ['SOC Operations', 'Incident Response'],
      progress: 0,
    },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">🎯 Your Learning Path</h3>

      <div className="space-y-6">
        {stages.map((stage, idx) => (
          <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{stage.icon}</span>
                <div>
                  <h4 className="text-xl font-bold text-white">{stage.title} Level</h4>
                  <p className="text-slate-400 text-sm">{Math.round(stage.progress)}% Complete</p>
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
                style={{ width: `${stage.progress}%` }}
              />
            </div>

            <div className="space-y-2">
              {stage.lessons.map((lesson, lessonIdx) => (
                <div key={lessonIdx} className="flex items-center gap-2 text-slate-300 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg p-6 border border-green-600">
        <h4 className="text-lg font-bold text-white mb-2">🏆 Overall Progress</h4>
        <div className="text-3xl font-bold text-green-400 mb-2">
          {Math.round((user.lessonsCompleted / 6) * 100)}%
        </div>
        <p className="text-slate-300">
          Keep up the great work! You're making excellent progress in your SOC training.
        </p>
      </div>
    </div>
  )
}

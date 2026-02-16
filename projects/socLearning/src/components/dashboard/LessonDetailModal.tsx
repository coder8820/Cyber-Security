'use client'

import { useState } from 'react'
import { X, BookOpen, Target, Code, Terminal, Zap } from 'lucide-react'

interface LessonDetailModalProps {
  lesson: any
  isOpen: boolean
  lessonId?: number
  isCompleted: boolean
}

export default function LessonDetailModal({ lesson, isOpen, isCompleted }: LessonDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'commands' | 'code' | 'exercises'>('overview')

  if (!isOpen || !lesson) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} />
              <h2 className="text-2xl font-bold">{lesson.title}</h2>
              {isCompleted && (
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">✓ Completed</span>
              )}
            </div>
            <p className="text-blue-100">{lesson.description}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <span className="bg-blue-700 px-3 py-1 rounded">📚 {lesson.level}</span>
              <span className="bg-blue-700 px-3 py-1 rounded">⏱️ {lesson.duration}</span>
              <span className="bg-blue-700 px-3 py-1 rounded">📍 {lesson.category}</span>
            </div>
          </div>
          <button
            data-close-modal="true"
            className="text-white hover:bg-blue-700 p-2 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b dark:border-slate-700 flex flex-wrap bg-slate-50 dark:bg-slate-800">
          <TabButton
            icon={<BookOpen size={18} />}
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton
            icon={<Target size={18} />}
            label="Objectives"
            active={activeTab === 'objectives'}
            onClick={() => setActiveTab('objectives')}
          />
          <TabButton
            icon={<Terminal size={18} />}
            label="Commands"
            active={activeTab === 'commands'}
            onClick={() => setActiveTab('commands')}
          />
          <TabButton
            icon={<Code size={18} />}
            label="Code"
            active={activeTab === 'code'}
            onClick={() => setActiveTab('code')}
          />
          <TabButton
            icon={<Zap size={18} />}
            label="Exercises"
            active={activeTab === 'exercises'}
            onClick={() => setActiveTab('exercises')}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          )}

          {activeTab === 'objectives' && lesson.objectives && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Learning Objectives</h3>
              <ul className="space-y-3">
                {lesson.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-slate-800 rounded">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-slate-700 dark:text-slate-300">{obj}</span>
                  </li>
                ))}
              </ul>
              {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 dark:bg-yellow-900/20 border border-amber-200 dark:border-yellow-700/50 rounded">
                  <h4 className="font-semibold text-amber-900 dark:text-yellow-400 mb-2">Prerequisites:</h4>
                  <ul className="text-amber-800 dark:text-yellow-200">
                    {lesson.prerequisites.map((pre, idx) => (
                      <li key={idx}>• {pre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'commands' && lesson.keyCommands && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Key Commands</h3>
              <div className="space-y-3">
                {lesson.keyCommands.map((cmd, idx) => (
                  <div key={idx} className="bg-slate-100 dark:bg-slate-800 p-4 rounded border-l-4 border-blue-600">
                    <div className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {cmd.command}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'code' && lesson.codeSnippets && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Code Snippets</h3>
              <div className="space-y-4">
                {lesson.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="border border-slate-300 dark:border-slate-700 rounded overflow-hidden">
                    <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 flex justify-between items-center">
                      <span className="font-semibold text-slate-900 dark:text-white">{snippet.title}</span>
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'exercises' && lesson.practiceExercises && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Practice Exercises</h3>
              <div className="space-y-4">
                {lesson.practiceExercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded border border-purple-200 dark:border-purple-700"
                  >
                    <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                      {exercise.title}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300">{exercise.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 flex justify-end gap-3">
          <button
            data-close-modal="true"
            className="px-6 py-2 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white rounded font-semibold hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">
            {isCompleted ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  )
}

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap border-b-2 ${
        active
          ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

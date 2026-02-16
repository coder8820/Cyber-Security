'use client'

import { useState } from 'react'
import { User, Lesson } from '@/types'
import { lessonsData } from '@/lib/data'
import LessonDetailModal from '../LessonDetailModal'
import { BookOpen } from 'lucide-react'

export default function LessonsSection({ user }: { user: User }) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleStartLearning = (lesson: any) => {
    setSelectedLesson(lesson as Lesson)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedLesson(null)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={28} className="text-blue-400" />
        <h3 className="text-2xl font-bold text-white">Learning Modules</h3>
        <span className="ml-auto text-sm text-slate-400">
          {user.completedLessons.length} / {lessonsData.length} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full transition-all duration-300"
          style={{ width: `${(user.completedLessons.length / lessonsData.length) * 100}%` }}
        />
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonsData.map((lesson) => {
          const isCompleted = user.completedLessons.includes(lesson.id)
          const difficultyColors = {
            Beginner: 'bg-green-900/50 text-green-300',
            Intermediate: 'bg-yellow-900/50 text-yellow-300',
            Advanced: 'bg-red-900/50 text-red-300',
          }

          return (
            <div
              key={lesson.id}
              className={`rounded-lg p-5 border transition-all hover:shadow-lg cursor-pointer ${
                isCompleted
                  ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-600'
                  : 'bg-slate-700 border-slate-600 hover:border-blue-500 hover:shadow-blue-500/20'
              }`}
              onClick={() => handleStartLearning(lesson)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-base font-bold text-white line-clamp-2">{lesson.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{lesson.category}</p>
                </div>
                {isCompleted && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded ml-2 flex-shrink-0">
                    ✓
                  </span>
                )}
              </div>

              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{lesson.description}</p>

              {/* Level Badge */}
              <div className="mb-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                    lesson.level === 'Professional'
                      ? 'bg-purple-900/50 text-purple-300'
                      : difficultyColors[lesson.difficulty as keyof typeof difficultyColors]
                  }`}
                >
                  {lesson.level === 'Professional' ? '⭐ Professional' : lesson.difficulty}
                </span>
              </div>

              <div className="flex gap-2 mb-4 text-xs text-slate-400">
                <span>⏱️ {lesson.duration}</span>
                {lesson.objectives && <span>📋 {lesson.objectives.length} topics</span>}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleStartLearning(lesson)
                }}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
              >
                {isCompleted ? 'Review' : 'Start Learning'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Lesson Detail Modal */}
      <div onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.getAttribute('data-close-modal') === 'true') {
          handleCloseModal()
        }
      }}>
        <LessonDetailModal
          lesson={selectedLesson}
          isOpen={modalOpen}
          isCompleted={selectedLesson ? user.completedLessons.includes(selectedLesson.id) : false}
        />
      </div>
    </div>
  )
}

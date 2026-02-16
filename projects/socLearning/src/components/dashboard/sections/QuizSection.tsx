'use client'

import { User } from '@/types'
import { useState } from 'react'
import { quizData } from '@/lib/data'

export default function QuizSection({ user }: { user: User }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  if (!quizStarted) {
    return (
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold text-white mb-6">📝 Assessment Quiz</h3>
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-8 border border-slate-600">
          <p className="text-slate-300 mb-6">
            Test your knowledge with our comprehensive 10-question assessment covering PowerShell, CMD, and SOC operations.
          </p>
          <p className="text-slate-400 mb-6">
            Your current score: <span className="text-blue-400 font-bold">{user.quizScore}%</span>
          </p>
          <button
            onClick={() => {
              setQuizStarted(true)
              setAnswers(new Array(quizData.length).fill(-1))
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
          >
            🚀 Start Assessment
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const correct = answers.filter((ans, idx) => ans === quizData[idx].correct).length
    const score = (correct / quizData.length) * 100
    return (
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold text-white mb-6">📊 Quiz Results</h3>
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-8 border border-blue-600 text-center">
          <div className="text-6xl font-bold text-blue-400 mb-4">{Math.round(score)}%</div>
          <p className="text-xl text-white mb-2">
            {correct} out of {quizData.length} correct
          </p>
          <p className="text-slate-300 mb-6">
            {score >= 80
              ? '🎉 Excellent work!'
              : score >= 60
                ? '👍 Good job! Keep practicing.'
                : '📚 Keep studying!'}
          </p>
          <button
            onClick={() => {
              setQuizStarted(false)
              setShowResults(false)
              setCurrentQuestion(0)
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  const question = quizData[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.length) * 100

  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">📝 Question {currentQuestion + 1} of {quizData.length}</h3>

      <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
        <div className="bg-blue-600 h-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-600 mb-6">
        <h4 className="text-lg font-bold text-white mb-6">{question.q}</h4>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newAnswers = [...answers]
                newAnswers[currentQuestion] = idx
                setAnswers(newAnswers)
              }}
              className={`w-full text-left p-4 rounded-lg border transition ${
                answers[currentQuestion] === idx
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-blue-500'
              }`}
            >
              <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={() => {
            if (currentQuestion < quizData.length - 1) {
              setCurrentQuestion(currentQuestion + 1)
            }
          }}
          disabled={currentQuestion === quizData.length - 1}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition disabled:opacity-50"
        >
          Next →
        </button>
        {currentQuestion === quizData.length - 1 && (
          <button
            onClick={() => setShowResults(true)}
            className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Question, QuizChapter } from '../constants/types'

type Props = {
  chapter: QuizChapter
  initialCurrentQ?: number
  initialAnswers?: number[]
  initialTimeLeft?: number
  onStateChange?: (state: {
    currentQ: number
    answers: number[]
    timeLeft: number
  }) => void
  onFinish: (answers: number[]) => void
  onExit?: () => void
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

export default function QuizPlay({
  chapter,
  initialCurrentQ = 0,
  initialAnswers,
  initialTimeLeft,
  onStateChange,
  onFinish,
  onExit,
}: Props) {
  const { questions, timerSeconds } = chapter
  const [currentQ, setCurrentQ] = useState(initialCurrentQ)
  const [answers, setAnswers] = useState<number[]>(
    initialAnswers || Array(questions.length).fill(-1),
  )
  const [selected, setSelected] = useState<number | null>(
    answers[initialCurrentQ] >= 0 ? answers[initialCurrentQ] : null,
  )
  const [timeLeft, setTimeLeft] = useState(
    initialTimeLeft !== undefined ? initialTimeLeft : timerSeconds,
  )

  const finish = useCallback(
    (finalAnswers: number[]) => {
      onFinish(finalAnswers)
    },
    [onFinish],
  )

  // Timer tick
  useEffect(() => {
    if (timeLeft <= 0) {
      finish(answers)
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        const nextTime = t - 1
        if (nextTime <= 0) {
          finish(answers)
        }
        return nextTime
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, answers, finish])

  // Sync state to parent / localStorage
  useEffect(() => {
    onStateChange?.({ currentQ, answers, timeLeft })
  }, [currentQ, answers, timeLeft, onStateChange])

  // Update selected when currentQ changes
  useEffect(() => {
    setSelected(answers[currentQ] >= 0 ? answers[currentQ] : null)
  }, [currentQ, answers])

  const handleSelect = (optIdx: number) => {
    setSelected(optIdx)
    const newAnswers = [...answers]
    newAnswers[currentQ] = optIdx
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...answers]
    newAnswers[currentQ] = selected
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      finish(newAnswers)
    }
  }

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1)
    }
  }

  const q: Question = questions[currentQ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-pink-50 dark:from-zinc-950 dark:to-zinc-900 px-4 py-6">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full">
        {/* Top bar with back option */}
        <div className="flex items-center justify-between mb-4">
          {onExit && (
            <button
              onClick={onExit}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
            >
              ← Keluar
            </button>
          )}
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {chapter.subtitle}
          </span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Soal {currentQ + 1}/{questions.length}
          </span>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full ${
              timeLeft <= 60
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 animate-pulse'
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            }`}
          >
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQ + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 leading-relaxed">
          {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium cursor-pointer ${
                selected === i
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-400'
                  : 'border-zinc-200 dark:border-zinc-600 hover:border-indigo-300 dark:hover:border-indigo-600 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span className="inline-block w-7 text-center mr-2 text-sm opacity-60">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={handlePrev}
              className="w-1/3 py-3 px-4 rounded-xl font-semibold border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              ← Kembali
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors text-lg ${
              selected !== null
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {currentQ < questions.length - 1 ? 'Selanjutnya →' : 'Selesai ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}

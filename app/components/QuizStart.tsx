'use client'

import { useState } from 'react'
import type { QuizChapter, QuizResult } from '../constants/types'

type Props = {
  chapter: QuizChapter
  history: QuizResult[]
  onStart: () => void
  onBack?: () => void
}

export default function QuizStart({
  chapter,
  history,
  onStart,
  onBack,
}: Props) {
  const chapterHistory = history.filter((h) => h.chapterId === chapter.id)
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-pink-50 dark:from-zinc-950 dark:to-zinc-900 px-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🇯🇵</div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {chapter.title}
        </h1>
        <h2 className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
          {chapter.subtitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          {chapter.description}
        </p>
        <button
          onClick={onStart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-lg cursor-pointer"
        >
          Mulai Quiz
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-3 w-full text-indigo-600 dark:text-indigo-400 font-medium py-2 hover:underline cursor-pointer"
          >
            ← Pilih Bab Lain
          </button>
        )}

        {chapterHistory.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline cursor-pointer"
            >
              {showHistory ? 'Sembunyikan' : 'Lihat'} Riwayat Skor
            </button>
            {showHistory && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {chapterHistory.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-700 rounded-lg px-4 py-2 text-sm"
                  >
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {h.date}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {h.score}/{h.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

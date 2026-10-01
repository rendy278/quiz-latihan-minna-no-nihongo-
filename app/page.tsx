'use client'

import { useState, useEffect } from 'react'
import { chapters } from './constants/chapters'
import type { QuizResult } from './constants/types'
import ChapterSelect from './components/ChapterSelect'

const HISTORY_KEY = 'quiz-bunpou-history'

export default function Home() {
  const [history, setHistory] = useState<QuizResult[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  return (
    <main className="h-screen flex flex-col p-4  items-center justify-center">
      <ChapterSelect chapters={chapters} />

      {history.length > 0 && (
        <div className="max-w-md mt-3 mx-auto w-full px-4">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6 text-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline cursor-pointer"
            >
              {showHistory ? 'Sembunyikan' : 'Lihat'} Semua Riwayat Kuis (
              {history.length})
            </button>

            {showHistory && (
              <div className="mt-4 space-y-2 max-h-56 overflow-y-auto text-left">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-700/60 rounded-xl px-4 py-2.5 text-sm"
                  >
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {h.chapterId.toUpperCase()}
                      </span>
                      <span className="text-zinc-400 text-xs block">
                        {h.date}
                      </span>
                    </div>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                      {h.score}/{h.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

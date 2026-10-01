'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { QuizChapter } from '../constants/types'

type Props = {
  chapters: QuizChapter[]
}

export default function ChapterSelect({ chapters }: Props) {
  const [inProgressMap, setInProgressMap] = useState<Record<string, boolean>>(
    {},
  )

  useEffect(() => {
    const map: Record<string, boolean> = {}
    chapters.forEach((ch) => {
      try {
        const saved = localStorage.getItem(`quiz-progress-${ch.id}`)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && typeof parsed.currentQ === 'number') {
            map[ch.id] = true
          }
        }
      } catch {
        // ignore
      }
    })
    setInProgressMap(map)
  }, [chapters])

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🇯🇵</div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Quiz Bunpou
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          みんなの日本語 — Pilih Bab
        </p>

        <div className="space-y-3">
          {chapters.map((ch) => {
            const hasProgress = inProgressMap[ch.id]
            return (
              <Link
                key={ch.id}
                href={`/quiz/${ch.id}`}
                className="block text-left px-5 py-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-600 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {ch.subtitle}
                  </div>
                  {hasProgress && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-medium">
                      Lanjutkan
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {ch.questions.length} soal ·{' '}
                  {Math.floor(ch.timerSeconds / 60)} menit
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

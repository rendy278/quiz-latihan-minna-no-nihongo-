'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getChapterById } from '../../constants/chapters'
import type { QuizResult } from '../../constants/types'
import QuizPlay from '../../components/QuizPlay'
import QuizResultScreen from '../../components/QuizResult'

const HISTORY_KEY = 'quiz-bunpou-history'

type SavedProgress = {
  currentQ: number
  answers: number[]
  timeLeft: number
}

export default function ChapterQuizPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = params?.chapterId as string
  const chapter = getChapterById(chapterId)

  const progressKey = `quiz-progress-${chapterId}`

  const [isReady, setIsReady] = useState(false)
  const [initialProgress, setInitialProgress] = useState<SavedProgress | null>(
    null,
  )
  const [finishedResult, setFinishedResult] = useState<number[] | null>(null)

  // Load progress from localStorage on mount
  useEffect(() => {
    if (!chapter) {
      setIsReady(true)
      return
    }

    try {
      const saved = localStorage.getItem(progressKey)
      if (saved) {
        const parsed = JSON.parse(saved) as SavedProgress
        // Validate saved progress
        if (
          Array.isArray(parsed.answers) &&
          parsed.answers.length === chapter.questions.length &&
          typeof parsed.currentQ === 'number' &&
          typeof parsed.timeLeft === 'number' &&
          parsed.timeLeft > 0
        ) {
          setInitialProgress(parsed)
        }
      }
    } catch {
      // ignore JSON parse error
    }

    setIsReady(true)
  }, [chapter, progressKey])

  const handleStateChange = useCallback(
    (state: { currentQ: number; answers: number[]; timeLeft: number }) => {
      if (!chapter) return
      try {
        localStorage.setItem(progressKey, JSON.stringify(state))
      } catch {
        // storage quota or error
      }
    },
    [chapter, progressKey],
  )

  const handleFinish = useCallback(
    (finalAnswers: number[]) => {
      if (!chapter) return

      try {
        localStorage.removeItem(progressKey)

        const score = finalAnswers.reduce(
          (acc, ans, i) =>
            ans === chapter.questions[i].answer ? acc + 1 : acc,
          0,
        )

        const result: QuizResult = {
          chapterId: chapter.id,
          score,
          total: chapter.questions.length,
          date: new Date().toLocaleString('id-ID'),
          answers: finalAnswers,
        }

        const existingHistory = localStorage.getItem(HISTORY_KEY)
        const history: QuizResult[] = existingHistory
          ? JSON.parse(existingHistory)
          : []
        const updated = [result, ...history].slice(0, 50)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      } catch {
        // error handling
      }

      setFinishedResult(finalAnswers)
    },
    [chapter, progressKey],
  )

  const handleRestart = () => {
    localStorage.removeItem(progressKey)
    setInitialProgress({
      currentQ: 0,
      answers: Array(chapter?.questions.length || 10).fill(-1),
      timeLeft: chapter?.timerSeconds || 600,
    })
    setFinishedResult(null)
  }

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Bab Tidak Ditemukan
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
          Kuis untuk bab ini belum tersedia.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
        >
          Kembali ke Menu Utama
        </Link>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (finishedResult) {
    return (
      <QuizResultScreen
        chapter={chapter}
        answers={finishedResult}
        onRestart={handleRestart}
        onBackToMenu={() => router.push('/')}
      />
    )
  }

  return (
    <QuizPlay
      key={initialProgress ? 'restored' : 'new'}
      chapter={chapter}
      initialCurrentQ={initialProgress?.currentQ ?? 0}
      initialAnswers={initialProgress?.answers}
      initialTimeLeft={initialProgress?.timeLeft}
      onStateChange={handleStateChange}
      onFinish={handleFinish}
      onExit={() => {
        if (confirm('Keluar dari kuis? Progres Anda tersimpan.')) {
          router.push('/')
        }
      }}
    />
  )
}

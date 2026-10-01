'use client'

import type { QuizChapter } from '../constants/types'

type Props = {
  chapter: QuizChapter
  answers: number[]
  onRestart: () => void
  onBackToMenu: () => void
}

export default function QuizResult({
  chapter,
  answers,
  onRestart,
  onBackToMenu,
}: Props) {
  const { questions } = chapter
  const score = answers.reduce(
    (acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc),
    0,
  )
  const pct = Math.round((score / questions.length) * 100)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-pink-50 dark:from-zinc-950 dark:to-zinc-900 px-4 py-8">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">
            {pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📖'}
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Hasil Quiz — {chapter.subtitle}
          </h2>
          <div className="mt-3">
            <span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {score}
            </span>
            <span className="text-2xl text-zinc-400">/{questions.length}</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {pct >= 80
              ? 'すごい！Hebat!'
              : pct >= 50
                ? 'がんばって！Semangat!'
                : 'もういちど！Coba lagi!'}
          </p>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          {questions.map((q, i) => {
            const correct = answers[i] === q.answer
            return (
              <div
                key={q.id}
                className={`rounded-xl p-4 border-2 ${
                  correct
                    ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950'
                    : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
                }`}
              >
                <p className="font-medium text-zinc-800 dark:text-zinc-200 text-sm mb-2">
                  {i + 1}. {q.question}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <span
                    className={
                      correct
                        ? 'text-green-700 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    Jawaban kamu:{' '}
                    {answers[i] >= 0 ? q.options[answers[i]] : '—'}
                  </span>
                  {!correct && (
                    <span className="text-green-700 dark:text-green-400">
                      ✓ Benar: {q.options[q.answer]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {q.explanation}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Coba Lagi
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full text-indigo-600 dark:text-indigo-400 font-medium py-2 hover:underline cursor-pointer"
          >
            ← Pilih Bab Lain
          </button>
        </div>
      </div>
    </div>
  )
}

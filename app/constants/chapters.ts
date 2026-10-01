import type { QuizChapter } from './types'
import { bab1 } from './bab1'
import { bab2 } from './bab2'

// Tambahkan bab baru di sini:
// import { bab3 } from './bab3'

export const chapters: QuizChapter[] = [
  bab1,
  bab2,
  // bab3,
  // ...
]

export function getChapterById(id: string): QuizChapter | undefined {
  return chapters.find((c) => c.id === id)
}

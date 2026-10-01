export type Question = {
  id: number
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type QuizChapter = {
  id: string
  title: string
  subtitle: string
  description: string
  timerSeconds: number
  questions: Question[]
}

export type QuizResult = {
  chapterId: string
  score: number
  total: number
  date: string
  answers: number[]
}

import type { QuizChapter } from './types'

export const bab2: QuizChapter = {
  id: 'bab2',
  title: 'Quiz Bunpou',
  subtitle: 'みんなの日本語 Bab 2',
  description: '10 soal · Waktu 10 menit · Kore, Sore, Are & Kepemilikan',
  timerSeconds: 10 * 60,
  questions: [
    {
      id: 1,
      question: '（Dekat pembicara）「___は じしょです。」',
      options: ['これ', 'それ', 'あれ', 'どれ'],
      answer: 0,
      explanation:
        '「これ」digunakan untuk benda yang dekat dengan pembicara. これ＝ini.',
    },
    {
      id: 2,
      question: '（Dekat lawan bicara）「___は なんですか。」',
      options: ['これ', 'それ', 'あれ', 'どれ'],
      answer: 1,
      explanation:
        '「それ」digunakan untuk benda yang dekat dengan lawan bicara. それ＝itu.',
    },
    {
      id: 3,
      question:
        '（Jauh dari kedua pembicara）「___は コンピューターの ほんです。」',
      options: ['これ', 'それ', 'あれ', 'この'],
      answer: 2,
      explanation:
        '「あれ」digunakan untuk benda yang jauh dari pembicara dan lawan bicara. あれ＝itu (jauh).',
    },
    {
      id: 4,
      question: '「この かさは ___の ですか。」「さとうさんの です。」',
      options: ['だれ', 'なん', 'どこ', 'どれ'],
      answer: 0,
      explanation:
        '「だれの」digunakan untuk menanyakan kepemilikan (milik siapa). だれの ですか＝Milik siapa?',
    },
    {
      id: 5,
      question: '「___ ほんは わたしのです。」',
      options: ['これ', 'この', 'ここ', 'こちら'],
      answer: 1,
      explanation:
        '「この」harus diikuti langsung oleh kata benda (この＋Nomina). 「このほん」＝buku ini.',
    },
    {
      id: 6,
      question: '「それは てちょうですか。」「はい、___。」',
      options: [
        'そうです',
        'そうじゃありません',
        'てちょうじゃありません',
        'ちがいます',
      ],
      answer: 0,
      explanation:
        'Jawaban mengiyakan untuk pertanyaan nomina:「はい、そうです」＝Ya, benar.',
    },
    {
      id: 7,
      question: '「これは シャープペンシルですか。」「いいえ、___。」',
      options: ['そうです', 'ちがいます', 'シャープペンシルです', 'はい'],
      answer: 1,
      explanation:
        'Jawaban menolak/menyangkal:「いいえ、ちがいます」atau「いいえ、そうじゃありません」.',
    },
    {
      id: 8,
      question: '「これは 9 ですか、7 ですか。」「___。」',
      options: ['はい、9 です', 'いいえ、7 です', '7 です', 'そうです'],
      answer: 2,
      explanation:
        'Kalimat tanya pilihan (～ですか、～ですか) tidak dijawab dengan はい atau いいえ, langsung sebut pilihannya.',
    },
    {
      id: 9,
      question: '「それは ___の ざっしですか。」「くるまの ざっしです。」',
      options: ['だれ', 'なん', 'どこ', 'どれ'],
      answer: 1,
      explanation:
        '「なんの ざっし」＝majalah tentang apa? 「なんの」menanyakan isi/topik benda.',
    },
    {
      id: 10,
      question: '「あの かばんは ___のですか。」「ミラーさんのです。」',
      options: ['だれ', 'なん', 'どれ', 'どこ'],
      answer: 0,
      explanation:
        '「だれの」＝punya siapa / milik siapa. 「ミラーさんのです」＝milik Miller.',
    },
  ],
}

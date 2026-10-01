import type { QuizChapter } from './types'

export const bab1: QuizChapter = {
  id: 'bab1',
  title: 'Quiz Bunpou',
  subtitle: 'みんなの日本語 Bab 1',
  description: '10 soal · Waktu 10 menit · Skor disimpan otomatis',
  timerSeconds: 10 * 60,
  questions: [
    {
      id: 1,
      question: '「わたし___マイクです。」',
      options: ['を', 'は', 'が', 'に'],
      answer: 1,
      explanation:
        '「は」は主題を示す助詞です。「わたしはマイクです」＝ Saya adalah Mike.',
    },
    {
      id: 2,
      question: '「マイクさんはアメリカ___です。」',
      options: ['の人', '人', 'じん', 'にん'],
      answer: 2,
      explanation:
        '国名＋じん（人）で国籍を表します。「アメリカじん」＝ Orang Amerika.',
    },
    {
      id: 3,
      question: '「サントスさんは学生です___。」',
      options: ['ね', 'よ', 'か', 'の'],
      answer: 2,
      explanation:
        '「か」は疑問文を作る助詞です。「学生ですか」＝ Apakah mahasiswa?',
    },
    {
      id: 4,
      question: '「わたしはエンジニアじゃ___。」',
      options: ['です', 'ありません', 'あります', 'いません'],
      answer: 1,
      explanation:
        '「じゃありません」は否定形です。「エンジニアじゃありません」＝ Bukan insinyur.',
    },
    {
      id: 5,
      question: '「マリアさん___先生ですか。」',
      options: ['を', 'は', 'に', 'で'],
      answer: 1,
      explanation:
        '「は」digunakan untuk menunjukkan topik pembicaraan. 「マリアさんは先生ですか」＝ Apakah Maria seorang guru?',
    },
    {
      id: 6,
      question: '「はじめまして。___マイクミラーです。」',
      options: ['あなたは', 'わたしは', 'あのひとは', 'このひとは'],
      answer: 1,
      explanation:
        'Saat memperkenalkan diri, gunakan「わたしは」＝ Saya adalah...',
    },
    {
      id: 7,
      question: '「あの人はだれ___。」',
      options: ['か', 'が', 'を', 'の'],
      answer: 0,
      explanation: '「だれですか」＝ Siapakah? 「か」membentuk kalimat tanya.',
    },
    {
      id: 8,
      question: '「ワットさんは___さいですか。」',
      options: ['いくつ', 'なん', 'どこ', 'なに'],
      answer: 1,
      explanation:
        '「なんさいですか」＝ Berapa umurnya? 「なん」＋さい untuk menanyakan umur.',
    },
    {
      id: 9,
      question: '「カリナさんはインドネシア人です。IMCの___です。」',
      options: ['学生', '先生', '社員', '医者'],
      answer: 2,
      explanation:
        '「社員（しゃいん）」＝ karyawan perusahaan. IMCの社員 ＝ Karyawan IMC.',
    },
    {
      id: 10,
      question: '「___よろしくおねがいします。」',
      options: ['さようなら', 'すみません', 'どうぞ', 'ありがとう'],
      answer: 2,
      explanation:
        '「どうぞよろしくおねがいします」＝ Senang berkenalan / mohon bantuannya.',
    },
  ],
}

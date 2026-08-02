// lib/questionBank.js
// Flattens every question bank in the app (questions.js + extraTests.js)
// into one normalized array so Flashcards / Quick Revision / future
// Revision Centre features can pull from the full question pool without
// caring which file or shape a given test's questions came from.
import { questionsDB } from '../data/questions'
import { extraTests } from '../data/extraTests'

let cached = null

export function getAllQuestions() {
  if (cached) return cached
  const all = []

  Object.entries(questionsDB || {}).forEach(([key, bank]) => {
    if (!bank?.questions) return
    bank.questions.forEach((q, i) => {
      all.push({
        id: `${key}-${q.id ?? i}`,
        text: q.text,
        options: q.options || [],
        correct: q.correctAnswer ?? q.correct,
        explanation: q.explanation || '',
        topic: bank.title || key,
      })
    })
  })

  Object.entries(extraTests || {}).forEach(([path, bank]) => {
    if (!bank?.questions) return
    bank.questions.forEach((q, i) => {
      all.push({
        id: `${path}-${i}`,
        text: q.text,
        options: q.options || [],
        correct: q.correct ?? q.correctAnswer,
        explanation: q.explanation || '',
        topic: q.topic || bank.title || path,
      })
    })
  })

  // De-dupe identical question text (some banks overlap).
  const seen = new Set()
  cached = all.filter((q) => {
    if (!q.text || seen.has(q.text)) return false
    seen.add(q.text)
    return true
  })

  return cached
}

export function getTopics() {
  const all = getAllQuestions()
  return Array.from(new Set(all.map((q) => q.topic))).sort()
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

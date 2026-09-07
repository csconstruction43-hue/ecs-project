// lib/smartPractice.js
// New feature: "Smart Practice" — automatically detects which topics a
// candidate is weakest on (from their wrong-answer history) and builds a
// fresh practice session weighted towards those topics, pulling NEW
// questions from the full question bank rather than just replaying the
// exact questions they got wrong (that's what Wrong Questions Only does —
// see WrongQuestionsPage.jsx). The two features are complementary:
// Wrong Questions = "redo my exact mistakes", Smart Practice = "give me
// more practice in my weak areas".
import { getWrongQuestionsBank } from './testResults'
import { getAllQuestions } from './questionBank'

// Aggregates the wrong-answer history by topic, most-missed first.
export function getWeakTopics(limit = 5) {
  const bank = getWrongQuestionsBank()
  const counts = new Map()
  bank.forEach((entry) => {
    const topic = (entry.topic || 'General').trim() || 'General'
    counts.set(topic, (counts.get(topic) || 0) + (entry.timesWrong || 1))
  })
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Builds a fresh practice set of `count` questions, weighted towards the
// candidate's weakest topics. Falls back to a random general mix if there's
// no wrong-answer history yet (a brand-new candidate).
export function buildSmartPracticeSet(count = 15) {
  const weakTopics = getWeakTopics(5)
  const allQuestions = getAllQuestions()

  if (weakTopics.length === 0) {
    return { questions: shuffle(allQuestions).slice(0, count), weakTopics: [] }
  }

  const totalWeight = weakTopics.reduce((sum, t) => sum + t.count, 0)
  const picked = []
  const usedIds = new Set()

  weakTopics.forEach((wt) => {
    const share = Math.max(2, Math.round((wt.count / totalWeight) * count))
    const pool = shuffle(allQuestions.filter((q) => q.topic === wt.topic && !usedIds.has(q.id)))
    pool.slice(0, share).forEach((q) => { picked.push(q); usedIds.add(q.id) })
  })

  // Top up with a random mix (still favouring anything not yet used) if the
  // weighted picks fell short of the target count.
  if (picked.length < count) {
    const filler = shuffle(allQuestions.filter((q) => !usedIds.has(q.id)))
    filler.slice(0, count - picked.length).forEach((q) => { picked.push(q); usedIds.add(q.id) })
  }

  return { questions: shuffle(picked).slice(0, count), weakTopics }
}

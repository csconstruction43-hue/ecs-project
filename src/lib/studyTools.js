// lib/studyTools.js
// Client-side Study Tools: Bookmarks, personal Notes, and a Leitner-style
// Spaced Repetition scheduler for Flashcards. Everything is keyed by the
// question's own text (already the de-dupe key used across questionBank.js
// and the wrong-questions bank), so no extra id plumbing is needed and this
// works the same whether a question came from Flashcards or the Wrong
// Questions Only revision list.

const BOOKMARKS_KEY = 'studyBookmarks'
const NOTES_KEY = 'studyNotes'
const SRS_KEY = 'srsSchedule'

// Leitner boxes — each box has a review interval in days. A card graded
// "Again" drops to box 0; "Good" advances one box; "Easy" skips a box.
const INTERVALS_DAYS = [1, 2, 4, 7, 14, 30]
const MAX_BOX = INTERVALS_DAYS.length - 1

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

function save(key, obj) {
  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch {
    // ignore quota errors
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr, days) {
  const d = dateStr ? new Date(dateStr) : new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// ---------------------------------------------------------------- Bookmarks

// item: { text, topic, correct, explanation, source } — source is a short
// label like 'flashcard' or 'wrong-question' so the Bookmarks hub can tag it.
export function toggleBookmark(item) {
  if (!item?.text) return false
  const all = load(BOOKMARKS_KEY)
  if (all[item.text]) {
    delete all[item.text]
    save(BOOKMARKS_KEY, all)
    return false
  }
  all[item.text] = {
    text: item.text,
    topic: item.topic || 'General',
    correct: item.correct || '',
    explanation: item.explanation || '',
    source: item.source || 'question',
    addedAt: new Date().toISOString(),
  }
  save(BOOKMARKS_KEY, all)
  return true
}

export function isBookmarked(text) {
  const all = load(BOOKMARKS_KEY)
  return !!all[text]
}

export function getBookmarks() {
  const all = load(BOOKMARKS_KEY)
  return Object.values(all).sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
}

export function removeBookmark(text) {
  const all = load(BOOKMARKS_KEY)
  delete all[text]
  save(BOOKMARKS_KEY, all)
}

// -------------------------------------------------------------------- Notes

export function setNote(text, note) {
  const all = load(NOTES_KEY)
  if (!note || !note.trim()) {
    delete all[text]
  } else {
    all[text] = { note: note.trim(), updatedAt: new Date().toISOString() }
  }
  save(NOTES_KEY, all)
}

export function getNote(text) {
  const all = load(NOTES_KEY)
  return all[text]?.note || ''
}

export function hasNote(text) {
  return !!getNote(text)
}

export function getAllNotes() {
  const all = load(NOTES_KEY)
  return Object.entries(all).map(([text, v]) => ({ text, ...v }))
}

// ---------------------------------------------------- Spaced Repetition (SRS)

// Returns the current schedule for a card, treating never-studied cards as
// due today (box 0) so new cards naturally show up in the due queue.
export function getCardSchedule(text) {
  const all = load(SRS_KEY)
  const entry = all[text]
  if (!entry) return { box: 0, nextReview: todayStr(), lastReviewed: null, dueToday: true }
  return { ...entry, dueToday: entry.nextReview <= todayStr() }
}

// grade: 'again' | 'good' | 'easy'
export function reviewCard(text, grade) {
  const all = load(SRS_KEY)
  const current = all[text] || { box: 0 }
  let box = current.box || 0
  if (grade === 'again') box = 0
  else if (grade === 'good') box = Math.min(MAX_BOX, box + 1)
  else if (grade === 'easy') box = Math.min(MAX_BOX, box + 2)

  const nextReview = addDays(todayStr(), INTERVALS_DAYS[box])
  all[text] = { box, nextReview, lastReviewed: todayStr() }
  save(SRS_KEY, all)
  return all[text]
}

// Given a list of card texts, returns how many are due for review today
// (never-reviewed cards count as due).
export function countDue(texts) {
  const all = load(SRS_KEY)
  const today = todayStr()
  return texts.reduce((n, text) => {
    const entry = all[text]
    const due = !entry || entry.nextReview <= today
    return due ? n + 1 : n
  }, 0)
}

export function isDue(text) {
  return getCardSchedule(text).dueToday
}

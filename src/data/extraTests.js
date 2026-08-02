// data/extraTests.js
//
// As of 2026, ECS (ecscard.org.uk) runs exactly FOUR assessment types.
// This file is scoped to those four (keyed by route path), plus 11
// topic-focused HSE practice routes (one per official HSE topic) so users
// can drill their weak areas using only official ECS questions.
//
// HSE Assessment: mandatory for every ECS card holder. This is the ONLY one
// of the four for which ECS publishes a full official question bank (their
// Revision Guide) — so info.official === true and the questions come
// from the real 327-question bank, drawn 50 at a time following ECS's own
// topic distribution (see officialEcsHse.js). The 11 topic-practice routes
// also draw exclusively from that same official bank, just filtered to one
// topic — so they're official content too.
//
// FESS / Network Infrastructure / Electrical Safety Unit: ECS does NOT
// publish question banks for these — only topic/assessment guides. The
// question sets here are original practice content and are clearly marked
// official: false, with a disclaimer and a link to the real ECS guidance,
// so users are never misled into thinking they've seen the real exam
// questions.

import {
  hseQuestionBank,
  generateHseExam,
  generateHseTopicPractice,
  getHseTopicQuestionCounts,
  HSE_TOPIC_DISTRIBUTION,
  HSE_EXAM_INFO,
} from './officialEcsHse'
import { fessQuestionBank, FESS_EXAM_INFO } from './officialEcsFess'
import { networkQuestionBank, NETWORK_EXAM_INFO } from './officialEcsNetwork'
import { electricalSafetyQuestionBank, ELECTRICAL_SAFETY_EXAM_INFO } from './officialEcsElectricalSafety'
// NEW, ADDITIONAL question banks (500+ original practice questions).
// These are separate from every bank above and do not modify any of them.
import { extraPracticeElectricalBank, EXTRA_PRACTICE_ELECTRICAL_INFO } from './extraPracticeElectrical'
import { extraPracticeSafetyBank, EXTRA_PRACTICE_SAFETY_INFO } from './extraPracticeSafety'
import { extraPracticeMegaBank, EXTRA_PRACTICE_MEGA_INFO } from './extraPracticeMega'
// NEW, ADDITIONAL, STANDALONE question bank (630+ original practice
// questions), separate from every bank above — see extraPracticeUltraBank.js
// for details. Adding this bank takes the app's total question count from
// ~2,450 to 3,000+.
import { extraPracticeUltraBank, EXTRA_PRACTICE_ULTRA_INFO } from './extraPracticeUltraBank'

const TOPIC_ICONS = {
  1: '📋', 2: '📦', 3: '📝', 4: '🦺', 5: '🧼',
  6: '🔥', 7: '🪜', 8: '🛠️', 9: '⚠️', 10: '⚡', 11: '♻️',
}

export const extraTests = {
  '/ecs-hse-assessment': {
    title: 'ECS Health, Safety and Environmental (HSE) Assessment',
    icon: '🦺',
    duration: 30 * 60, // 30 minutes, matching the real assessment
    passMark: 43 / 50, // 43 out of 50, matching the real assessment
    // Fresh 50-question draw each time the test is started, following the
    // official ECS topic distribution, with answer order randomised too —
    // just like the real assessment.
    getQuestions: generateHseExam,
    info: HSE_EXAM_INFO,
    topicDistribution: HSE_TOPIC_DISTRIBUTION,
    totalBankSize: hseQuestionBank.length,
    isFullExam: true,
  },

  '/ecs-fess-assessment': {
    title: 'ECS FESS (Fire, Emergency and Security Systems) Assessment',
    icon: '🔥',
    duration: 30 * 60,
    passMark: 0.8,
    questions: fessQuestionBank,
    info: FESS_EXAM_INFO,
  },

  '/ecs-network-infrastructure-assessment': {
    title: 'ECS Network Infrastructure Assessment',
    icon: '🌐',
    duration: 30 * 60,
    passMark: 0.8,
    questions: networkQuestionBank,
    info: NETWORK_EXAM_INFO,
  },

  '/ecs-electrical-safety-unit-assessment': {
    title: 'ECS Electrical Safety Unit Assessment',
    icon: '⚡',
    duration: 30 * 60,
    passMark: 0.8,
    questions: electricalSafetyQuestionBank,
    info: ELECTRICAL_SAFETY_EXAM_INFO,
  },

  // ---- NEW, ADDITIONAL practice tests below (500+ new questions) ----
  // These are separate practice banks and do not replace/alter anything
  // above. They pull from extraPracticeElectrical.js and
  // extraPracticeSafety.js only.
  '/ecs-extra-practice-electrical': {
    title: 'Extra Practice: Electrical Theory & Calculations',
    icon: '🧮',
    duration: 40 * 60,
    passMark: 0.7,
    questions: extraPracticeElectricalBank,
    info: EXTRA_PRACTICE_ELECTRICAL_INFO,
  },

  '/ecs-extra-practice-safety': {
    title: 'Extra Practice: Health, Safety & Site Knowledge',
    icon: '📚',
    duration: 40 * 60,
    passMark: 0.7,
    questions: extraPracticeSafetyBank,
    info: EXTRA_PRACTICE_SAFETY_INFO,
  },

  '/ecs-extra-practice-mega': {
    title: 'Extra Practice: 1000+ Mixed Questions',
    icon: '🧠',
    duration: 100 * 60,
    passMark: 0.7,
    questions: extraPracticeMegaBank,
    info: EXTRA_PRACTICE_MEGA_INFO,
  },

  '/ecs-extra-practice-ultra': {
    title: 'Extra Practice: 650+ More Mixed Questions (Ultra Bank)',
    icon: '🚀',
    duration: 100 * 60,
    passMark: 0.7,
    questions: extraPracticeUltraBank,
    info: EXTRA_PRACTICE_ULTRA_INFO,
  },
}

// ---------------------------------------------------------------------
// Chunked 50-question series
// ---------------------------------------------------------------------
// The 4 big "Extra Practice" banks above (mega/ultra/electrical/safety)
// are each still available as one giant sitting at their original route
// (unchanged, nothing above this line is touched). On top of that, each
// bank is also split here into fixed 50-question tests — "Test 1",
// "Test 2", "Test 3"... — the same way the official 327-question HSE
// bank is drawn 50 at a time for the real exam. This gives shorter,
// numbered mock tests (like a normal driving-theory-style mock test
// list) instead of one long 100-minute sitting.
//
// The official ECS HSE Assessment ('/ecs-hse-assessment') and its 11
// topic-practice routes are NOT part of this — they stay exactly as
// they were, fully free, official: true, untouched.
function chunkQuestions(bank, size = 50) {
  const chunks = []
  for (let i = 0; i < bank.length; i += size) {
    chunks.push(bank.slice(i, i + size))
  }
  // Bank sizes aren't always a clean multiple of `size`, which left a
  // short final test (e.g. 11, 43, 10, or 20 questions) at the end of a
  // series. Instead of shipping a partial test, pull the last `size`
  // questions from the bank for the final chunk — every test in every
  // series is then a full, consistent 50 questions. (Only kicks in when
  // there's more than one chunk and enough total questions to fill it;
  // the last chunk then slightly overlaps the previous one instead of
  // trailing off short.)
  if (chunks.length > 1 && chunks[chunks.length - 1].length < size && bank.length >= size) {
    chunks[chunks.length - 1] = bank.slice(bank.length - size)
  }
  return chunks
}

const CHUNK_SERIES = [
  {
    key: 'mega',
    basePath: '/ecs-extra-practice-mega',
    seriesTitle: 'Extra Practice: Mixed Questions',
    icon: '🧠',
    bank: extraPracticeMegaBank,
    info: EXTRA_PRACTICE_MEGA_INFO,
  },
  {
    key: 'ultra',
    basePath: '/ecs-extra-practice-ultra',
    seriesTitle: 'Extra Practice: Ultra Bank',
    icon: '🚀',
    bank: extraPracticeUltraBank,
    info: EXTRA_PRACTICE_ULTRA_INFO,
  },
  {
    key: 'electrical',
    basePath: '/ecs-extra-practice-electrical',
    seriesTitle: 'Extra Practice: Electrical Theory & Calculations',
    icon: '🧮',
    bank: extraPracticeElectricalBank,
    info: EXTRA_PRACTICE_ELECTRICAL_INFO,
  },
  {
    key: 'safety',
    basePath: '/ecs-extra-practice-safety',
    seriesTitle: 'Extra Practice: Health, Safety & Site Knowledge',
    icon: '📚',
    bank: extraPracticeSafetyBank,
    info: EXTRA_PRACTICE_SAFETY_INFO,
  },
]

// Metadata for every chunk card, consumed by MockTestsPage.jsx to render
// the "Test 1 / Test 2 / Test 3..." grid. Each chunk registers its own
// route into extraTests above (App.jsx builds a <Route> for every key in
// extraTests automatically, so no routing changes are needed elsewhere).
export const extraPracticeChunkCards = []

CHUNK_SERIES.forEach(({ key, basePath, seriesTitle, icon, bank, info }) => {
  const chunks = chunkQuestions(bank, 50)
  chunks.forEach((chunkQs, idx) => {
    const num = idx + 1
    const path = `${basePath}-${num}`
    const title = `${seriesTitle} — Test ${num}`
    // ~36 seconds per question, same pacing as the real ECS exam
    // (50 Qs / 30 min), minimum 5 minutes for a short last chunk.
    const duration = Math.max(Math.round(chunkQs.length * 36), 5 * 60)

    extraTests[path] = {
      title,
      icon,
      duration,
      passMark: 0.7,
      questions: chunkQs,
      info,
      seriesKey: key,
      seriesNum: num,
      seriesTotal: chunks.length,
    }

    extraPracticeChunkCards.push({
      id: `extra-${key}-${num}`,
      seriesKey: key,
      seriesNum: num,
      seriesTotal: chunks.length,
      title,
      path,
      icon,
      questions: chunkQs.length,
      duration,
      // First test in every series is free to try; the rest sit behind
      // Pro — exactly like the rest of the app's free/paid split.
      free: num === 1,
    })
  })
})

// 11 topic-focused HSE practice routes — one per official ECS HSE topic.
// Every question is still drawn from the real 327-question official bank,
// just filtered down to a single topic, so these stay official: true.
const topicCounts = getHseTopicQuestionCounts()

export const hseTopicPracticeTests = HSE_TOPIC_DISTRIBUTION.map(({ categoryId, category, questionsInExam }) => {
  const path = `/ecs-hse-practice-${categoryId}`
  const total = topicCounts[categoryId] || 0
  extraTests[path] = {
    title: `HSE Topic Practice: ${category}`,
    icon: TOPIC_ICONS[categoryId] || '📖',
    duration: Math.max(total * 60, 5 * 60), // ~1 min per question, min 5 min
    passMark: 0.8,
    getQuestions: () => generateHseTopicPractice(categoryId),
    info: {
      ...HSE_EXAM_INFO,
      title: `HSE Topic Practice — ${category}`,
      sourceNote: `published ECS HSE Revision Guide — every question here is one of the ${total} questions for the "${category}" topic.`,
    },
    categoryId,
    category,
    topicQuestionCount: total,
    questionsInRealExam: questionsInExam,
  }
  return { categoryId, category, path, icon: TOPIC_ICONS[categoryId] || '📖', total, questionsInExam }
})

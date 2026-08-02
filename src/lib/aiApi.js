// lib/aiApi.js
// Talks to the Pro-only AI endpoints on the backend (server/index.js):
//   POST /api/ai/explain        -> AI explanation for a mock-test answer
//   POST /api/ai/chat           -> general AI study-assistant chat
//   POST /api/ai/generate-quiz  -> AI-generated practice quiz for any topic
// All require the user to be signed in AND on the Pro plan — the backend
// enforces this (402 Payment Required if not Pro), this file just forwards
// the request and surfaces a friendly error either way.
import { apiRequest } from './api'

export async function explainAnswer({ question, options, correctAnswer, userAnswer, topic }) {
  const { explanation } = await apiRequest('/api/ai/explain', {
    method: 'POST',
    body: { question, options, correctAnswer, userAnswer, topic },
  })
  return explanation
}

// history: [{ role: 'user' | 'assistant', content: string }, ...]
export async function chatWithAI(history) {
  const { reply } = await apiRequest('/api/ai/chat', {
    method: 'POST',
    body: { messages: history },
  })
  return reply
}

export async function getAIStatus() {
  return apiRequest('/api/ai/status')
}

// topic: string, count: 1-20, difficulty: 'easy' | 'mixed' | 'hard'
export async function generateQuiz({ topic, count = 10, difficulty = 'mixed' }) {
  return apiRequest('/api/ai/generate-quiz', {
    method: 'POST',
    body: { topic, count, difficulty },
  })
}

// lib/translateApi.js
// Talks to the backend Audio Assist translation endpoint (server/index.js):
//   POST /api/translate  -> { translated, lang }
// Public endpoint — works for guests and free users too, not just Pro.
import { apiRequest } from './api'

export async function translateForAudio({ text, lang }) {
  const { translated } = await apiRequest('/api/translate', {
    method: 'POST',
    body: { text, lang },
    auth: false,
  })
  return translated
}

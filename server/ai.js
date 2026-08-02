// server/ai.js
// Small AI helper shared by the /api/ai/* routes. Supports THREE providers —
// use whichever key(s) you put in server/.env:
//   - GEMINI_API_KEY    -> Google Gemini. Genuinely FREE tier, no credit
//                          card needed. Get a key in 2 minutes at
//                          https://aistudio.google.com/apikey
//   - OPENAI_API_KEY    -> requires billing set up on OpenAI's platform.
//   - ANTHROPIC_API_KEY -> requires billing set up on Anthropic's console.
// If more than one is set, AI_PROVIDER decides which is used (default: gemini).
//
// No SDK packages needed — all three providers have a simple JSON REST API,
// so this just uses the built-in fetch() (Node 18+).

const {
  GEMINI_API_KEY,
  OPENAI_API_KEY,
  ANTHROPIC_API_KEY,
  GROQ_API_KEY,
  AI_PROVIDER = 'gemini', // 'gemini' | 'openai' | 'anthropic' | 'groq'
  GEMINI_MODEL = 'gemini-2.0-flash',
  OPENAI_MODEL = 'gpt-4o-mini',
  ANTHROPIC_MODEL = 'claude-sonnet-4-6',
  GROQ_MODEL = 'llama-3.3-70b-versatile',
} = process.env

export function aiConfigured() {
  return Boolean(GEMINI_API_KEY || OPENAI_API_KEY || ANTHROPIC_API_KEY || GROQ_API_KEY)
}

function pickProvider() {
  if (AI_PROVIDER === 'gemini' && GEMINI_API_KEY) return 'gemini'
  if (AI_PROVIDER === 'openai' && OPENAI_API_KEY) return 'openai'
  if (AI_PROVIDER === 'anthropic' && ANTHROPIC_API_KEY) return 'anthropic'
  if (AI_PROVIDER === 'groq' && GROQ_API_KEY) return 'groq'
  // Fall back to whichever key actually exists.
  if (GROQ_API_KEY) return 'groq'
  if (GEMINI_API_KEY) return 'gemini'
  if (ANTHROPIC_API_KEY) return 'anthropic'
  if (OPENAI_API_KEY) return 'openai'
  return null
}

// messages: [{ role: 'user' | 'assistant', content: string }]
// system: a system prompt string
async function callGemini({ system, messages, maxTokens = 500 }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message || 'Gemini request failed.')
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() || ''
}

async function callOpenAI({ system, messages, maxTokens = 500 }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message || 'OpenAI request failed.')
  return data.choices?.[0]?.message?.content?.trim() || ''
}

async function callAnthropic({ system, messages, maxTokens = 500 }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message || 'Anthropic request failed.')
  return data.content?.map((b) => b.text || '').join('').trim() || ''
}

async function callGroq({ system, messages, maxTokens = 500 }) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message || 'Groq request failed.')
  return data.choices?.[0]?.message?.content?.trim() || ''
}

// Core function: send a system prompt + chat history, get plain text back.
export async function askAI({ system, messages, maxTokens }) {
  const provider = pickProvider()
  if (!provider) {
    throw new Error(
      'No AI key configured on the server. Add GROQ_API_KEY (free, no card needed — https://console.groq.com/keys) to server/.env.'
    )
  }
  if (provider === 'gemini') return callGemini({ system, messages, maxTokens })
  if (provider === 'openai') return callOpenAI({ system, messages, maxTokens })
  if (provider === 'groq') return callGroq({ system, messages, maxTokens })
  return callAnthropic({ system, messages, maxTokens })
}

// Specific helper for "explain this answer" — used by the Pro
// "AI Explanation" button on every mock test result screen.
export async function explainAnswer({ question, options, correctAnswer, userAnswer, topic }) {
  const system = `You are a friendly UK ECS (Electrotechnical Certification Scheme) exam tutor. \
A student just answered a practice question. Explain, in 2-4 short sentences, WHY the correct \
answer is correct and (if they got it wrong) why their chosen answer is wrong. Be encouraging, \
simple, and specific to UK construction health & safety rules. Do not repeat the full question back.`

  const userMsg = [
    topic ? `Topic: ${topic}` : null,
    `Question: ${question}`,
    `Options: ${options?.join(', ')}`,
    `Correct answer: ${correctAnswer}`,
    userAnswer ? `Student's answer: ${userAnswer}` : 'Student has not answered yet — just explain the correct answer.',
  ].filter(Boolean).join('\n')

  return askAI({
    system,
    messages: [{ role: 'user', content: userMsg }],
    maxTokens: 300,
  })
}

// Specific helper for the "Audio Assist" multi-language question reader.
// Translates a question (or any short piece of UI text) into the target
// language so the browser's built-in text-to-speech can read it aloud.
// Kept deliberately literal/plain — this is spoken aloud, not displayed as
// a polished translation, so we ask for ONLY the translated text back.
export async function translateText({ text, targetLanguage }) {
  if (!text) return ''
  const system = `You are a precise translation engine for a UK construction-safety exam app. \
Translate the user's message into ${targetLanguage}. Reply with ONLY the translated text — \
no quotes, no notes, no explanations, no original text repeated back.`

  const out = await askAI({
    system,
    messages: [{ role: 'user', content: text }],
    maxTokens: 400,
  })
  return out.replace(/^["'“”]+|["'“”]+$/g, '').trim()
}

// Translates many short strings in ONE AI call (instead of one call per
// string) by numbering them and asking for numbered lines back. Used by the
// site-wide language switcher, where a single page can contain 50-200 short
// UI strings — translating those one-by-one would be slow and expensive.
//
// NOTE on a bug that used to live here: maxTokens was capped at a flat 4000
// regardless of batch size (`Math.min(4000, texts.length * 60 + 200)`), and
// 60 tokens/string is nowhere near enough headroom for scripts like
// Punjabi/Bulgarian/Russian which take noticeably more tokens per word than
// English. Once a batch of ~60-100 strings got translated into one of those
// languages, the model's reply got cut off mid-list, later numbered lines
// never arrived, and `translatePage` silently fell back to the original
// English text for them — which is exactly the "not everything translates"
// symptom. Fixed by giving each string a much bigger token budget, raising
// the cap, and — belt and braces — automatically re-requesting just the
// lines that still come back missing instead of giving up on them.
async function translateBatchOnce({ texts, targetLanguage, maxTokens }) {
  const numbered = texts.map((t, i) => `${i + 1}. ${t.replace(/\n/g, ' ')}`).join('\n')
  const system = `You are a precise translation engine for a UK construction-safety exam app's user \
interface. You will receive a numbered list of short UI strings (button labels, headings, sentences). \
Translate EVERY SINGLE one into ${targetLanguage}, keeping the same meaning, tone and any numbers/placeholders \
exactly as they are. It is critical that you translate all ${texts.length} lines — never skip, merge, \
truncate, or summarise the list. Reply with ONLY a numbered list in the exact same format (e.g. "1. ..."), \
one translation per line, exactly ${texts.length} lines total, no extra commentary before or after.`

  const out = await askAI({
    system,
    messages: [{ role: 'user', content: numbered }],
    maxTokens,
  })

  const lines = out.split('\n').map((l) => l.trim()).filter(Boolean)
  const results = new Array(texts.length).fill(null)
  for (const line of lines) {
    // Tolerate "1.", "1)", "1 -" etc. — models don't always match the
    // requested format exactly, and we'd rather parse it than discard it.
    const match = line.match(/^(\d+)[.)\-:]\s*(.*)$/)
    if (!match) continue
    const idx = Number(match[1]) - 1
    if (idx >= 0 && idx < texts.length && match[2].trim()) results[idx] = match[2].trim()
  }
  return results
}

export async function translateBatch({ texts, targetLanguage }) {
  if (!texts || texts.length === 0) return []

  // ~120 tokens/string covers long UI sentences even in token-hungry
  // scripts, with a generous ceiling so large batches don't get starved.
  const budgetFor = (n) => Math.min(8000, n * 120 + 300)

  let results = await translateBatchOnce({ texts, targetLanguage, maxTokens: budgetFor(texts.length) })

  // Retry any missing lines (model truncated/dropped them), up to twice,
  // each time only re-asking for the strings that are still missing so the
  // retry batch is small and reliably fits in one response.
  for (let attempt = 0; attempt < 2; attempt++) {
    const missingIdx = results.map((r, i) => (r === null ? i : -1)).filter((i) => i !== -1)
    if (missingIdx.length === 0) break
    const missingTexts = missingIdx.map((i) => texts[i])
    const retried = await translateBatchOnce({
      texts: missingTexts,
      targetLanguage,
      maxTokens: budgetFor(missingTexts.length),
    })
    retried.forEach((t, j) => { if (t) results[missingIdx[j]] = t })
  }

  // Fall back to the original string only for the rare case a translation
  // genuinely never comes back after retries, so the UI never shows blank.
  return results.map((t, i) => (t && t.length > 0 ? t : texts[i]))
}

// Specific helper for the AI Quiz Generator — creates a fresh set of
// multiple-choice ECS practice questions for any topic on demand, so users
// aren't limited to the fixed question bank in src/data/questions.js.
// Reuses the same numbered-list-in/numbered-list-out trick as
// translateBatch above, but each "line" is a JSON object, which keeps the
// prompt simple while still giving us something reliably parseable back.
export async function generateQuiz({ topic, count = 10, difficulty = 'mixed' }) {
  const n = Math.max(1, Math.min(20, Number(count) || 10))
  const system = `You are a UK ECS (Electrotechnical Certification Scheme) exam question writer. \
Generate exactly ${n} realistic multiple-choice practice questions about "${topic}", at ${difficulty} \
difficulty, in the style of the official ECS Health, Safety & Environment test. Each question needs \
exactly 4 plausible options with only ONE correct answer, plus a short 1-2 sentence explanation of why \
that answer is correct. Reply with ONLY a JSON array, no markdown fences, no commentary, in exactly \
this shape: [{"text":"...","options":["...","...","...","..."],"correctAnswer":"...","explanation":"..."}]. \
The "correctAnswer" value must be copied verbatim from one of the four "options". Do not number the \
questions inside the text field.`

  const out = await askAI({
    system,
    messages: [{ role: 'user', content: `Generate the ${n} questions now.` }],
    maxTokens: Math.min(8000, n * 220 + 300),
  })

  const cleaned = out.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
  let parsed
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    // Models occasionally add stray text around the array — fall back to
    // extracting just the [...] span rather than giving up entirely.
    const match = cleaned.match(/\[[\s\S]*\]/)
    if (!match) throw new Error('AI did not return a parseable quiz. Please try again.')
    parsed = JSON.parse(match[0])
  }
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('AI did not return any questions. Please try again.')
  }

  return parsed
    .filter((q) => q && typeof q.text === 'string' && Array.isArray(q.options) && q.options.length >= 2 && q.correctAnswer)
    .map((q, i) => ({
      id: i + 1,
      text: q.text.trim(),
      options: q.options.map((o) => String(o).trim()),
      correctAnswer: String(q.correctAnswer).trim(),
      explanation: (q.explanation || '').trim(),
    }))
}

// Specific helper for the general "AI Assistant" chat widget.
export async function chatReply({ history }) {
  const system = `You are the friendly in-app AI study assistant for ECSPrep, a UK construction \
ECS card test-preparation app (Green Card, Black Card, Supervisor, Skilled Worker tests, etc.). \
Help the user understand health & safety topics, explain practice questions, and give study tips. \
Keep answers short (2-5 sentences) and easy to read out loud, since this reply may also be spoken \
to the user via text-to-speech.`

  return askAI({
    system,
    messages: history,
    maxTokens: 400,
  })
}

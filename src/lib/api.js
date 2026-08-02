// lib/api.js
// Small fetch wrapper for talking to the ECSPrep backend (see /server).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const TOKEN_KEY = 'ecsprep_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function apiRequest(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // The browser's fetch() throws a generic "Failed to fetch" for any
    // network-level failure. The #1 cause during local development is that
    // the backend (server/) simply isn't running yet.
    throw new Error(
      `Could not reach the server at ${API_URL}. Make sure the backend is running (cd server && npm run dev) and VITE_API_URL is correct.`
    )
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Something went wrong. Please try again.')
  }
  return data
}

// Like apiRequest, but returns a Blob instead of parsed JSON — used for
// authenticated file downloads (e.g. admin exporting a user's data), where
// a plain <a href> link can't attach the Authorization header itself.
export async function apiRequestBlob(path, { method = 'GET' } = {}) {
  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { method, headers })
  if (!res.ok) {
    let message = 'Download failed.'
    try {
      const data = await res.json()
      message = data?.error || message
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(message)
  }
  return res.blob()
}

// context/AuthContext.jsx
// Real auth: talks to the backend in /server for email+password signup,
// Google Sign-In verification, and Stripe-backed Pro upgrades. The session
// token is a JWT stored in localStorage; the user object is cached there
// too so the UI has something to show before /api/auth/me resolves.
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiRequest, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)
const USER_CACHE_KEY = 'ecsprep_user'
const PENDING_REF_KEY = 'ecsprep_pending_ref'

// Captures ?ref=CODE from the URL (e.g. a shared referral link) so it's
// still available at signup time even if the person browses a few pages
// first. Read once at module load — this runs before the provider mounts.
try {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (ref) localStorage.setItem(PENDING_REF_KEY, ref)
} catch {
  // ignore — non-browser environment or storage unavailable
}

function getPendingReferralCode() {
  try {
    return localStorage.getItem(PENDING_REF_KEY) || undefined
  } catch {
    return undefined
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_CACHE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser)
    try {
      if (nextUser) {
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(nextUser))
      } else {
        localStorage.removeItem(USER_CACHE_KEY)
      }
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [])

  // On load, if we have a token, refresh the user from the server so Pro
  // status, plan, etc. are always accurate (not just whatever was cached).
  useEffect(() => {
    let cancelled = false
    async function restoreSession() {
      const token = getToken()
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { user: freshUser } = await apiRequest('/api/auth/me')
        if (!cancelled) persistUser(freshUser)
      } catch {
        if (!cancelled) {
          setToken(null)
          persistUser(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    restoreSession()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleExternalLogout = () => persistUser(null)
    window.addEventListener('user_logout', handleExternalLogout)
    return () => window.removeEventListener('user_logout', handleExternalLogout)
  }, [persistUser])

  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    try {
      const { token, user: loggedInUser } = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password },
        auth: false,
      })
      setToken(token)
      persistUser(loggedInUser)
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  const signup = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    try {
      const { token, user: newUser } = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: { name, email, password, ref: getPendingReferralCode() },
        auth: false,
      })
      setToken(token)
      persistUser(newUser)
      return newUser
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  // credential = the signed JWT Google's "Sign in with Google" button hands
  // back. It's verified server-side in /api/auth/google, never trusted here.
  const loginWithGoogle = useCallback(async (credential) => {
    setLoading(true)
    try {
      const { token, user: googleUser } = await apiRequest('/api/auth/google', {
        method: 'POST',
        body: { credential, ref: getPendingReferralCode() },
        auth: false,
      })
      setToken(token)
      persistUser(googleUser)
      return googleUser
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  const logout = useCallback(() => {
    setToken(null)
    persistUser(null)
  }, [persistUser])

  const updateProfile = useCallback(async (patch) => {
    const { user: updatedUser } = await apiRequest('/api/user/profile', {
      method: 'PATCH',
      body: patch,
    })
    persistUser(updatedUser)
    return updatedUser
  }, [persistUser])

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    await apiRequest('/api/user/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    })
  }, [])

  const deleteAccount = useCallback(async ({ password } = {}) => {
    await apiRequest('/api/user/account', {
      method: 'DELETE',
      body: { password },
    })
    setToken(null)
    persistUser(null)
  }, [persistUser])

  // Starts real Stripe Checkout. Redirects the browser to Stripe's hosted
  // payment page — no card details ever touch our own frontend/backend.
  const startCheckout = useCallback(async (planId) => {
    const { url } = await apiRequest('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: { plan: planId },
    })
    window.location.href = url
  }, [])

  // Opens Stripe's hosted Billing Portal so a Pro user can cancel,
  // switch plan, or update their card themselves — no support email needed.
  const openBillingPortal = useCallback(async () => {
    const { url } = await apiRequest('/api/stripe/create-portal-session', { method: 'POST' })
    window.location.href = url
  }, [])

  // Called when Stripe redirects back to /checkout?session_id=... after a
  // successful payment, as a safety net alongside the webhook.
  const confirmCheckoutSession = useCallback(async (sessionId) => {
    const { user: updatedUser } = await apiRequest(`/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`)
    persistUser(updatedUser)
    return updatedUser
  }, [persistUser])

  // Re-pulls the user from the server — used after actions that change
  // server-side user data outside the normal update flows, like booking a
  // course, so the UI immediately reflects it.
  const refreshUser = useCallback(async () => {
    try {
      const { user: freshUser } = await apiRequest('/api/auth/me')
      persistUser(freshUser)
      return freshUser
    } catch {
      return null
    }
  }, [persistUser])

  // Manual/admin-approved plan request — for learners who'd rather pay by
  // bank transfer than card. Doesn't touch Stripe at all; it just queues a
  // request (see /api/payment/request) that an admin activates from
  // /admin/payment-requests, same pattern as course booking requests.
  const requestManualPlan = useCallback(async (planId) => {
    const result = await apiRequest('/api/payment/request', {
      method: 'POST',
      body: { plan: planId },
    })
    await refreshUser()
    return result
  }, [refreshUser])

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPro: !!user?.isPro,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    startCheckout,
    openBillingPortal,
    confirmCheckoutSession,
    requestManualPlan,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

export default AuthContext

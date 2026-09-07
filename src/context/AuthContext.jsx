// context/AuthContext.jsx
// Real auth: talks to the backend in /server for email+password signup,
// Google Sign-In verification, and Stripe-backed Pro upgrades. The session
// token is a JWT stored in localStorage; the user object is cached there
// too so the UI has something to show before /api/auth/me resolves.
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiRequest, apiRequestBlob, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)
const USER_CACHE_KEY = 'ecsprep_user'
const PENDING_REF_KEY = 'ecsprep_pending_ref'
// New feature: user impersonation. Stashes the admin's own {token, user}
// here while viewing the app as someone else, so "Return to admin" is an
// instant local swap — no extra API round-trip needed.
const IMPERSONATOR_KEY = 'ecsprep_impersonator'

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
  // Set the moment an admin blocks this account — either at login/restore,
  // or live while the person is already browsing (see the polling effect
  // below). While true, App.jsx shows a blank blocked screen instead of the
  // site, no matter what route they're on.
  const [suspended, setSuspended] = useState(false)

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
        // apiRequest already flips `suspended` via the account_suspended
        // event if that's why this failed — just drop the stale session.
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
    // Fired by apiRequest the instant any call comes back 403
    // ACCOUNT_SUSPENDED — covers both "tried to log back in" and "was
    // already browsing when the admin hit Block".
    const handleSuspended = () => {
      persistUser(null)
      setSuspended(true)
    }
    window.addEventListener('user_logout', handleExternalLogout)
    window.addEventListener('account_suspended', handleSuspended)
    return () => {
      window.removeEventListener('user_logout', handleExternalLogout)
      window.removeEventListener('account_suspended', handleSuspended)
    }
  }, [persistUser])

  // Live check for people who already had the site open in a tab when an
  // admin blocked them — /api/auth/me is cheap and requireAuth on the
  // backend already 403s ACCOUNT_SUSPENDED for a suspended user, so a
  // light poll is enough to cut an active session within ~30s without
  // needing sockets.
  useEffect(() => {
    if (!user) return undefined
    const id = setInterval(() => {
      apiRequest('/api/auth/me').catch(() => {
        // errors are handled by the account_suspended listener above when
        // relevant; any other failure (e.g. brief network blip) is ignored
        // here so it doesn't log people out for unrelated reasons.
      })
    }, 30_000)
    return () => clearInterval(id)
  }, [user])

  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    try {
      const result = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password },
        auth: false,
      })
      // New feature: Two-Factor Authentication. If the account has 2FA
      // turned on, the server holds the real session back and instead
      // returns a short-lived pendingToken — the caller (LoginPage) shows
      // an "enter your code" step and calls verifyTwoFactorLogin below.
      if (result.requires2FA) return { requires2FA: true, pendingToken: result.pendingToken }
      const { token, user: loggedInUser } = result
      setToken(token)
      persistUser(loggedInUser)
      setSuspended(false)
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  // New feature: Two-Factor Authentication — completes a login that was put
  // on hold by login() above, once the person enters the emailed code.
  const verifyTwoFactorLogin = useCallback(async ({ pendingToken, code }) => {
    setLoading(true)
    try {
      const { token, user: loggedInUser } = await apiRequest('/api/auth/2fa/verify', {
        method: 'POST',
        body: { pendingToken, code },
        auth: false,
      })
      setToken(token)
      persistUser(loggedInUser)
      setSuspended(false)
      return loggedInUser
    } finally {
      setLoading(false)
    }
  }, [persistUser])

  const resendTwoFactorCode = useCallback(async (pendingToken) => {
    await apiRequest('/api/auth/2fa/resend', { method: 'POST', body: { pendingToken }, auth: false })
  }, [])

  // New feature: Two-Factor Authentication — Settings > Security toggle.
  const requestEnableTwoFactor = useCallback(async () => {
    await apiRequest('/api/user/2fa/request-enable', { method: 'POST' })
  }, [])

  const confirmEnableTwoFactor = useCallback(async (code) => {
    const { user: updatedUser } = await apiRequest('/api/user/2fa/confirm-enable', { method: 'POST', body: { code } })
    persistUser(updatedUser)
    return updatedUser
  }, [persistUser])

  const disableTwoFactor = useCallback(async (password) => {
    const { user: updatedUser } = await apiRequest('/api/user/2fa/disable', { method: 'POST', body: { password } })
    persistUser(updatedUser)
    return updatedUser
  }, [persistUser])

  // New feature: user impersonation ("log in as this user") for admin
  // support debugging — see startImpersonation.
  const startImpersonation = useCallback(async (targetUserId) => {
    const { token: impersonationToken, user: targetUser } = await apiRequest(`/api/admin/users/${targetUserId}/impersonate`, { method: 'POST' })
    try {
      localStorage.setItem(IMPERSONATOR_KEY, JSON.stringify({ token: getToken(), user }))
    } catch {
      // ignore storage errors — worst case "Return to admin" won't be available
    }
    setToken(impersonationToken)
    persistUser(targetUser)
    return targetUser
  }, [user, persistUser])

  const isImpersonating = useCallback(() => {
    try { return !!localStorage.getItem(IMPERSONATOR_KEY) } catch { return false }
  }, [])

  const stopImpersonation = useCallback(() => {
    try {
      const raw = localStorage.getItem(IMPERSONATOR_KEY)
      if (!raw) return
      const { token: adminToken, user: adminUser } = JSON.parse(raw)
      setToken(adminToken)
      persistUser(adminUser)
      localStorage.removeItem(IMPERSONATOR_KEY)
    } catch {
      // ignore — worst case the person just has to log back in manually
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
      setSuspended(false)
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
      setSuspended(false)
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

  // New feature: notification/reminder preferences (weekly report opt-in,
  // employer email, exam date, re-engagement nudge) — kept separate from
  // updateProfile above since these drive the backend's scheduled emails
  // rather than the profile card.
  const updatePreferences = useCallback(async (patch) => {
    const { user: updatedUser } = await apiRequest('/api/user/preferences', {
      method: 'PATCH',
      body: patch,
    })
    persistUser(updatedUser)
    return updatedUser
  }, [persistUser])

  // New feature: GDPR self-service "download my data" — triggers a browser
  // download of everything ECSPrep holds on this account, no admin needed.
  const exportMyData = useCallback(async () => {
    const blob = await apiRequestBlob('/api/user/export')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-ecsprep-data.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [])

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
  const startCheckout = useCallback(async (planId, couponCode) => {
    const { url } = await apiRequest('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: { plan: planId, coupon: couponCode || undefined },
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
    // New feature: granular admin roles. isAdmin now means "can enter the
    // /admin area at all" (any staff role), matching the backend's
    // STAFF_ROLES / requireAdmin. isSuperAdmin is the strict, full-access
    // check — used to gate the sensitive sections client-side too (backend
    // still enforces this regardless via requireSuperAdmin).
    isAdmin: ['admin', 'support_agent', 'content_editor'].includes(user?.role),
    isSuperAdmin: user?.role === 'admin',
    isPro: !!user?.isPro,
    loading,
    suspended,
    login,
    verifyTwoFactorLogin,
    resendTwoFactorCode,
    requestEnableTwoFactor,
    confirmEnableTwoFactor,
    disableTwoFactor,
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    updatePreferences,
    exportMyData,
    changePassword,
    deleteAccount,
    startImpersonation,
    isImpersonating,
    stopImpersonation,
    startCheckout,
    openBillingPortal,
    confirmCheckoutSession,
    requestManualPlan,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

export default AuthContext

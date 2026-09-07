// components/PageVisibilityGate.jsx
// Wraps a built-in page's route element. Checks the generic
// `pageVisibility` setting (Admin -> Pages -> "Site pages") and, if an
// admin has hidden this page, shows regular visitors a locked-page message
// while admins still see the real page (with a small notice). Same pattern
// already used inline for the Blog and ECS Cards pages, generalised so any
// page key can be added here without a new bespoke toggle.
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'
import PageDisabledLock from './PageDisabledLock'
import PageLoader from './PageLoader'

function PageVisibilityGate({ pageKey, title, children }) {
  const { isAdmin } = useAuth()
  const [visible, setVisible] = useState(true)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => { if (!cancelled) setVisible(data.pageVisibility?.[pageKey] !== false) })
      .catch(() => { if (!cancelled) setVisible(true) })
      .finally(() => { if (!cancelled) setChecking(false) })
    return () => { cancelled = true }
  }, [pageKey])

  if (checking) return <PageLoader />

  if (!visible && !isAdmin) {
    return (
      <PageDisabledLock
        title={title}
        message="This page has been temporarily disabled by the site admin. Please check back later."
      />
    )
  }

  return (
    <>
      {!visible && isAdmin && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 text-sm text-center py-2 px-4 mx-4 mt-4 rounded-lg">
          🔒 The "{title}" page is currently hidden from regular users. You can see it because you're an admin. Turn it back on in Admin → Pages.
        </div>
      )}
      {children}
    </>
  )
}

export default PageVisibilityGate

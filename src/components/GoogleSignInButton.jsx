// components/GoogleSignInButton.jsx
// Renders the real Google "Sign in with Google" button using Google
// Identity Services (loaded via <script> in index.html). No npm package
// needed. Requires VITE_GOOGLE_CLIENT_ID to be set in the frontend .env.
import React, { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function GoogleSignInButton({ onError }) {
  const buttonRef = useRef(null)
  const { loginWithGoogle } = useAuth()

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    function renderButton() {
      if (!window.google || !buttonRef.current) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            await loginWithGoogle(response.credential)
          } catch (err) {
            onError?.(err.message || 'Google sign-in failed.')
          }
        },
      })
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
      })
    }

    // The gsi/client script loads async, so poll briefly until it's ready.
    if (window.google) {
      renderButton()
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval)
          renderButton()
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [loginWithGoogle, onError])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="text-xs text-center text-gray-400 border border-dashed border-gray-300 rounded-lg py-3 px-4">
        Google Sign-In not configured — add VITE_GOOGLE_CLIENT_ID to your .env
      </div>
    )
  }

  return <div ref={buttonRef} className="flex justify-center" />
}

export default GoogleSignInButton

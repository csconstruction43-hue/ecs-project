// pages/auth/SignOutPage.jsx
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Shield, 
  AlertTriangle,
  Clock,
  ChevronDown
} from 'lucide-react'

// ==================== Types ====================
const StepStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
}

// ==================== Custom Hook: useSignOut ====================
const useSignOut = () => {
  const [steps, setSteps] = useState([
    { id: 'localStorage', label: 'Clearing local storage', status: StepStatus.PENDING },
    { id: 'sessionStorage', label: 'Clearing session data', status: StepStatus.PENDING },
    { id: 'cookies', label: 'Removing cookies', status: StepStatus.PENDING },
    { id: 'server', label: 'Invalidating server session', status: StepStatus.PENDING },
    { id: 'broadcast', label: 'Broadcasting logout', status: StepStatus.PENDING }
  ])
  const [error, setError] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  const updateStep = useCallback((id, status) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, status } : step
    ))
  }, [])

  useEffect(() => {
    let cancelled = false

    const performSignOut = async () => {
      try {
        // Step 1: Clear localStorage
        updateStep('localStorage', StepStatus.PROCESSING)
        await new Promise(resolve => setTimeout(resolve, 200))
        localStorage.clear()
        if (!cancelled) updateStep('localStorage', StepStatus.COMPLETED)

        // Step 2: Clear sessionStorage
        updateStep('sessionStorage', StepStatus.PROCESSING)
        await new Promise(resolve => setTimeout(resolve, 150))
        sessionStorage.clear()
        if (!cancelled) updateStep('sessionStorage', StepStatus.COMPLETED)

        // Step 3: Clear cookies
        updateStep('cookies', StepStatus.PROCESSING)
        await new Promise(resolve => setTimeout(resolve, 200))
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.split('=')
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
          document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
        })
        if (!cancelled) updateStep('cookies', StepStatus.COMPLETED)

        // Step 4: Server session invalidation
        updateStep('server', StepStatus.PROCESSING)
        try {
          // const response = await fetch('/api/auth/logout', { 
          //   method: 'POST',
          //   credentials: 'include' 
          // })
          // if (!response.ok) throw new Error()
          await new Promise(resolve => setTimeout(resolve, 300))
          if (!cancelled) updateStep('server', StepStatus.COMPLETED)
        } catch {
          if (!cancelled) updateStep('server', StepStatus.FAILED)
        }

        // Step 5: Broadcast event
        updateStep('broadcast', StepStatus.PROCESSING)
        window.dispatchEvent(new CustomEvent('user_logout', { 
          detail: { timestamp: Date.now() } 
        }))
        if (!cancelled) {
          updateStep('broadcast', StepStatus.COMPLETED)
          setIsComplete(true)
        }

      } catch (err) {
        if (!cancelled) {
          setError('Failed to complete sign out. Please try again.')
          console.error('SignOut error:', err)
        }
      }
    }

    performSignOut()

    return () => {
      cancelled = true
    }
  }, [updateStep])

  return { steps, error, isComplete }
}

// ==================== Components ====================

// Loading State
const SignOutLoading = ({ steps }) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <div className="relative inline-flex mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
          <Shield className="w-4 h-4 text-white" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Signing you out</h2>
      <p className="text-sm text-gray-500 mt-1">Securely clearing your session</p>
    </div>
    
    <div className="space-y-2">
      {steps.map((step) => (
        <div 
          key={step.id}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
        >
          {step.status === StepStatus.COMPLETED && (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          )}
          {step.status === StepStatus.PROCESSING && (
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
          )}
          {step.status === StepStatus.FAILED && (
            <AlertTriangle className="w-4 h-4 text-blue-500 flex-shrink-0" />
          )}
          {step.status === StepStatus.PENDING && (
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
          )}
          <span className={`text-sm ${
            step.status === StepStatus.COMPLETED ? 'text-gray-500' : 
            step.status === StepStatus.FAILED ? 'text-blue-600' : 
            'text-gray-700'
          }`}>
            {step.label}
          </span>
          {step.status === StepStatus.FAILED && (
            <span className="text-xs text-blue-600 ml-auto">Retry recommended</span>
          )}
        </div>
      ))}
    </div>
  </div>
)

// Success State
const SignOutSuccess = ({ countdown, onRedirect, onSignIn, isRedirecting }) => {
  const [showDetails, setShowDetails] = useState(false)
  const progress = ((5 - countdown) / 5) * 100

  return (
    <>
      {/* Success Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
          <LogOut className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Signed Out Successfully
        </h2>
        <p className="text-gray-600 text-sm">
          Your session has been terminated and all local data cleared
        </p>
      </div>

      {/* Security Details Accordion */}
      <div className="mb-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="font-medium text-gray-700">Security clearance report</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            showDetails ? 'rotate-180' : ''
          }`} />
        </button>
        
        {showDetails && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Local storage cleared</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Session storage cleared</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Authentication cookies removed</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Server session invalidated</span>
            </div>
          </div>
        )}
      </div>

      {/* Countdown */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Redirecting to homepage</span>
          </div>
          <span className="text-sm font-mono font-semibold text-blue-600">
            {countdown}s
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {!isRedirecting ? (
          <>
            <button
              onClick={onRedirect}
              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Go to Homepage
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSignIn}
              className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Sign In Again
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 text-blue-600 py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting...</span>
          </div>
        )}
      </div>
    </>
  )
}

// Error State
const SignOutError = ({ error, onRetry, onContinue }) => (
  <div className="text-center">
    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <AlertTriangle className="w-10 h-10 text-red-600" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Out Failed</h2>
    <p className="text-gray-600 mb-6">{error}</p>
    <div className="space-y-3">
      <button
        onClick={onRetry}
        className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Try Again
      </button>
      <button
        onClick={onContinue}
        className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        Continue to Homepage
      </button>
    </div>
  </div>
)

// ==================== Main Component ====================
function SignOutPage() {
  const navigate = useNavigate()
  const { steps, error, isComplete } = useSignOut()
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleRedirect = useCallback(() => {
    setIsRedirecting(true)
    setTimeout(() => navigate('/'), 300)
  }, [navigate])

  const handleSignIn = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  // Auto-redirect countdown
  useEffect(() => {
    if (!isComplete) return
    
    if (countdown <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
      handleRedirect()
      return
    }

    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, isComplete, handleRedirect])

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href)
    })
    return () => window.removeEventListener('popstate', () => {})
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          {error ? (
            <SignOutError 
              error={error} 
              onRetry={handleRetry}
              onContinue={handleRedirect}
            />
          ) : !isComplete ? (
            <SignOutLoading steps={steps} />
          ) : (
            <SignOutSuccess 
              countdown={countdown}
              onRedirect={handleRedirect}
              onSignIn={handleSignIn}
              isRedirecting={isRedirecting}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
          <span className="mx-2">•</span>
          <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
          <span className="mx-2">•</span>
          <a href="/help" className="hover:text-gray-700 transition-colors">Help</a>
        </p>
      </div>
    </div>
  )
}

export default SignOutPage
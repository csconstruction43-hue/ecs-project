// pages/TeamInviteAcceptPage.jsx
// New feature: the landing page for the link in teamInviteEmailHtml()
// (server/index.js). Route is protected, so an unauthenticated visitor is
// already sent to /login (with ?from= this page) before they even get here
// — this page just needs to show who invited them and let them confirm.
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Users, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

function TeamInviteAcceptPage() {
  const { inviteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [invite, setInvite] = useState(null)
  const [employerName, setEmployerName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [accepting, setAccepting] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { invite, employerName } = await apiRequest(`/api/team/invites/${inviteId}/public`)
        if (!cancelled) { setInvite(invite); setEmployerName(employerName) }
      } catch (err) {
        if (!cancelled) setError(err.message || 'This invite could not be found.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [inviteId])

  const handleAccept = async () => {
    setError('')
    setAccepting(true)
    try {
      await apiRequest(`/api/team/invites/${inviteId}/accept`, { method: 'POST' })
      setAccepted(true)
    } catch (err) {
      setError(err.message || 'Could not accept this invite.')
    } finally {
      setAccepting(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <Seo title="Join Your Employer's Team | ECSPrep" path={`/team/accept/${inviteId}`} noindex />
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center">
        <Users className="mx-auto text-primary mb-4" size={36} />

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-6">
            <Loader2 className="animate-spin" size={18} /> Loading invite…
          </div>
        ) : accepted ? (
          <>
            <CheckCircle2 className="mx-auto text-green-500 mb-3" size={32} />
            <h1 className="text-xl font-bold text-gray-900 mb-2">You're linked!</h1>
            <p className="text-gray-600 mb-6">{employerName} can now see your ECSPrep progress on their Team Dashboard.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition"
            >
              Go to my dashboard
            </button>
          </>
        ) : error ? (
          <>
            <AlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Couldn't accept this invite</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/dashboard" className="text-primary font-semibold hover:underline">Back to dashboard</Link>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Join {employerName}'s team</h1>
            <p className="text-gray-600 mb-6">
              {employerName} has invited <strong>{invite?.email}</strong> to link accounts on ECSPrep, so they can
              see your training progress — your best score, tests completed, and last activity.
            </p>
            {user && user.email.toLowerCase() !== invite?.email.toLowerCase() && (
              <p className="text-amber-600 text-sm mb-4">
                You're signed in as {user.email}, but this invite was sent to {invite?.email}. Please sign in with
                that email address to accept it.
              </p>
            )}
            <button
              onClick={handleAccept}
              disabled={accepting || (user && user.email.toLowerCase() !== invite?.email.toLowerCase())}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
            >
              {accepting ? 'Linking…' : 'Accept & Link Account'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TeamInviteAcceptPage

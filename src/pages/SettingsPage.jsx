// pages/SettingsPage.jsx
import React, { useState, useEffect, useMemo } from 'react'
import {
  Settings, Bell, Moon, Globe, User, Save,
  Lock, Shield, CreditCard, Smartphone, LogOut,
  CheckCircle, AlertCircle, Loader2,
  Camera, Trash2, Mail, Phone, MapPin,
  Award, Clock, RefreshCw, X, BookOpen
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { PLANS } from '../lib/pricingPlans'

const PLAN_LABELS = {
  weekly: { name: PLANS.weekly.name, price: PLANS.weekly.price, period: '/week' },
  monthly: { name: PLANS.monthly.name, price: PLANS.monthly.price, period: '/month' },
  lifetime: { name: PLANS.lifetime.name, price: PLANS.lifetime.price, period: ' one-time' },
}

// Same streak/average-score logic used on the Analytics page, so the
// numbers shown here always match what the user sees elsewhere.
function computeStats(history) {
  if (!history.length) {
    return { testsTaken: 0, averageScore: 0, studyStreak: 0, certificatesEarned: 0 }
  }
  const testsTaken = history.length
  const averageScore = Math.round(
    history.reduce((sum, t) => sum + (t.percentage ?? t.score ?? 0), 0) / testsTaken
  )
  const certificatesEarned = history.filter((t) => (t.percentage ?? t.score ?? 0) >= 90).length

  const dates = [...new Set(history.map((t) => new Date(t.date).toDateString()))].sort(
    (a, b) => new Date(a) - new Date(b)
  )
  let streak = 0
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) { streak = 1; continue }
    const diffDays = (new Date(dates[i]) - new Date(dates[i - 1])) / (1000 * 60 * 60 * 24)
    streak = diffDays === 1 ? streak + 1 : 1
  }
  // Streak only "counts" if it's still active (last test was today or yesterday).
  const lastDate = new Date(dates[dates.length - 1])
  const daysSinceLast = Math.floor((new Date().setHours(0,0,0,0) - lastDate.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))
  const studyStreak = daysSinceLast <= 1 ? streak : 0

  return { testsTaken, averageScore, studyStreak, certificatesEarned }
}

function preferencesKey(userId) {
  return `ecsprep_preferences_${userId}`
}

function SettingsPage() {
  const { user, isPro, updateProfile, changePassword, deleteAccount, logout, openBillingPortal } = useAuth()
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState('')

  const handleManageSubscription = async () => {
    setPortalError('')
    setPortalLoading(true)
    try {
      await openBillingPortal()
      // openBillingPortal redirects the browser away; nothing else to do.
    } catch (err) {
      setPortalLoading(false)
      setPortalError(err?.message || 'Could not open billing portal. Please try again.')
    }
  }
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('profile')

  // ----- Profile form, seeded from the real logged-in user -----
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    company: user?.company || '',
    position: user?.position || '',
  })
  const [avatar, setAvatar] = useState(user?.avatar || null)
  const [avatarError, setAvatarError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
    setFormData({
      fullName: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      company: user.company || '',
      position: user.position || '',
    })
    setAvatar(user.avatar || null)
  }, [user])

  // ----- Preferences (not part of the account schema, so kept locally
  // per-user rather than faked as if they hit the server) -----
  // Dark mode & readable mode live in ThemeContext (shared with the header
  // toggle + the rest of the app) rather than a second, disconnected copy
  // here — this used to be its own local state that only tinted the body
  // background/text colour directly, so it drifted out of sync with the
  // real theme the moment you toggled dark mode from the header instead.
  const { isDark, toggleTheme, readableMode, toggleReadableMode } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [language, setLanguage] = useState('en')
  const [autoSave, setAutoSave] = useState(true)
  const [prefsSaved, setPrefsSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    try {
      const raw = localStorage.getItem(preferencesKey(user.id))
      if (raw) {
        const prefs = JSON.parse(raw)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
        setEmailNotifications(prefs.emailNotifications !== false)
        setPushNotifications(prefs.pushNotifications !== false)
        setMarketingEmails(!!prefs.marketingEmails)
        setLanguage(prefs.language || 'en')
        setAutoSave(prefs.autoSave !== false)
      }
    } catch {
      // ignore corrupt/missing local prefs
    }
  }, [user])

  const handleSavePreferences = () => {
    if (!user) return
    localStorage.setItem(
      preferencesKey(user.id),
      JSON.stringify({ emailNotifications, pushNotifications, marketingEmails, language, autoSave })
    )
    setPrefsSaved(true)
    setTimeout(() => setPrefsSaved(false), 3000)
  }

  // ----- Real stats, computed from this browser's test history -----
  const stats = useMemo(() => {
    try {
      const history = JSON.parse(localStorage.getItem('testHistory') || '[]')
      return computeStats(history)
    } catch {
      return { testsTaken: 0, averageScore: 0, studyStreak: 0, certificatesEarned: 0 }
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarError('')
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please choose an image file.')
      return
    }
    if (file.size > 1_500_000) {
      setAvatarError('Please choose an image smaller than 1.5MB.')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setAvatar(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = async () => {
    setSaveError('')
    if (!formData.fullName.trim()) {
      setSaveError('Full name cannot be empty.')
      return
    }
    setSaving(true)
    try {
      await updateProfile({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        company: formData.company,
        position: formData.position,
        avatar,
      })
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 3000)
    } catch (err) {
      setSaveError(err.message || 'Could not save your changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ----- Security: change password -----
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const handleChangePassword = async () => {
    setPasswordError('')
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }
    setPasswordSaving(true)
    try {
      await changePassword({ currentPassword, newPassword })
      setPasswordSaved(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowPasswordForm(false)
      setTimeout(() => setPasswordSaved(false), 3000)
    } catch (err) {
      setPasswordError(err.message || 'Could not change your password.')
    } finally {
      setPasswordSaving(false)
    }
  }

  // ----- Security: delete account -----
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setDeleteError('')
    setDeleting(true)
    try {
      await deleteAccount({ password: deletePassword })
      navigate('/')
    } catch (err) {
      setDeleteError(err.message || 'Could not delete your account.')
    } finally {
      setDeleting(false)
    }
  }

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  if (!user) return null // ProtectedRoute redirects to /login before this ever shows

  const planInfo = user.plan ? PLAN_LABELS[user.plan] : null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Settings size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
          </div>
        </div>
        {(profileSaved || prefsSaved || passwordSaved) && (
          <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full animate-slide-in">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Saved!</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tests Taken</p>
              <p className="text-2xl font-bold text-gray-900">{stats.testsTaken}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Award size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Study Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.studyStreak} days</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.certificatesEarned}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <Award size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 overflow-x-auto">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              {/* Avatar Section */}
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-200">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      (formData.fullName || user.email || '?')
                        .split(' ')
                        .filter(Boolean)
                        .slice(0, 2)
                        .map(n => n[0].toUpperCase())
                        .join('')
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition">
                    <Camera size={16} className="text-gray-600" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900">{formData.fullName || 'Your name'}</h3>
                  <p className="text-gray-500 text-sm">{formData.position || 'Add your job title'}</p>
                  {user.createdAt && (
                    <p className="text-gray-400 text-xs mt-1">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
                  {avatarError && <p className="text-red-600 text-xs mt-1">{avatarError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={user.provider === 'google'}
                      title={user.provider === 'google' ? 'Managed by your Google account' : undefined}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+44 1234 567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      placeholder="London, UK"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio <span className="text-gray-400 font-normal">({formData.bio.length}/500)</span>
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    maxLength={500}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {saveError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  <AlertCircle size={16} /> {saveError}
                </div>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Moon size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    isDark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BookOpen size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Readable Mode</p>
                    <p className="text-sm text-gray-500">Dyslexia-friendly font with extra letter & line spacing</p>
                  </div>
                </div>
                <button
                  onClick={toggleReadableMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    readableMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      readableMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Globe size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Language</p>
                    <p className="text-sm text-gray-500">Choose your preferred language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="pl">Polski</option>
                  <option value="ro">Română</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <RefreshCw size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Auto-save Progress</p>
                    <p className="text-sm text-gray-500">Automatically save your test progress</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    autoSave ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              {user.provider === 'google' ? (
                <div className="flex items-start gap-3 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm">
                  <Shield size={18} className="mt-0.5 shrink-0" />
                  <p>You sign in with Google, so your password is managed by your Google account.</p>
                </div>
              ) : (
                <div className="py-3">
                  {!showPasswordForm ? (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                      <Lock size={16} /> Change Password
                    </button>
                  ) : (
                    <div className="border border-gray-200 rounded-xl p-4 space-y-3 max-w-md">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 text-sm">Change Password</p>
                        <button onClick={() => { setShowPasswordForm(false); setPasswordError('') }} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </div>
                      <input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="New password (6+ characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      {passwordError && <p className="text-red-600 text-xs">{passwordError}</p>}
                      <button
                        onClick={handleChangePassword}
                        disabled={passwordSaving}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
                      >
                        {passwordSaving && <Loader2 size={14} className="animate-spin" />}
                        Update Password
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">Danger Zone</p>
                    <p className="text-sm text-red-600 mt-1">Once you delete your account, there is no going back.</p>
                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="mt-3 flex items-center gap-2 text-red-600 text-sm font-medium hover:text-red-700 transition"
                      >
                        <Trash2 size={16} /> Delete Account
                      </button>
                    ) : (
                      <div className="mt-3 space-y-2 max-w-md">
                        {user.provider !== 'google' && (
                          <input
                            type="password"
                            placeholder="Confirm your password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                          />
                        )}
                        {deleteError && <p className="text-red-600 text-xs">{deleteError}</p>}
                        <div className="flex gap-2">
                          <button
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-60"
                          >
                            {deleting && <Loader2 size={14} className="animate-spin" />}
                            Yes, permanently delete
                          </button>
                          <button
                            onClick={() => { setShowDeleteConfirm(false); setDeleteError('') }}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm">Current Plan</p>
                    <p className="text-2xl font-bold mt-1">
                      {isPro ? (planInfo?.name || 'Pro') : 'Free'}
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      {isPro ? 'Thanks for being a Pro member!' : 'Upgrade to unlock AI explanations, analytics and more.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{isPro ? (planInfo?.price || '') : '£0'}</p>
                    <p className="text-white/80 text-sm">{isPro ? (planInfo?.period || '') : '/forever'}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  {isPro ? (
                    <button
                      type="button"
                      onClick={handleManageSubscription}
                      disabled={portalLoading}
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition disabled:opacity-60"
                    >
                      {portalLoading ? 'Opening billing portal…' : 'Manage Subscription'}
                    </button>
                  ) : (
                    <Link
                      to="/plans"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Upgrade to Pro
                    </Link>
                  )}
                </div>
                {portalError && (
                  <p className="text-white/90 text-xs mt-2 bg-black/10 rounded-lg px-3 py-2">{portalError}</p>
                )}
              </div>

              {!isPro && (
                <p className="text-sm text-gray-500">
                  No payment method on file yet. Add one when you upgrade to a paid plan.
                </p>
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Mail size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Smartphone size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Get instant alerts on your device</p>
                  </div>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Bell size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Newsletters and special offers</p>
                  </div>
                </div>
                <button
                  onClick={() => setMarketingEmails(!marketingEmails)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    marketingEmails ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                      marketingEmails ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1">
            ← Back to Dashboard
          </Link>
          <button
            onClick={activeTab === 'profile' ? handleSaveProfile : handleSavePreferences}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md disabled:opacity-60 disabled:hover:scale-100"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-red-600 transition mx-auto"
        >
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default SettingsPage

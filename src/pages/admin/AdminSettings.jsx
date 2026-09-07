// pages/admin/AdminSettings.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Loader2, Palette, Check, Megaphone, LayoutGrid } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { SITE_THEMES, DEFAULT_THEME_ID, applyTheme } from '../../lib/siteThemes'
import DASHBOARD_LINK_REGISTRY from '../../lib/dashboardLinkRegistry'

const ANNOUNCEMENT_TYPES = [
  { value: 'info', label: 'Info (blue)' },
  { value: 'success', label: 'Success (green)' },
  { value: 'warning', label: 'Warning (amber)' },
]

const TOGGLE_DEFS = [
  {
    key: 'ecsCardsPageEnabled',
    label: '"Types of ECS Cards" page',
    onText: 'Visible to everyone. Turn this off to hide it from users (admins will still see it).',
    offText: 'Hidden from users right now — they see a locked page. Only admins can see the real page.',
  },
  {
    key: 'mockTestsPageEnabled',
    label: '"ECS Mock Tests" page',
    onText: 'Visible to everyone. Turn this off to hide it from users (admins will still see it).',
    offText: 'Hidden from users right now — they see a locked page. Only admins can see the real page.',
  },
  {
    key: 'blogPageEnabled',
    label: 'Blog page',
    onText: 'The blog is visible to everyone.',
    offText: 'The blog is hidden from users right now. Only admins can see it.',
  },
  {
    key: 'registrationEnabled',
    label: 'New user registration',
    onText: 'Anyone can create a new account.',
    offText: 'Sign-ups are closed — the register page shows a "closed" message. Existing users can still log in.',
  },
  {
    key: 'maintenanceMode',
    label: 'Maintenance mode',
    onText: 'The site is live and working normally.',
    offText: 'The whole site is down for everyone except admins, who keep full access.',
    invertColor: true, // "on" here (maintenance active) should read as a warning, not success
  },
  {
    key: 'blogCardBookingUpsellEnabled',
    label: '"Book Your ECS Card" banner on the blog',
    onText: 'Shown at the bottom of the blog list and every blog post, with benefits, how it works, and how long it takes.',
    offText: 'Hidden — no booking banner shown on the blog right now.',
  },
  {
    key: 'blogTestBookingUpsellEnabled',
    label: '"Book Your ECS Test" banner on the blog',
    onText: 'Shown at the bottom of the blog list and every blog post, with benefits, how it works, and how long it takes — separate from the ECS Card banner above.',
    offText: 'Hidden — no test-booking banner shown on the blog right now.',
  },
  {
    key: 'myCardApplicationLinkEnabled',
    label: '"My Card Application" link on user dashboards',
    onText: 'Shown in every signed-in user\'s dashboard sidebar (under "UK Tools").',
    offText: 'Hidden from every user\'s dashboard sidebar right now — the link won\'t show until you turn this on.',
  },
  {
    key: 'dashboardEcsBookingLinksEnabled',
    label: '"ECS Card" & "ECS Test" links on user dashboards',
    onText: 'Both links are shown together in every signed-in user\'s dashboard sidebar (under "Get Booked"), pointing to the ECS Card and ECS Test booking pages.',
    offText: 'Hidden from every user\'s dashboard right now — neither link shows until you turn this on.',
  },
]

const AdminSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false })
      .then(setSettings)
      .catch(() => setError('Could not load current settings.'))
      .finally(() => setLoading(false))
  }, [])

  const patchSettings = async (patch, savingIndicatorKey) => {
    setSavingKey(savingIndicatorKey)
    setError('')
    try {
      const updated = await apiRequest('/api/admin/settings', { method: 'PATCH', body: patch })
      setSettings(updated)
      if ('siteTheme' in patch) applyTheme(updated.siteTheme)
    } catch (err) {
      setError(err.message || 'Failed to update setting.')
    } finally {
      setSavingKey(null)
    }
  }

  const toggle = (def) => {
    if (!settings) return
    patchSettings({ [def.key]: !settings[def.key] }, def.key)
  }

  const toggleDashboardLink = async (linkKey) => {
    if (!settings) return
    const current = settings.dashboardLinkVisibility || {}
    const isVisible = current[linkKey] !== false
    const nextVisibility = { ...current, [linkKey]: !isVisible }
    await patchSettings({ dashboardLinkVisibility: nextVisibility }, `dashlink:${linkKey}`)
  }

  const dashboardLinksBySection = useMemo(() => {
    const groups = {}
    for (const link of DASHBOARD_LINK_REGISTRY) {
      if (!groups[link.section]) groups[link.section] = []
      groups[link.section].push(link)
    }
    return groups
  }, [])

  // Announcement banner: message/type are edited locally and saved with an
  // explicit button (so we don't fire a save request on every keystroke),
  // while the on/off toggle saves immediately like the other toggles above.
  const [announcementDraft, setAnnouncementDraft] = useState('')
  const [announcementTypeDraft, setAnnouncementTypeDraft] = useState('info')
  useEffect(() => {
    if (settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: syncs the local draft whenever settings (re)load
      setAnnouncementDraft(settings.announcementMessage || '')
      setAnnouncementTypeDraft(settings.announcementType || 'info')
    }
  }, [settings])

  const saveAnnouncement = () => {
    patchSettings({ announcementMessage: announcementDraft, announcementType: announcementTypeDraft }, 'announcementMessage')
  }

  const selectTheme = (themeId) => {
    if (!settings || settings.siteTheme === themeId) return
    patchSettings({ siteTheme: themeId }, `theme:${themeId}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {loading || !settings ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm bg-white p-6 rounded-lg shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading settings...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Site design / colour theme */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Site design</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Pick a colour theme for the whole site — header, buttons, links and highlights update everywhere, for every visitor, as soon as you select one below.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SITE_THEMES.map((theme) => {
                const isSelected = settings.siteTheme === theme.id || (!settings.siteTheme && theme.id === DEFAULT_THEME_ID)
                const isSaving = savingKey === `theme:${theme.id}`
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => selectTheme(theme.id)}
                    disabled={!!savingKey}
                    className={`relative text-left border rounded-xl px-4 py-3 transition disabled:opacity-60 ${
                      isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.shades[600] }} />
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.shades[400] }} />
                      {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 ml-1" />}
                    </div>
                    <p className="text-sm font-medium text-gray-700">{theme.name}</p>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4">{SITE_THEMES.length} designs available. Changing a design does not touch any content — only colours.</p>
          </div>

          {/* Feature toggles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Page & feature controls</h2>
            <p className="text-sm text-gray-500 mb-5">Control what ordinary users can see and do on the site. Admins always keep full access.</p>

            <div className="space-y-3">
              {TOGGLE_DEFS.map((def) => {
                const isOn = !!settings[def.key]
                const isSaving = savingKey === def.key
                // For most toggles, ON = green/good. Maintenance mode is
                // reversed: ON means the site is locked, so show it in amber.
                const activeColor = def.invertColor ? 'bg-amber-500' : 'bg-green-600'
                return (
                  <div key={def.key} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
                    <div className="pr-4">
                      <p className="font-medium text-gray-800">{def.label}</p>
                      <p className="text-sm text-gray-500 mt-1">{isOn ? def.onText : def.offText}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggle(def)}
                      disabled={!!savingKey}
                      aria-pressed={isOn}
                      className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 ${
                        isOn ? activeColor : 'bg-gray-300'
                      }`}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                      ) : (
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                            isOn ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* User dashboard sidebar links */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">User dashboard links</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Decide exactly what shows up in every signed-in user's dashboard sidebar. Turn a link on and every user sees it; turn it off and it disappears from their sidebar (the page itself still works if someone has it bookmarked — this only controls the sidebar link).
            </p>

            <div className="space-y-5">
              {Object.entries(dashboardLinksBySection).map(([section, links]) => (
                <div key={section}>
                  <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">{section.toUpperCase()}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {links.map((link) => {
                      const isOn = (settings.dashboardLinkVisibility || {})[link.key] !== false
                      const isSaving = savingKey === `dashlink:${link.key}`
                      return (
                        <div key={link.key} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{link.title}</p>
                            <p className="text-xs text-gray-400 font-mono">{link.path}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleDashboardLink(link.key)}
                            disabled={!!savingKey}
                            aria-pressed={isOn}
                            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 ${isOn ? 'bg-green-600' : 'bg-gray-300'}`}
                          >
                            {isSaving ? (
                              <Loader2 className="w-3 h-3 animate-spin text-white mx-auto" />
                            ) : (
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sitewide announcement banner */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Megaphone className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Announcement banner</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Show a short message just under the header on every page — e.g. new CITB test slots, a holiday closure, or a promo. Turn it off any time.
            </p>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4 mb-4">
              <div className="pr-4">
                <p className="font-medium text-gray-800">Banner visibility</p>
                <p className="text-sm text-gray-500 mt-1">
                  {settings.announcementEnabled ? 'The banner is live for all visitors right now.' : 'The banner is hidden. Turn it on once your message is ready below.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => patchSettings({ announcementEnabled: !settings.announcementEnabled }, 'announcementEnabled')}
                disabled={!!savingKey}
                aria-pressed={!!settings.announcementEnabled}
                className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 ${
                  settings.announcementEnabled ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                {savingKey === 'announcementEnabled' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                ) : (
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      settings.announcementEnabled ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                )}
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={announcementDraft}
              onChange={(e) => setAnnouncementDraft(e.target.value)}
              rows={2}
              maxLength={200}
              placeholder="e.g. CITB Health, Safety & Environment test slots are open for March — book now."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-sm font-medium text-gray-700">Style:</label>
              <select
                value={announcementTypeDraft}
                onChange={(e) => setAnnouncementTypeDraft(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                {ANNOUNCEMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={saveAnnouncement}
                disabled={savingKey === 'announcementMessage'}
                className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
              >
                {savingKey === 'announcementMessage' && <Loader2 className="w-4 h-4 animate-spin" />}
                Save message
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">{announcementDraft.length}/200 characters. Saving the message doesn't turn the banner on by itself — use the toggle above.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSettings

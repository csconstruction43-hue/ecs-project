// pages/admin/AdminFestivals.jsx
import React, { useEffect, useState } from 'react'
import { Loader2, PartyPopper, Check } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import ukFestivals from '../../data/ukFestivals'
import { getActiveFestival, festivalBannerStyle, FESTIVAL_DESIGNS } from '../../lib/festivals'

const AdminFestivals = () => {
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
    } catch (err) {
      setError(err.message || 'Failed to update setting.')
    } finally {
      setSavingKey(null)
    }
  }

  const toggleMaster = (key) => {
    if (!settings) return
    patchSettings({ [key]: !settings[key] }, key)
  }

  const selectDesign = (designId) => {
    if (!settings || settings.festivalBannerDesign === designId) return
    patchSettings({ festivalBannerDesign: designId }, `design:${designId}`)
  }

  const toggleFestival = (festivalId) => {
    if (!settings) return
    const disabled = new Set(settings.festivalDisabledIds || [])
    if (disabled.has(festivalId)) disabled.delete(festivalId)
    else disabled.add(festivalId)
    patchSettings({ festivalDisabledIds: [...disabled] }, `festival:${festivalId}`)
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm bg-white p-6 rounded-lg shadow-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading settings...
      </div>
    )
  }

  const activeFestival = getActiveFestival(new Date(), settings.festivalDisabledIds)
  const disabledIds = new Set(settings.festivalDisabledIds || [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><PartyPopper className="w-6 h-6 text-gray-500" /> Festivals</h1>
      <p className="text-sm text-gray-500 mb-6">
        Show a greeting banner sitewide (and a bigger one on the home page) whenever a UK festival is happening — e.g. "Happy Diwali!" on Diwali.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>
      )}

      {/* Today's status */}
      <div className={`rounded-xl px-4 py-4 mb-6 border ${activeFestival ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
        {activeFestival ? (
          <p className="text-sm text-indigo-900">
            <span className="text-lg mr-1">{activeFestival.emoji}</span>
            <span className="font-semibold">{activeFestival.name}</span> is active today — the banner is showing now (if enabled below).
          </p>
        ) : (
          <p className="text-sm text-gray-500">No festival is active today. The banner will appear automatically on the next one.</p>
        )}
      </div>

      {/* Master toggles */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Where it shows</h2>
        <p className="text-sm text-gray-500 mb-5">Control the sitewide banner and the home page banner independently.</p>

        <div className="space-y-3">
          {[
            { key: 'festivalBannerEnabled', label: 'Sitewide banner', onText: 'Shown under the header on every page during an active festival.', offText: 'Hidden on all pages.' },
            { key: 'festivalHomeBannerEnabled', label: 'Home page banner (pro design)', onText: 'A bigger, more decorative banner is shown near the top of the home page.', offText: 'Hidden on the home page.' },
          ].map((def) => {
            const isOn = !!settings[def.key]
            const isSaving = savingKey === def.key
            return (
              <div key={def.key} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
                <div className="pr-4">
                  <p className="font-medium text-gray-800">{def.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{isOn ? def.onText : def.offText}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleMaster(def.key)}
                  disabled={!!savingKey}
                  aria-pressed={isOn}
                  className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 ${isOn ? 'bg-green-600' : 'bg-gray-300'}`}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                  ) : (
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${isOn ? 'translate-x-8' : 'translate-x-1'}`} />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Design style */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Banner design</h2>
        <p className="text-sm text-gray-500 mb-5">Pick the visual style used for every festival banner. Each festival keeps its own colour — this only changes how it's presented.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FESTIVAL_DESIGNS.map((d) => {
            const isSelected = settings.festivalBannerDesign === d.id
            const isSaving = savingKey === `design:${d.id}`
            const preview = festivalBannerStyle({ colorFrom: '#6366f1', colorTo: '#a855f7' }, d.id)
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => selectDesign(d.id)}
                disabled={!!savingKey}
                className={`relative text-left border rounded-xl px-4 py-3 transition disabled:opacity-60 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {isSelected && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <div
                  className="h-8 rounded-lg mb-2 flex items-center justify-center"
                  style={{ background: preview.background, border: preview.border, boxShadow: preview.boxShadow }}
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />}
                </div>
                <p className="text-sm font-medium text-gray-700">{d.label}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Individual festivals */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Festivals</h2>
        <p className="text-sm text-gray-500 mb-5">Turn off any individual festival you don't want the banner to appear for — everything else stays on.</p>

        <div className="space-y-2">
          {ukFestivals.map((f) => {
            const isOn = !disabledIds.has(f.id)
            const isSaving = savingKey === `festival:${f.id}`
            return (
              <div key={f.id} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3 pr-4">
                  <span className="text-xl shrink-0" aria-hidden="true">{f.emoji}</span>
                  <div>
                    <p className="font-medium text-gray-800">{f.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(2000, f.month - 1, f.day).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                      {f.days > 1 ? ` · ${f.days} days` : ''}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFestival(f.id)}
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
    </div>
  )
}

export default AdminFestivals

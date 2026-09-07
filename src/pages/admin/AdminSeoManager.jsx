// pages/admin/AdminSeoManager.jsx
// Two things live here: (1) sitewide SEO defaults — a fallback description,
// OG image, Twitter handle, Google Search Console verification code, and a
// sitewide "stop indexing" switch for staging — saved via the same settings
// blob as Admin > Settings (GET/PATCH /api/*/settings). (2) a read-only
// snapshot of the live sitemap.xml, fetched straight from the site, so you
// can sanity-check it without opening a separate tool.
//
// Note: per-page title/description/keywords still come from each page's own
// <Seo /> component — these are fallback/reference values, not overrides.
import React, { useEffect, useState } from 'react'
import { Globe2, Loader2, Save, CheckCircle2, Map, ExternalLink, AlertTriangle } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { SITE_URL } from '../../components/Seo'

const AdminSeoManager = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [siteDescription, setSiteDescription] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [googleVerification, setGoogleVerification] = useState('')
  const [robotsDisabled, setRobotsDisabled] = useState(false)

  const [sitemap, setSitemap] = useState(null)
  const [sitemapError, setSitemapError] = useState('')
  const [sitemapLoading, setSitemapLoading] = useState(true)

  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => {
        setSettings(data)
        setSiteDescription(data.seoSiteDescription || '')
        setOgImage(data.seoDefaultOgImage || '')
        setTwitterHandle(data.seoTwitterHandle || '')
        setGoogleVerification(data.seoGoogleVerification || '')
        setRobotsDisabled(!!data.seoRobotsIndexingDisabled)
      })
      .catch(() => setError('Could not load current SEO settings.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off sitemap fetch on mount
    setSitemapLoading(true)
    fetch('/sitemap.xml')
      .then((res) => {
        if (!res.ok) throw new Error(`Sitemap returned ${res.status}`)
        return res.text()
      })
      .then((xml) => {
        const doc = new window.DOMParser().parseFromString(xml, 'text/xml')
        const parseError = doc.querySelector('parsererror')
        if (parseError) throw new Error('Sitemap is not valid XML.')
        const urls = Array.from(doc.querySelectorAll('url > loc')).map((el) => el.textContent)
        setSitemap({ count: urls.length, urls: urls.slice(0, 25) })
      })
      .catch((err) => setSitemapError(err.message || 'Could not load /sitemap.xml.'))
      .finally(() => setSitemapLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const updated = await apiRequest('/api/admin/settings', {
        method: 'PATCH',
        body: {
          seoSiteDescription: siteDescription,
          seoDefaultOgImage: ogImage,
          seoTwitterHandle: twitterHandle,
          seoGoogleVerification: googleVerification,
          seoRobotsIndexingDisabled: robotsDisabled,
        },
      })
      setSettings(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || 'Could not save SEO settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <Globe2 className="text-blue-600" size={24} />
        SEO Manager
      </h1>
      <p className="text-sm text-gray-500 mb-6">Sitewide SEO defaults and a live snapshot of your sitemap. Per-page titles and descriptions are still set on each page itself.</p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}

      {loading || !settings ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm bg-white p-6 rounded-lg shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sitewide defaults */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Sitewide defaults</h2>
            <p className="text-xs text-gray-400 mb-4">Used as fallback reference values — most pages already set their own via the Seo component.</p>

            <label className="block text-sm font-medium text-gray-700 mb-1">Default meta description</label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="Used when a page doesn't set its own description."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Default OG image path</label>
            <input
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="/og-default.jpg"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X handle</label>
            <input
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="@ecsprep"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Google Search Console verification code</label>
            <input
              value={googleVerification}
              onChange={(e) => setGoogleVerification(e.target.value)}
              placeholder="The content= value Google gives you, not the whole tag"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-1"
            />
            <p className="text-xs text-gray-400 mb-4">When set, this is injected sitewide as a &lt;meta name="google-site-verification"&gt; tag automatically.</p>

            <label className="flex items-start gap-2 mb-5 cursor-pointer">
              <input type="checkbox" checked={robotsDisabled} onChange={(e) => setRobotsDisabled(e.target.checked)} className="mt-1" />
              <span className="text-sm text-gray-700">
                <strong>Stop search engines indexing the whole site</strong>
                <br />
                <span className="text-xs text-gray-500">Forces noindex,nofollow on every page — use this on a staging copy, not production.</span>
              </span>
            </label>

            <button
              onClick={save}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save
            </button>
            {saved && <span className="ml-3 text-sm text-green-700 inline-flex items-center gap-1"><CheckCircle2 size={14} /> Saved</span>}
          </div>

          {/* Sitemap status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Map size={17} className="text-gray-500" /> Sitemap status
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Live snapshot of <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 inline-flex items-center gap-0.5">/sitemap.xml <ExternalLink size={11} /></a>, fetched just now.
            </p>

            {sitemapLoading ? (
              <div className="flex items-center gap-2 text-gray-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Checking sitemap...</div>
            ) : sitemapError ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" /> {sitemapError}
              </div>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm mb-4">
                  Sitemap loaded successfully — <strong>{sitemap.count}</strong> URL{sitemap.count === 1 ? '' : 's'} found.
                </div>
                <p className="text-xs text-gray-500 mb-2">First {sitemap.urls.length} entries:</p>
                <div className="max-h-80 overflow-y-auto border border-gray-100 rounded-lg divide-y divide-gray-50">
                  {sitemap.urls.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 truncate"
                    >
                      {url.replace(SITE_URL, '')}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSeoManager

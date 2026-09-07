// components/SiteThemeLoader.jsx
// Fetches the site-wide colour theme an admin picked in Admin > Settings
// and applies it for every visitor. Also injects the Google Search Console
// verification tag (if an admin has set one in Admin > SEO Manager), and
// stashes the rest of the public settings on `window.__SITE_SEO__` so the
// <Seo /> component can apply the sitewide "stop indexing everything"
// switch without needing its own network round-trip on every page.
// Renders nothing — it just injects a stylesheet + a couple of meta tags.
import { useEffect } from 'react'
import { apiRequest } from '../lib/api'
import { applyTheme, DEFAULT_THEME_ID } from '../lib/siteThemes'

function upsertVerificationMeta(content) {
  const existing = document.head.querySelector('meta[name="google-site-verification"]')
  if (!content) {
    if (existing) existing.remove()
    return
  }
  const el = existing || document.createElement('meta')
  el.setAttribute('name', 'google-site-verification')
  el.setAttribute('content', content)
  if (!existing) document.head.appendChild(el)
}

export default function SiteThemeLoader() {
  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => {
        applyTheme(data.siteTheme || DEFAULT_THEME_ID)
        upsertVerificationMeta(data.seoGoogleVerification)
        window.__SITE_SEO__ = {
          robotsDisabled: !!data.seoRobotsIndexingDisabled,
          defaultDescription: data.seoSiteDescription || '',
          defaultOgImage: data.seoDefaultOgImage || '',
          twitterHandle: data.seoTwitterHandle || '',
        }
      })
      .catch(() => applyTheme(DEFAULT_THEME_ID))
  }, [])

  return null
}

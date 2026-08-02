// components/Seo.jsx
// Lightweight, dependency-free SEO helper. Sets the document title, meta
// description, canonical link, Open Graph / Twitter tags, and injects
// JSON-LD structured data — the same signals search engines AND answer
// engines (Google AI Overviews, ChatGPT Search, Perplexity, Gemini, Bing
// Copilot) use to understand and quote a page.
//
// IMPORTANT: replace SITE_URL below with your real production domain
// before going live — canonical URLs and JSON-LD "url" fields depend on it.
import { useEffect } from 'react'

export const SITE_URL = 'https://www.electricianprep.co.uk'
export const SITE_NAME = 'ECSPrep'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * <Seo
 *   title="ECS Green Card Mock Test 2026 | Free Practice Questions"
 *   description="..."
 *   path="/ecs-green-card-mock-test"
 *   image="/og-green-card.jpg"
 *   jsonLd={[{ '@type': 'FAQPage', ... }]}
 * />
 */
function Seo({ title, description, path = '/', image, keywords, jsonLd = [], noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title}` : SITE_NAME
    const url = `${SITE_URL}${path}`
    const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-default.jpg`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)

    // Open Graph (Facebook, LinkedIn, WhatsApp previews, and used by many
    // AI crawlers as a fallback for title/description/image)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)

    // Twitter / X card
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    // JSON-LD structured data — remove any from a previous page first,
    // then add whatever this page passed in.
    document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove())
    jsonLd.forEach((data) => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.setAttribute('data-seo-jsonld', 'true')
      el.textContent = JSON.stringify(data)
      document.head.appendChild(el)
    })

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, keywords, JSON.stringify(jsonLd), noindex])

  return null
}

// ---------- Reusable JSON-LD builders ----------

export function articleSchema({ headline, description, datePublished, dateModified, author, path, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Organization', name: author || SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-default.jpg`,
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(items) {
  // items: [{ name: 'Home', path: '/' }, { name: 'Mock Tests', path: '/mock-test' }]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function quizSchema({ name, description, numberOfQuestions, timeRequired }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name,
    description,
    about: 'ECS / ECS Health, Safety and Environment (HS&E) Test',
    educationalLevel: 'Professional certification',
    numberOfQuestions,
    timeRequired,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Online ECS / ECS mock test practice platform for UK construction workers.',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    sameAs: [
      // TODO: add your real social profile URLs here, e.g.
      // 'https://www.facebook.com/yourpage',
      // 'https://www.instagram.com/yourpage',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/mock-test?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export default Seo

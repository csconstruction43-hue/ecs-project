// pages/DynamicPage.jsx
// Renders any page an admin created from Admin → Pages (see
// AdminPages.jsx / server /api/pages/:slug), at /page/<slug>. This is what
// lets an admin add a brand-new page to the site with no code change.
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Seo from '../components/Seo'
import PageLoader from '../components/PageLoader'
import { apiRequest } from '../lib/api'

function DynamicPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load whenever the slug changes
    setLoading(true)
    setNotFound(false)
    apiRequest(`/api/pages/${slug}`, { auth: false })
      .then((data) => { if (!cancelled) setPage(data.page) })
      .catch(() => { if (!cancelled) setNotFound(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  if (loading) return <PageLoader />

  if (notFound || !page) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Seo title="Page not found | ECSPrep" path={`/page/${slug}`} noindex />
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <Link to="/" className="text-green-600">← Back home</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Seo title={page.metaTitle || page.title} description={page.metaDescription} path={`/page/${page.slug}`} />
      <article className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div
          className="prose max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline"
          // Sanitized even though only admins can author this content — a
          // defence-in-depth measure so a compromised/shared admin login
          // can't be used to inject scripts that run in every visitor's browser.
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content || '') }}
        />
      </article>
    </div>
  )
}

export default DynamicPage

import React, { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import BlogProUpsell from '../components/BlogProUpsell'
import BlogCardBookingUpsell from '../components/BlogCardBookingUpsell'
import BlogTestBookingUpsell from '../components/BlogTestBookingUpsell'
import { Link } from 'react-router-dom'
import { apiRequest } from '../lib/api'
import { fetchBlogMeta, mergeSortedBlogPosts } from '../lib/blogStore'
import { useAuth } from '../context/AuthContext'
import PageDisabledLock from '../components/PageDisabledLock'
import PageLoader from '../components/PageLoader'

const POSTS_PER_PAGE = 13

function BlogPage() {
  const { isAdmin } = useAuth()
  // Static posts (src/data/blogPosts.js) merged with anything an admin has
  // added or removed from Admin → Blog (see lib/blogStore.js).
  const [blogPosts, setBlogPosts] = useState([])

  // Admins can hide the blog from regular users via Admin > Settings.
  const [pageEnabled, setPageEnabled] = useState(true)
  const [checkingAccess, setCheckingAccess] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedPosts = blogPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  )

  const goToPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false })
      .then((data) => setPageEnabled(data.blogPageEnabled !== false))
      .catch(() => setPageEnabled(true))
      .finally(() => setCheckingAccess(false))
  }, [])

  useEffect(() => {
    fetchBlogMeta().then((meta) => setBlogPosts(mergeSortedBlogPosts(meta)))
  }, [])

  if (checkingAccess) {
    return <PageLoader />
  }

  if (!pageEnabled && !isAdmin) {
    return (
      <PageDisabledLock
        title="Blog"
        message="The blog has been temporarily disabled by the site admin. Please check back later."
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {!pageEnabled && isAdmin && (
        <div className="bg-amber-100 border border-amber-300 text-amber-800 text-sm text-center py-2 px-4 rounded-lg mb-6">
          🔒 The blog is currently hidden from regular users. You can see it because you're an admin. Turn it back on in Admin → Settings.
        </div>
      )}
      <Seo title="ECS Test Blog | Tips, Guides & Updates for 2026" description="Guides and tips to help you pass your ECS / ECS test first time: study strategies, syllabus updates, and card-type explainers." path="/blog" />
      <h1 className="text-4xl font-bold text-center mb-4">ECS Blog</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Latest news, tips, and guides to help you pass your ECS test
      </p>

      <BlogProUpsell />
      <BlogCardBookingUpsell />
      <BlogTestBookingUpsell />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPosts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
            <div className="text-sm text-green-600 mb-2">{post.date} · {post.readTime}</div>
            <h2 className="text-xl font-bold mb-2 hover:text-green-600 transition">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className="inline-block mt-3 text-green-600 font-medium">Read more →</span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition disabled:text-gray-300 disabled:border-gray-100 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition disabled:text-gray-300 disabled:border-gray-100 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogPage

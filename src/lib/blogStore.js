// lib/blogStore.js
// Merges the ~200 hard-coded posts in src/data/blogPosts.js with posts an
// admin has created/deleted from Admin → Blog. Two things can differ from
// the static file at any time:
//   - customPosts: brand-new posts an admin wrote, stored in the DB
//   - hiddenSlugs: static posts an admin "deleted" — since the static file
//     can't be edited at runtime, deleting one just hides its slug
// Both come from the public GET /api/blog-meta endpoint. Every page that
// lists or looks up blog posts should go through the helpers here instead
// of importing src/data/blogPosts.js directly, so admin changes actually
// show up on the site.
import { blogPosts as staticPosts, getPostBySlug as getStaticPostBySlug } from '../data/blogPosts'
import { apiRequest } from './api'

export async function fetchBlogMeta() {
  try {
    const data = await apiRequest('/api/blog-meta', { auth: false })
    return { customPosts: data.customPosts || [], hiddenSlugs: data.hiddenSlugs || [] }
  } catch {
    // If the backend is unreachable, fall back to showing just the static
    // posts rather than breaking the blog entirely.
    return { customPosts: [], hiddenSlugs: [] }
  }
}

function sortNewestFirst(posts) {
  return [...posts].sort((a, b) => new Date(b.isoDate || b.date) - new Date(a.isoDate || a.date))
}

export function mergeSortedBlogPosts({ customPosts = [], hiddenSlugs = [] } = {}) {
  const visibleStatic = staticPosts.filter((p) => !hiddenSlugs.includes(p.slug))
  return sortNewestFirst([...visibleStatic, ...customPosts])
}

export function findMergedPostBySlug(slug, { customPosts = [], hiddenSlugs = [] } = {}) {
  const custom = customPosts.find((p) => p.slug === slug)
  if (custom) return custom
  if (hiddenSlugs.includes(slug)) return null
  return getStaticPostBySlug(slug) || null
}

// Same "shared tags first" logic as getRelatedPosts in data/blogPosts.js,
// but works over the merged list (static + custom) passed in.
export function getMergedRelatedPosts(post, allPosts, count = 3) {
  const others = allPosts.filter((p) => p.slug !== post.slug)
  const seed = post.id || 0
  const shared = (p) => (p.tags || []).filter((t) => post.tags?.includes(t)).length
  const withScores = others
    .map((p, i) => ({ p, score: shared(p), order: (i + seed) % Math.max(others.length, 1) }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
  return withScores.slice(0, count).map((x) => x.p)
}

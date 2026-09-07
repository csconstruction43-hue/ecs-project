// pages/admin/AdminBlog.jsx
// Blog Management — lists every post shown on the public /blog (the ~200
// static posts from src/data/blogPosts.js *and* any posts an admin has
// written from here), and lets an admin:
//   - write a brand-new blog post (stored in the DB via server/store.js)
//   - edit or delete any post THEY wrote
//   - "delete" (hide) any of the static posts too — the static file can't
//     be edited at runtime, so hiding just adds its slug to a hidden list
//     that the public blog pages filter out (see src/lib/blogStore.js)
import React, { useEffect, useMemo, useState } from 'react'
import {
  Newspaper, Plus, Trash2, Pencil, Search, Eye, EyeOff, ChevronLeft, Save, ExternalLink,
} from 'lucide-react'
import { apiRequest } from '../../lib/api'
import { getSortedBlogPosts } from '../../data/blogPosts'

const emptyForm = () => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'General',
  tags: '',
  image: '',
  author: 'ECSPrep Team',
  metaTitle: '',
  metaDescription: '',
  published: true,
})

const slugify = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function AdminBlog() {
  const [customPosts, setCustomPosts] = useState([])
  const [hiddenSlugs, setHiddenSlugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'builder'
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'custom' | 'static' | 'hidden'
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const staticPosts = useMemo(() => getSortedBlogPosts(), [])

  const load = async () => {
    setLoading(true)
    try {
      const { posts, hiddenSlugs: hidden } = await apiRequest('/api/admin/blog-posts')
      setCustomPosts(posts)
      setHiddenSlugs(hidden)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const allPosts = useMemo(() => {
    const staticRows = staticPosts.map((p) => ({ ...p, isCustom: false, isHidden: hiddenSlugs.includes(p.slug) }))
    const customRows = customPosts.map((p) => ({ ...p, isCustom: true, isHidden: false }))
    return [...customRows, ...staticRows]
  }, [staticPosts, customPosts, hiddenSlugs])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allPosts.filter((p) => {
      if (filter === 'custom' && !p.isCustom) return false
      if (filter === 'static' && p.isCustom) return false
      if (filter === 'hidden' && !p.isHidden) return false
      if (!q) return true
      return p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    })
  }, [allPosts, search, filter])

  const startNew = () => {
    setForm(emptyForm())
    setEditingId(null)
    setSlugTouched(false)
    setError('')
    setView('builder')
  }

  const startEdit = (p) => {
    setForm({
      title: p.title || '',
      slug: p.slug || '',
      excerpt: p.excerpt || '',
      content: p.content || '',
      category: p.category || 'General',
      tags: (p.tags || []).join(', '),
      image: p.image || '',
      author: p.author || 'ECSPrep Team',
      metaTitle: p.metaTitle || '',
      metaDescription: p.metaDescription || '',
      published: p.published !== false,
    })
    setEditingId(p.id)
    setSlugTouched(true)
    setError('')
    setView('builder')
  }

  const onTitleChange = (title) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }))
  }

  const save = async () => {
    setError('')
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.slug.trim()) { setError('Slug is required.'); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }
      if (editingId) {
        const { post } = await apiRequest(`/api/admin/blog-posts/${editingId}`, { method: 'PATCH', body: payload })
        setCustomPosts((list) => list.map((p) => (p.id === post.id ? post : p)))
      } else {
        const { post } = await apiRequest('/api/admin/blog-posts', { method: 'POST', body: payload })
        setCustomPosts((list) => [post, ...list])
      }
      setView('list')
    } catch (e) {
      setError(e.message || 'Could not save the post.')
    } finally {
      setSaving(false)
    }
  }

  const deleteCustomPost = async (p) => {
    if (!confirm(`Delete "${p.title}"? This can't be undone.`)) return
    try {
      await apiRequest(`/api/admin/blog-posts/${p.id}`, { method: 'DELETE' })
      setCustomPosts((list) => list.filter((x) => x.id !== p.id))
    } catch (e) {
      alert(e.message || 'Could not delete the post.')
    }
  }

  const toggleHideStatic = async (p) => {
    const hidden = !p.isHidden
    if (hidden && !confirm(`Remove "${p.title}" from the public blog? You can bring it back any time from the Hidden filter.`)) return
    try {
      const { hiddenSlugs: next } = await apiRequest('/api/admin/blog-posts/hide-static', { method: 'POST', body: { slug: p.slug, hidden } })
      setHiddenSlugs(next)
    } catch (e) {
      alert(e.message || 'Could not update the post.')
    }
  }

  if (view === 'builder') {
    return (
      <div className="max-w-3xl">
        <button onClick={() => setView('list')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4">
          <ChevronLeft size={16} /> Back to all posts
        </button>
        <h1 className="text-2xl font-bold mb-6">{editingId ? 'Edit Post' : 'New Blog Post'}</h1>

        {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</div>}

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => onTitleChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="How to Pass the ECS Test First Time" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL: /blog/…)</label>
            <input value={form.slug} onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })) }} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" placeholder="how-to-pass-ecs-test" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="ECS test, revision, exam tips" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover image URL (optional)</label>
            <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="https://…" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="One or two sentences shown on the blog listing." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={12} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" placeholder="<p>Write the article here. Basic HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt; are supported.</p>" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta title (SEO, optional)</label>
              <input value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta description (SEO, optional)</label>
              <input value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Published (visible on the public blog)
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50">
              <Save size={16} /> {saving ? 'Saving…' : 'Save Post'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Newspaper size={22} /> Blog Management</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts…" className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[
            ['all', 'All'],
            ['custom', 'Written here'],
            ['static', 'Built-in'],
            ['hidden', 'Hidden'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filter === key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        {allPosts.length} total posts · {customPosts.length} written here · {hiddenSlugs.length} hidden
      </p>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={`${p.isCustom ? 'c' : 's'}_${p.id}`} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-400 font-mono">/blog/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.category || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.isCustom ? 'text-blue-700 bg-blue-50' : 'text-gray-600 bg-gray-100'}`}>
                      {p.isCustom ? 'Written here' : 'Built-in'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.isHidden || p.published === false ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full"><EyeOff size={12} /> Hidden</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full"><Eye size={12} /> Live</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" title="View on site" className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                        <ExternalLink size={16} />
                      </a>
                      {p.isCustom ? (
                        <>
                          <button onClick={() => startEdit(p)} title="Edit" className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => deleteCustomPost(p)} title="Delete" className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => toggleHideStatic(p)}
                          title={p.isHidden ? 'Show on site' : 'Remove from site'}
                          className={`p-2 rounded-lg hover:bg-gray-100 ${p.isHidden ? 'text-gray-400 hover:text-green-600' : 'text-gray-400 hover:text-red-600'}`}
                        >
                          {p.isHidden ? <Eye size={16} /> : <Trash2 size={16} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No posts match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// pages/admin/AdminPages.jsx
// Pages Manager — a lightweight CMS so an admin can add ANY new page to
// the site without a code change: give it a title, a slug and some HTML
// content, and it goes live at /page/<slug>. Backed by server/store.js
// (`pages` table) via /api/admin/pages*.
import React, { useEffect, useMemo, useState } from 'react'
import { FileText, Plus, Trash2, Pencil, Search, Eye, EyeOff, ChevronLeft, Save, ExternalLink, Globe, Loader2 } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import PAGE_REGISTRY from '../../lib/pageRegistry'

const emptyForm = () => ({ title: '', slug: '', content: '', metaTitle: '', metaDescription: '', published: true })
const slugify = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function AdminPages() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  // --- Built-in "site pages" visibility (About, Contact, Pricing, etc.) ---
  const [siteSettings, setSiteSettings] = useState(null)
  const [siteSavingKey, setSiteSavingKey] = useState(null)

  useEffect(() => {
    apiRequest('/api/settings/public', { auth: false }).then(setSiteSettings).catch(() => {})
  }, [])

  const togglePageVisibility = async (pageKey) => {
    if (!siteSettings) return
    const current = siteSettings.pageVisibility || {}
    const isVisible = current[pageKey] !== false
    const nextPageVisibility = { ...current, [pageKey]: !isVisible }
    setSiteSavingKey(pageKey)
    try {
      const updated = await apiRequest('/api/admin/settings', { method: 'PATCH', body: { pageVisibility: nextPageVisibility } })
      setSiteSettings(updated)
    } catch (e) {
      alert(e.message || 'Could not update page visibility.')
    } finally {
      setSiteSavingKey(null)
    }
  }

  const load = async () => {
    setLoading(true)
    try {
      const { pages: list } = await apiRequest('/api/admin/pages')
      setPages(list)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: kicks off data load on mount
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((p) => p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q))
  }, [pages, search])

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
      content: p.content || '',
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
      if (editingId) {
        const { page } = await apiRequest(`/api/admin/pages/${editingId}`, { method: 'PATCH', body: form })
        setPages((list) => list.map((p) => (p.id === page.id ? page : p)))
      } else {
        const { page } = await apiRequest('/api/admin/pages', { method: 'POST', body: form })
        setPages((list) => [page, ...list])
      }
      setView('list')
    } catch (e) {
      setError(e.message || 'Could not save the page.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (p) => {
    if (!confirm(`Delete the page "${p.title}"? This can't be undone.`)) return
    try {
      await apiRequest(`/api/admin/pages/${p.id}`, { method: 'DELETE' })
      setPages((list) => list.filter((x) => x.id !== p.id))
    } catch (e) {
      alert(e.message || 'Could not delete the page.')
    }
  }

  const togglePublished = async (p) => {
    try {
      const { page } = await apiRequest(`/api/admin/pages/${p.id}`, { method: 'PATCH', body: { published: !(p.published !== false) } })
      setPages((list) => list.map((x) => (x.id === page.id ? page : x)))
    } catch (e) {
      alert(e.message || 'Could not update the page.')
    }
  }

  if (view === 'builder') {
    return (
      <div className="max-w-3xl">
        <button onClick={() => setView('list')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4">
          <ChevronLeft size={16} /> Back to all pages
        </button>
        <h1 className="text-2xl font-bold mb-6">{editingId ? 'Edit Page' : 'New Page'}</h1>

        {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</div>}

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page title</label>
            <input value={form.title} onChange={(e) => onTitleChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g. Apprenticeship Partners" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL: /page/…)</label>
            <input value={form.slug} onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })) }} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" placeholder="apprenticeship-partners" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={14} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" placeholder="<p>Write the page content here. Basic HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt; are supported.</p>" />
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
            Published (live on the site)
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50">
              <Save size={16} /> {saving ? 'Saving…' : 'Save Page'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Built-in site pages — hide/show any of them, full admin control */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2"><Globe size={18} className="text-gray-500" /> Site pages</h2>
        <p className="text-sm text-gray-500 mb-4">Hide or show any of the site's built-in pages. Hidden pages show a "temporarily disabled" message to regular users — admins always still see them.</p>
        {!siteSettings ? (
          <div className="text-sm text-gray-400 py-4">Loading…</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-2">
            {PAGE_REGISTRY.map((pg) => {
              const isOn = (siteSettings.pageVisibility || {})[pg.key] !== false
              const isSaving = siteSavingKey === pg.key
              return (
                <div key={pg.key} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{pg.title}</p>
                    <p className="text-xs text-gray-400 font-mono">{pg.path}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePageVisibility(pg.key)}
                    disabled={!!siteSavingKey}
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
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><FileText size={22} /> Custom pages</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
          <Plus size={16} /> New Page
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Create any extra page for the site — it goes live at <span className="font-mono">/page/&lt;slug&gt;</span>. No code changes needed.
      </p>

      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages…" className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-400 font-mono">/page/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublished(p)} className="inline-flex">
                      {p.published !== false ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full"><Eye size={12} /> Published</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full"><EyeOff size={12} /> Draft</span>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/page/${p.slug}`} target="_blank" rel="noreferrer" title="View on site" className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                        <ExternalLink size={16} />
                      </a>
                      <button onClick={() => startEdit(p)} title="Edit" className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => remove(p)} title="Delete" className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-10 text-center text-gray-400">No pages yet — click "New Page" to add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

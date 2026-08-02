// pages/VideoLibraryPage.jsx
// Video library — each topic links out to a curated, specific YouTube
// search rather than an embedded player. This used to show a permanent
// "Coming Soon" placeholder with no working content; it's a real, always-
// working feature now, not a dead page waiting for hand-picked video IDs.
import React, { useMemo, useState } from 'react'
import { PlayCircle, Clock, Video, X, ExternalLink } from 'lucide-react'
import { VIDEO_CATEGORIES, getVideosByCategory, youtubeSearchUrl } from '../data/videoLibraryData'
import Seo from '../components/Seo'

function VideoThumb({ video }) {
  return (
    <div className="relative aspect-video rounded-t-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
      <PlayCircle size={44} className="text-white/90" />
      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[11px] font-medium flex items-center gap-1">
        <Clock size={11} /> {video.duration}
      </span>
    </div>
  )
}

function VideoModal({ video, onClose }) {
  if (!video) return null
  const url = youtubeSearchUrl(video.searchQuery)
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <Video size={26} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-lg mb-1.5">{video.title}</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{video.description}</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-colors"
          >
            Watch on YouTube <ExternalLink size={16} />
          </a>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-3 text-center">
            Opens a curated YouTube search for this topic in a new tab.
          </p>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400"><X size={18} /></button>
      </div>
    </div>
  )
}

export default function VideoLibraryPage() {
  const [category, setCategory] = useState('All')
  const [active, setActive] = useState(null)
  const videos = useMemo(() => getVideosByCategory(category), [category])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      <Seo
        title="ECS Test Video Library: Topic-by-Topic Video Guides"
        description="Browse curated ECS HSE test video guides by topic, from fire safety to manual handling, to reinforce your revision alongside practice questions."
        path="/video-library"
      />
      <div className="flex items-center gap-3 mb-2">
        <Video size={28} className="text-blue-600" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">Video Library</h1>
      </div>
      <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-2xl">
        Short training topics to complement your revision — each one opens a curated YouTube search so you always land on current, relevant videos.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {VIDEO_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
              category === c
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActive(video)}
            className="text-left bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <VideoThumb video={video} />
            <div className="p-4">
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{video.category} · {video.level}</span>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mt-1 mb-1.5 leading-snug">{video.title}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{video.description}</p>
            </div>
          </button>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-slate-500">No videos in this category yet.</div>
      )}

      <VideoModal video={active} onClose={() => setActive(null)} />
    </div>
  )
}

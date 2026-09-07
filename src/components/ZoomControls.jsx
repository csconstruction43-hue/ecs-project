// components/ZoomControls.jsx
//
// A small +/- control letting the learner zoom the mock-test screen in
// or out (see PracticeStyleContext.jsx for the state, and
// PracticeStyleRoot.jsx for how it's applied). Self-contained, like
// PracticeStylePicker — drop it anywhere and it reads/writes the shared
// context.
import React from 'react'
import { FaSearchMinus, FaSearchPlus } from 'react-icons/fa'
import { usePracticeStyle, ZOOM_DEFAULT } from '../context/PracticeStyleContext'

export default function ZoomControls({ className = '' }) {
  const { zoom, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = usePracticeStyle()

  return (
    <div
      className={`flex items-center bg-white border border-gray-200 rounded-full shadow-sm h-10 ${className}`}
      role="group"
      aria-label="Zoom controls"
    >
      <button
        type="button"
        onClick={zoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
        className="w-9 h-full flex items-center justify-center text-gray-600 hover:text-green-600 disabled:opacity-30 disabled:hover:text-gray-600 transition"
      >
        <FaSearchMinus className="text-sm" />
      </button>
      <button
        type="button"
        onClick={resetZoom}
        title="Reset zoom to 100%"
        className="px-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition tabular-nums min-w-[3rem] text-center"
      >
        {zoom === ZOOM_DEFAULT ? '100%' : `${zoom}%`}
      </button>
      <button
        type="button"
        onClick={zoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
        className="w-9 h-full flex items-center justify-center text-gray-600 hover:text-green-600 disabled:opacity-30 disabled:hover:text-gray-600 transition"
      >
        <FaSearchPlus className="text-sm" />
      </button>
    </div>
  )
}

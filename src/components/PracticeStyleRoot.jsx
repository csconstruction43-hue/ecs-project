// components/PracticeStyleRoot.jsx
//
// Wrap a mock-test page's content in this to make the `.ps-*` utility
// classes (src/styles/practiceStyles.css) pick up the learner's chosen
// practice style, and to apply their chosen zoom level.
//
// Zoom uses the CSS `zoom` property rather than `transform: scale()`.
// `transform` doesn't affect layout flow, which means the wrapper's
// height has to be tracked and re-measured by hand (fragile — easy to
// clip content or leave a stray gap when the test's height changes as
// the learner answers questions). `zoom` makes the browser genuinely
// reflow the subtree at the new size, so layout, scrolling and the
// container's height all just work with no extra bookkeeping. It's
// supported in every evergreen browser (added to Firefox in 2024); on
// the rare engine without it, the property is simply ignored and the
// test renders at 100%, so it degrades safely rather than breaking.
import React from 'react'
import { usePracticeStyle } from '../context/PracticeStyleContext'

export default function PracticeStyleRoot({ className = '', children }) {
  const { style, zoom } = usePracticeStyle()
  return (
    <div className={`ps-root ${className}`} style={{ ...style.vars, zoom: `${zoom}%` }}>
      {children}
    </div>
  )
}

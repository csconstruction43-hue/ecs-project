// pages/ChapterDetailPage.jsx
// Legacy route (/study-guide/:chapterId) that used to render its own
// hardcoded, placeholder chapter text instead of the real chapter content.
// StudyGuidePage already owns the full 11+ chapter reading experience
// (progress tracking, sections, etc.) as in-page state rather than a
// separate route, and nothing in the app links to this URL directly.
// Redirect here instead of ever showing fake "Full content here..." text.
import { Navigate, useParams } from 'react-router-dom'

function ChapterDetailPage() {
  const { chapterId } = useParams()
  return <Navigate to={chapterId ? `/study-guide?chapter=${chapterId}` : '/study-guide'} replace />
}

export default ChapterDetailPage

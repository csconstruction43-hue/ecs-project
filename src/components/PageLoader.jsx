// components/ui/PageLoader.jsx
import { Loader2 } from 'lucide-react'

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default PageLoader
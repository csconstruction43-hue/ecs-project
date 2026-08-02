// components/WhatsAppButton.jsx — small floating WhatsApp contact button, shown site-wide.
import React from 'react'
import { MessageCircle } from 'lucide-react'

// Set VITE_WHATSAPP_NUMBER in your .env (country code, no + or spaces, e.g.
// 447911123456) to your real WhatsApp Business number. Falls back to a
// placeholder — replace it before going live, this number won't work.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '447000000000'
const DEFAULT_MESSAGE = "Hi, I have a question about ECS cards / the mock tests."

function WhatsAppButton() {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 right-5 xl:bottom-5 z-40 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline text-sm font-semibold">Chat with us</span>
    </a>
  )
}

export default WhatsAppButton

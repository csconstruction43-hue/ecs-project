// components/Footer.jsx — Pro redesign
import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Shield, Award, Clock, ChevronRight, Bot, BookOpen, ClipboardCheck, CreditCard, Trophy, FileText, BookOpenCheck, Video, MessageSquare, Zap } from 'lucide-react'
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/mock-test', label: 'Mock Tests', icon: ClipboardCheck },
    { to: '/study-guide', label: 'Study Guide', icon: BookOpen },
    { to: '/safety-signs', label: 'Safety Signs', icon: Shield },
    { to: '/study-material', label: 'Study Material', icon: BookOpenCheck },
    { to: '/videos', label: 'Video Library', icon: Video },
    { to: '/community', label: 'Community', icon: MessageSquare },
    { to: '/cards', label: 'ECS Cards', icon: CreditCard },
    { to: '/ecs-card-info', label: 'ECS Card & Test Guidance', icon: Shield },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/blog', label: 'Blog', icon: FileText },
    { to: '/pricing', label: 'Pricing', icon: Award },
  ]

  const cardTypes = [
    { to: '/ecs-hse-assessment', label: 'ECS HSE Assessment' },
    { to: '/ecs-fess-assessment', label: 'ECS FESS Assessment' },
    { to: '/ecs-network-infrastructure-assessment', label: 'ECS Network Infrastructure Assessment' },
    { to: '/ecs-electrical-safety-unit-assessment', label: 'ECS Electrical Safety Unit Assessment' },
  ]

  const legalLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/cookies', label: 'Cookie Policy' },
    { to: '/affiliate', label: 'Affiliates' },
  ]

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, href: 'https://x.com', label: 'X (Twitter)', color: 'hover:bg-slate-500' },
    { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok', color: 'hover:bg-gray-800' },
  ]

  const stats = [
    { icon: ClipboardCheck, value: '3000+', label: 'Practice Questions' },
    { icon: Award, value: '11', label: 'ECS Topics Covered' },
    { icon: Clock, value: '24/7', label: 'Access' },
  ]

  return (
    <footer className="bg-gray-950 text-gray-400">

      {/* Stats bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0">
                  <stat.icon size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-secondary rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-black text-white">ECS<span className="text-blue-400">Prep</span></span>
                <div className="text-[9px] text-gray-500 tracking-wider -mt-0.5">UK ELECTROTECHNICAL TESTS</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              The UK's most trusted ECS mock test platform. Prepare for your H&S, Electrician, FESS, Network, AV or Broadcast route test with real exam-style questions and AI explanations.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mb-6">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-200 ${s.color} hover:text-white`}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              <a href="mailto:support@electricianprep.co.uk" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <Mail size={14} className="text-blue-500 shrink-0" />
                <span>support@electricianprep.co.uk</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin size={14} className="text-blue-500 shrink-0" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    <ChevronRight size={13} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/plans" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-400 transition-colors font-medium">
                  <ChevronRight size={13} />✨ Pro Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* ECS Card Types */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">ECS Card Types</h3>
            <ul className="space-y-2.5">
              {cardTypes.map((c, i) => (
                <li key={i}>
                  <Link
                    to={c.to}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    <ChevronRight size={13} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Pro Features</h3>
            <div className="space-y-3 mb-6">
              {[
                { icon: Bot, label: 'AI Study Assistant', desc: 'Chat with AI tutor 24/7' },
                { icon: ClipboardCheck, label: 'Smart Mock Tests', desc: '50 questions · exam timing' },
                { icon: BarChart2Icon, label: 'Progress Analytics', desc: 'Track weak areas' },
                { icon: Shield, label: 'Pass Guarantee', desc: '96% of Pro users pass' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={13} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-300">{f.label}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-secondary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Get Pro Access →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map((l, i) => (
                <Link key={i} to={l.to} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{l.label}</Link>
              ))}
            </div>
            <p className="text-xs text-gray-600 text-right">
              © {currentYear} ECSPrep. All rights reserved.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-5 pt-5 border-t border-gray-900">
            <div className="flex items-start gap-2">
              <Shield size={13} className="text-gray-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-600 leading-relaxed">
                ECSPrep is an independent practice-test platform serving the UK electrotechnical, FESS, network/telecoms and AV sectors. We are not affiliated with or endorsed by the Electrotechnical Certification Scheme (ECS), EAL, NET or JIB. All ECS logos and names remain the property of their respective owners. For official ECS card information visit <a href="https://www.ecscard.org.uk" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 underline">ecscard.org.uk</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Mini BarChart2 icon (lucide doesn't export it by name in some versions)
function BarChart2Icon({ size, className }) {
  return <Award size={size} className={className} />
}

export default Footer

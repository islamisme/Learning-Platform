import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home', hover: 'hover:border-[#60F5FF]/40 hover:text-[#60F5FF]' },
    { to: '/Notes', label: 'Notes', hover: 'hover:border-[#FF7DE8]/40 hover:text-[#FF7DE8]' },
    { to: '/Profile', label: 'Profile', hover: 'hover:border-[#FFE7FF]/40 hover:text-[#FFE7FF]' },
    { to: '/Courses', label: 'Courses', hover: 'hover:border-[#60F5FF]/40 hover:text-[#60F5FF]' },
  ]

  const sidebarOffset = isCollapsed ? 'md:ml-20' : 'md:ml-72'

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#050615] via-[#1F1A55] to-[#6C47FF]">
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden items-stretch overflow-hidden border-r border-white/10 bg-white/5 backdrop-blur-[1.1rem] shadow-[0_25px_50px_-12px_rgba(15,18,35,0.45)] transition-[width] duration-300 ease-out md:flex ${
          isCollapsed ? 'w-20 px-4 py-10' : 'w-72 px-8 py-12'
        }`}
      >
        {!isCollapsed && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.35),transparent_100%)] opacity-70" aria-hidden />
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={`absolute right-4 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#60F5FF]/10 bg-[#0F1223]/10 text-[#F5F7FF] text-xl shadow-[0_12px_24px_rgba(10,12,25,0.45)] transition hover:border-[#60F5FF] hover:text-[#60F5FF] ${
            isCollapsed ? 'backdrop-blur-sm text-[2rem] bg-[#0F1223]/90' : ''
          }`}
          aria-label={isCollapsed ? 'فتح الشريط الجانبي' : 'طي الشريط الجانبي'}
        >
          {isCollapsed ? '>' : 'X'}
        </button>

        <div
          className={`relative z-10 mt-12 flex flex-1 flex-col justify-between transition-opacity duration-200 ${
            isCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="space-y-2 text-center">
            <span className="text-sm uppercase tracking-[0.5em] text-[#B7BCD9]">knowledge</span>
            <h1 className="text-[2rem] font-semibold text-[#F5F7FF]">Learning Hub</h1>
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group rounded-xl border border-white/5 bg-white/10 px-6 py-3 text-center text-[1.1rem] font-medium uppercase tracking-[0.3em] text-[#F5F7FF] transition duration-200 hover:bg-white/15 ${link.hover}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${sidebarOffset}`}>
        <Outlet />
      </main>
    </div>
  )
}


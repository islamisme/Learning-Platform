import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#050615] via-[#1F1A55] to-[#6C47FF]">
      <aside className="relative flex w-72 flex-col justify-between overflow-hidden border-r border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(15,18,35,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.35),transparent_55%)] opacity-70" aria-hidden />
        <div className="relative z-10 space-y-10">
          <div className="space-y-2 text-center">
            <span className="text-sm uppercase tracking-[0.5em] text-[#B7BCD9]">knowledge</span>
            <h1 className="text-[2rem] font-semibold text-[#F5F7FF]">Learning Hub</h1>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="group rounded-xl border border-white/5 bg-white/10 px-6 py-3 text-center text-[1.1rem] font-medium uppercase tracking-[0.3em] text-[#F5F7FF] duration-200 hover:border-[#60F5FF]/40 hover:bg-white/15 hover:text-[#60F5FF]"
            >
              Home
            </Link>
            <Link
              to="/Notes"
              className="group rounded-xl border border-white/5 bg-white/10 px-6 py-3 text-center text-[1.1rem] font-medium uppercase tracking-[0.3em] text-[#F5F7FF] duration-200 hover:border-[#FF7DE8]/40 hover:bg-white/15 hover:text-[#FF7DE8]"
            >
              Notes
            </Link>
            <Link
              to="/Profile"
              className="group rounded-xl border border-white/5 bg-white/10 px-6 py-3 text-center text-[1.1rem] font-medium uppercase tracking-[0.3em] text-[#F5F7FF] duration-200 hover:border-[#FFE7FF]/40 hover:bg-white/15 hover:text-[#FFE7FF]"
            >
              Profile
            </Link>
          </nav>
        </div>
        
      </aside>
     <Outlet />
    </div>
  )
}


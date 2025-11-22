import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Sidebar() {
  const sections = [
    {
      title: 'Workspace',
      items: [
        { label: 'Home', to: '/Home', accent: 'text-[#60F5FF]' },
        { label: 'Notes', to: '/Home/Notes', accent: 'text-[#FF7DE8]' },
        { label: 'Profile', to: '/Home/Profile', accent: 'text-[#FFE7FF]' },
        { label: 'Courses', to: '/Home/Courses', accent: 'text-[#60F5FF]' },
      ],
    },
   
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#050615] via-[#1F1A55] to-[#6C47FF] md:flex-row">
      <aside className="fixed z-10 flex w-full flex-col overflow-hidden border-b border-white/10 bg-black/30 px-6 py-5 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(15,18,35,0.45)] md:h-full md:w-[18rem] md:min-w-[18rem] md:border-b-0 md:border-r md:px-8 md:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.35),transparent_95%)] opacity-80" aria-hidden />
        <div className="relative z-10 flex h-full flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[0.65rem] uppercase tracking-[0.45em] text-[#B7BCD9]">knowledge</span>
                <h1 className="text-2xl font-semibold text-[#F5F7FF]">Learning Hub</h1>
              </div>
              <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#D5C9FF] transition hover:border-white/20 hover:bg-white/15">
                + New
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-[#C7CCF5] shadow-inner shadow-[#02030C]/60">
              <span className="text-lg text-[#6C47FF]">⌘</span>
              <input
                type="text"
                placeholder="Quick Find"
                className="flex-1 bg-transparent text-[0.85rem] tracking-[0.2em] text-[#F5F7FF] placeholder:text-[#7E84AB] focus:outline-none"
              />
            </div>
          </div>

          <nav className="flex-1 space-y-8 overflow-y-auto pb-6">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[#8F94BC]">{section.title}</span>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          'group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.3em] transition duration-200',
                          'text-[#DCE0FF] hover:border-white/10 hover:bg-white/10 hover:text-white',
                          isActive ? 'border-white/20 bg-white/15 text-[#60F5FF] shadow-[0_15px_30px_-15px_rgba(96,245,255,0.45)]' : '',
                        ].join(' ')
                      }
                    >
                      <span className={`text-xs opacity-80 ${item.accent}`}>
                        ●
                      </span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="space-y-4 text-xs uppercase tracking-[0.3em]">
            <button className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-[#F5F7FF] transition hover:border-white/10 hover:bg-white/10">
              <span className="text-lg text-[#FF7DE8]">★</span>
              Starred
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-[#F5F7FF] transition hover:border-white/10 hover:bg-white/10">
              <span className="text-lg text-[#60F5FF]">?</span>
              Help Center
            </button>
          </div>
        </div>
      </aside>
      <main className="relative flex-1">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.08),transparent_70%)]" aria-hidden />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.08),transparent_65%)]" aria-hidden />
        <div className="relative h-full md:ml-[18rem] md:mt-0 mt-[175px] px-6 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}


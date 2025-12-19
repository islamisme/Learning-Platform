import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Sidebar() {
  const sections = [
    {
      title: 'Workspace',
      items: [
        { label: 'Home', to: '/Home', accent: 'text-[#60F5FF]' },
        { label: 'Enrolled', to: '/Home/Enrolled', accent: 'text-[#FF7DE8]' },
        { label: 'Course Store', to: '/Home/Store', accent: 'text-[#FFE7FF]' },
        { label: 'Careers', to: '/Home/Careers', accent: 'text-[#6C47FF]' },
        { label: 'Notes', to: '/Home/Notes', accent: 'text-[#FF7DE8]' },
        {
          label: 'AI',
          to: '/Home/Notes/AI',
        },
      ],
    },
   
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-brand md:flex-row">
      <aside className="fixed z-10 flex w-full flex-col overflow-hidden border-b border-white/10 glass px-6 py-5 md:h-full md:w-[20rem] md:min-w-[20rem] md:border-b-0 md:border-r md:px-8 md:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.4),transparent_95%)] opacity-60" aria-hidden />
        <div className="relative z-10 flex h-full flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[0.6rem] uppercase tracking-[0.5em] text-[#60F5FF] font-semibold">Knowledge Base</span>
                <h1 className="text-3xl font-bold gradient-text">Learning Hub</h1>
              </div>
            
            </div>
          </div>

          <nav className="flex-1 space-y-8  pb-6">
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
                          'group abs flex item  s-center gap-3 rounded-xl  px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.3em] transition duration-200',
                          'text-[#DCE0FF]  hover:bg-white/10 hover:text-white',
                          isActive ? ' bg-white/15 text-[#60F5FF] shadow-[0_15px_30px_-15px_rgba(96,245,255,0.45)]' : '',
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

          <div className="space-y-3 text-xs uppercase tracking-[0.3em]">
            <button className="glass flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#F5F7FF] transition duration-200 hover:border-[#FF7DE8]/40 hover:bg-[#FF7DE8]/10">
              <span className="text-lg">⭐</span>
              <span className="font-semibold">Favorites</span>
            </button>
            <button className="glass flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#F5F7FF] transition duration-200 hover:border-[#60F5FF]/40 hover:bg-[#60F5FF]/10">
              <span className="text-lg">❓</span>
              <span className="font-semibold">Support</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="relative flex-1">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.1),transparent_70%)]" aria-hidden />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.1),transparent_65%)]" aria-hidden />
        <div className="relative md:ml-[20rem] md:mt-0 mt-[175px] px-8 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}


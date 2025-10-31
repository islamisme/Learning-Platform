import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-[#0B0E1A] p-6">
        <h1 className="text-white text-4xl font-semibold text-center mb-[5rem]">E-Learning</h1>
        <div className="mt-6 space-y-3 flex flex-col gap-10">
          <Link to="/" className="text-white text-[1.5rem] text-center hover:bg-[#7B61FF] rounded-lg transition-all">Home</Link>
          <Link to="/Notes" className="text-white text-[1.5rem] text-center hover:bg-[#7B61FF] rounded-lg transition-all">Notes</Link>
          <Link to="/Profile" className="text-white text-[1.5rem] text-center hover:bg-[#7B61FF] rounded-lg transition-all">Profile</Link>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}


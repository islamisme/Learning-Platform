import React from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'

export default function Courses() {
  return (
    <div className="space-y-4 text-white">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)]"
        >
          <p className="text-sm font-medium text-[#F5F7FF]">{course.title}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">
            {course.instructor}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-[#60F5FF]">
              {course.progress}%
            </span>
            <Link
              to={`/Home/Notes?course=${course.id}`}
              className="rounded-full border border-[#6C47FF]/60 bg-[#6C47FF]/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F7FF] hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
            >
              Notes
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}


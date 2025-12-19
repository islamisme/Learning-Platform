import React from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'

function CourseStore() {
  return (
    <div className="space-y-6 text-white">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#F5F7FF]">متجر الدورات</h1>
        <p className="text-sm text-[#C7CCF5]">استكشف مجموعة واسعة من الدورات التعليمية والتطويرية</p>
      </div>

      {courses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
              {courses.length} دورة متاحة
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#F5F7FF] leading-snug">
                    {course.title}
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#B7BCD9]">
                    {course.instructor}
                  </p>
                </div>
                
                <div className="mt-auto space-y-3">
                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[0.65rem]">
                      <span className="uppercase tracking-[0.3em] text-[#B7BCD9]">التقدم</span>
                      <span className="font-semibold text-[#60F5FF]">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#6C47FF] to-[#60F5FF] transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <Link
                    to={`/Home/Notes?course=${course.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#6C47FF]/60 bg-[#6C47FF]/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F7FF] transition-colors hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
                  >
                    الملاحظات
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseStore

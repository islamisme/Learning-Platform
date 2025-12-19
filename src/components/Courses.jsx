import React from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { useEnrolledCourses } from '../context/EnrolledCoursesContext'
import CarrerGrid from './CarrerGrid' // FIXED: Changed from CareerRoleCard

function Courses() {
  const { enrolledCourses } = useEnrolledCourses()

  return (
    <div className="space-y-12 text-white">
      {/* Current Enrolled Courses Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B7BCD9]">
            الدورات الحالية
          </h2>
          <p className="text-xs text-[#C7CCF5]">
            تابع تقدمك في الدورات المسجلة
          </p>
        </div>

        {/* Enrolled Courses from Career Paths */}
        {enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#60F5FF]/20 to-transparent" />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#60F5FF]">
                من المسارات المهنية
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#60F5FF]/20 to-transparent" />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F1223]/80 to-[#1a1d3a]/60 p-5 shadow-[0_8px_32px_-12px_rgba(96,245,255,0.15)] transition-all duration-300 hover:border-[#60F5FF]/30 hover:shadow-[0_8px_32px_-8px_rgba(96,245,255,0.25)]"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#60F5FF]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative space-y-2">
                    <p className="text-sm font-semibold text-[#F5F7FF] leading-snug">
                      {course.title}
                    </p>
                    <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
                      <span>{course.provider}</span>
                      <span className="text-[#60F5FF]/50">·</span>
                      <span className="text-[#60F5FF]">{course.roleTitle}</span>
                    </div>
                  </div>
                  
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#60F5FF]/40 bg-[#60F5FF]/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#60F5FF] transition-all duration-200 hover:border-[#60F5FF]/60 hover:bg-[#60F5FF]/20"
                  >
                    متابعة
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#60F5FF]/10">
              <svg className="h-8 w-8 text-[#60F5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="mb-2 text-sm font-medium text-[#F5F7FF]">لا توجد دورات مسجلة بعد</p>
            <p className="mb-6 text-xs text-[#C7CCF5]">ابدأ رحلتك التعليمية من المسارات المهنية أدناه</p>
            <a
              href="#career-roles"
              className="rounded-full border border-[#6C47FF]/60 bg-[#6C47FF]/20 px-5 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F7FF] transition-colors hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
            >
              استكشف المسارات
            </a>
          </div>
        )}

        {/* Other Courses in Current Space */}
        {courses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
                دورات أخرى في مساحتك
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
      </section>

      {/* Career Roles Grid - FIXED: Now using CarrerGrid */}
      <CarrerGrid />
    </div>
  )
}

export default Courses
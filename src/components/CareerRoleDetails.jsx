import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEnrolledCourses } from '../context/EnrolledCoursesContext'
import { CareerRoles } from './CareerRoles'

export default function CareerRoleDetails() {
  const { roleId } = useParams()
  const { enrollCourse } = useEnrolledCourses()

  const role = CareerRoles.find((r) => r.id === roleId)

  if (!role) {
    return (
      <div className="space-y-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="mb-4 text-lg font-semibold text-[#F5F7FF]">
            المسار المهني غير موجود
          </h2>
          <Link
            to="/Home/Courses"
            className="inline-flex items-center gap-2 rounded-full border border-[#6C47FF]/60 bg-[#6C47FF]/20 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-[#F5F7FF] transition-colors hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
          >
            <span>←</span>
            الرجوع إلى المسارات
          </Link>
        </div>
      </div>
    )
  }

  const handleEnroll = (course) => {
    enrollCourse({
      id: `${role.id}-${course.title}`,
      title: course.title,
      provider: course.provider,
      url: course.url,
      roleId: role.id,
      roleTitle: role.title,
    })
  }

  return (
    <div className="space-y-8 text-white">
      {/* Header Section */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#60F5FF]">
            Career Path
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-[#F5F7FF]">
            {role.title}
          </h1>
          <p className="text-sm leading-relaxed text-[#C7CCF5]">
            {role.description}
          </p>
          <p className="text-xs text-[#B7BCD9]">
            <span className="font-semibold text-[#60F5FF]">If you like:</span>{' '}
            {role.likes}
          </p>
        </div>
        
        <Link
          to="/Home/Courses"
          className="group flex h-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.3em] text-[#D5C9FF] transition-all hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          كل المسارات
        </Link>
      </div>

      {/* Learning Plan Sections */}
      {role.courseSections?.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B7BCD9]">
              خطة التعلّم حسب المسار
            </h2>
            <p className="text-xs text-[#C7CCF5]">
              المهارات والأدوات الأساسية لهذا المسار
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {role.courseSections.map((section, index) => (
              <div
                key={section.title}
                className="group space-y-3 rounded-2xl border border-white/10 bg-[#0F1223]/80 p-5 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)] transition-all duration-300 hover:border-white/20 hover:bg-[#0F1223]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#60F5FF]/10 text-xs font-semibold text-[#60F5FF]">
                    {index + 1}
                  </div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-[#D5C9FF]">
                    {section.title}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-[#C7CCF5]"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#60F5FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Courses */}
      {role.courses?.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B7BCD9]">
              كورسات يمكنك التسجيل فيها
            </h2>
            <p className="text-xs text-[#C7CCF5]">
              دورات موصى بها من منصات تعليمية موثوقة
            </p>
          </div>
          
          <div className="space-y-3">
            {role.courses.map((course, index) => (
              <div
                key={course.title}
                className="group flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#0F1223]/80 p-5 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)] transition-all duration-300 hover:border-[#60F5FF]/20 hover:bg-[#0F1223]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6C47FF]/20 text-sm font-semibold text-[#60F5FF]">
                  {index + 1}
                </div>
                
                <div className="min-w-[200px] flex-1 space-y-1.5">
                  <p className="text-sm font-semibold text-[#F5F7FF]">
                    {course.title}
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.25em] text-[#B7BCD9]">
                    {course.provider}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-[#6C47FF]/60 bg-[#6C47FF]/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#F5F7FF] transition-colors hover:border-[#60F5FF]/70 hover:text-[#60F5FF]"
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => handleEnroll(course)}
                    className="inline-flex items-center rounded-full border border-[#60F5FF]/60 bg-[#60F5FF]/10 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#60F5FF] transition-colors hover:bg-[#60F5FF]/20"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
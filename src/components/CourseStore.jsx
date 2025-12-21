import React, { useEffect, useState } from "react";
import { useEnrolledCourses } from '../context/EnrolledCoursesContext'

function CourseStore() {
  const [allCourses, setAllCourses] = useState([]);
  const { enrollCourse } = useEnrolledCourses();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/courses/index.php');
        const data = await res.json();
        setAllCourses(data?.courses ?? []);
      } catch (err) {
        console.error('Failed to load courses', err);
        setAllCourses([]);
      }
    };

    load();
  }, []);

  const handleEnroll = (course) => {
    if (!course?.id) return;
    enrollCourse(course.id);
  };

  if (!allCourses || allCourses.length === 0) {
    return (
      <div className="space-y-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="mb-4 text-lg font-semibold text-[#F5F7FF]">
            لا توجد دورات متاحة
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-[#F5F7FF]">
            متجر الدورات
          </h1>
          <div className="mt-1 h-1 w-16 bg-gradient-to-r from-[#60F5FF] to-[#6C47FF]" />
        </div>
        <p className="max-w-2xl text-base text-[#C7CCF5]">
          استكشف مجموعة واسعة من الدورات التعليمية والتطويرية المختارة بعناية من أفضل المنصات التعليمية
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#60F5FF]/20">
            <span className="text-lg font-bold text-[#60F5FF]">{allCourses.length}</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">إجمالي الدورات</p>
            <p className="text-sm font-semibold text-[#F5F7FF]">متاحة الآن</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C47FF]/20">
            <span className="text-lg font-bold text-[#6C47FF]">{new Set(allCourses.map(c => c.roleId)).size}</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">المسارات</p>
            <p className="text-sm font-semibold text-[#F5F7FF]">المختلفة</p>
          </div>
        </div>
      </div>

      {/* Available Courses */}
      {allCourses && allCourses.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#B7BCD9]">جميع الدورات المتاحة</p>
            <div className="h-px flex-1 bg-gradient-to-l from-white/20 via-white/10 to-transparent" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allCourses.map((course, index) => (
              <div
                key={course.id ?? `${course.role_id}-${course.title}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)] transition-all duration-300 hover:border-[#60F5FF]/40 hover:from-white/[0.12] hover:to-white/[0.05] hover:shadow-[0_20px_45px_-15px_rgba(96,245,255,0.2)]"
              >
                {/* Card Border Glow Effect */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#60F5FF]/10 to-transparent blur-xl" />
                </div>

                {/* Index Badge */}
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#6C47FF]/30 to-[#60F5FF]/30 px-3 py-1">
                  <span className="text-xs font-bold text-[#60F5FF]">#{index + 1}</span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <p className="line-clamp-2 text-sm font-semibold leading-tight text-[#F5F7FF]">
                      {course.title}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#60F5FF]" />
                      <p className="text-xs uppercase tracking-[0.2em] text-[#B7BCD9]">
                        {course.provider}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#6C47FF]" />
                      <p className="text-xs text-[#C7CCF5]">
                        {course.role_title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
               
                  <button
                    type="button"
                    onClick={() => handleEnroll(course)}
                    className="flex-1 inline-flex items-center justify-center rounded-lg border border-[#60F5FF]/50 bg-[#60F5FF]/10 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#60F5FF] transition-all duration-200 hover:border-[#60F5FF] hover:bg-[#60F5FF]/20"
                  >
                    <span>+ Enroll</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CourseStore;

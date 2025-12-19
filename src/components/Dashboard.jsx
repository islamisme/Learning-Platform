import { Link } from "react-router-dom"
import { useEnrolledCourses } from '../context/EnrolledCoursesContext'

const stats = [
  { label: 'Active Courses', value: 8, glow: 'from-[#60F5FF]/60 to-transparent' },
  { label: 'Completed', value: 14, glow: 'from-[#FF7DE8]/60 to-transparent' },
  { label: 'Hours This Week', value: 12, glow: 'from-[#FFE7FF]/60 to-transparent' },
]

const courses = [
  { title: 'Quantum UX Foundations', progress: 72, instructor: 'Nova Ashton' },
  { title: 'AI-Driven Content Strategy', progress: 54, instructor: 'Kepler Voss' },
  { title: 'Stellar Presentation Skills', progress: 36, instructor: 'Lyra Quinn' },
]

const learningProgress = [
  { label: 'Daily Study Goal', value: 82, accent: 'bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF7DE8]' },
  { label: 'Project Completion', value: 64, accent: 'bg-gradient-to-r from-[#6C47FF] to-[#FF7DE8]' },
  { label: 'Knowledge Retention', value: 48, accent: 'bg-gradient-to-r from-[#FF7DE8] to-[#FFE7FF]' },
]

const notifications = [
  { title: 'New module unlocked: Nebula Storytelling', time: 'قبل 10 دقائق', type: 'update' },
  { title: 'Mentor feedback received for “Quantum UX Foundations”', time: 'قبل ساعتين', type: 'feedback' },
  { title: 'Reminder: Live session “Designing for Deep Space” يبدأ غداً', time: 'قبل 5 ساعات', type: 'reminder' },
]

function Dashboard() {
  const { enrolledCourses } = useEnrolledCourses()
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.15),transparent_60%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.15),transparent_55%)]" aria-hidden />
      <div className="relative space-y-8 overflow-y-auto p-8">
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#60F5FF]">Welcome Back</p>
              <h2 className="text-4xl font-bold text-white">Welcome, Cadet 🚀</h2>
              <p className="text-sm text-[#B7BCD9]">Continue your learning journey and reach new milestones</p>
            </div>
            <div className="glass rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-[#60F5FF] border border-[#60F5FF]/30">
              ✓ On Track
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6 glass rounded-2xl border border-white/10 p-8 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">My Courses</h3>
              <Link to={"/Home/Enrolled"} className="glass rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#60F5FF] border border-[#60F5FF]/30 transition-all duration-200 hover:border-[#60F5FF]/60 hover:bg-[#60F5FF]/10">
                View All →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
               {stats.map((item) => (
                 <div
                   key={item.label}
                   className="glass relative overflow-hidden rounded-xl border border-white/10 p-5"
                 >
                   <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glow} opacity-40`} aria-hidden />
                   <div className="relative z-10 space-y-3">
                     <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#60F5FF]">{item.label}</p>
                     <p className="text-4xl font-bold text-white">{item.value}</p>
                   </div>
                 </div>
               ))}
             </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="rounded-xl  -white/5 bg-[#0F1223]/70 p-4 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.75)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-[#F5F7FF]">{course.title}</h4>
                      <p className="text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">{course.instructor}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#60F5FF]">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF7DE8]"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 glass rounded-2xl border border-white/10 p-8 shadow-card">
            <h3 className="text-xl font-bold text-white">Recent Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.title} className="group rounded-xl  -white/5 bg-[#0F1223]/60 p-4 transition hover:-[#6C47FF]/50">
                  <p className="text-sm font-medium text-[#F5F7FF]">{notification.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#B7BCD9]">{notification.time}</p>
                </div>
              ))}
            </div>
          </section>

          {enrolledCourses.length > 0 && (
            <section className="lg:col-span-3 space-y-4 rounded-2xl  -white/5 bg-white/5 p-6 shadow-[0_25px_55px_-20px_rgba(9,10,25,0.6)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-[#F5F7FF]">My Career Courses</h3>
                <span className="text-[0.7rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
                  Enrolled: {enrolledCourses.length}
                </span>
              </div>
              <div className="space-y-3">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl  -white/5 bg-[#0F1223]/70 p-4 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.75)]"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-[#F5F7FF]">
                        {course.title}
                      </p>
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
                        {course.provider} · {course.roleTitle}
                      </p>
                    </div>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#60F5FF]/60 bg-[#60F5FF]/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#60F5FF] hover:bg-[#60F5FF]/20"
                    >
                      Continue →
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="lg:col-span-3 space-y-4 rounded-2xl  -white/5 bg-white/5 p-6 shadow-[0_25px_55px_-20px_rgba(9,10,25,0.6)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-[#F5F7FF]">Learning Progress</h3>
              <span className="rounded-full  -[#FF7DE8]/40 bg-white/10 px-4 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#FF7DE8]">
                Weekly overview
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {learningProgress.map((item) => (
                <div key={item.label} className="space-y-4 rounded-xl  -white/5 bg-[#0F1223]/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">{item.label}</p>
                    <span className="text-sm font-semibold text-[#F5F7FF]">{item.value}%</span>
                  </div>
                  <div className="relative h-24 overflow-hidden rounded-xl  -white/5 bg-white/5">
                    <div className={`absolute inset-0 ${item.accent} opacity-40`} aria-hidden />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around p-3 text-[#F5F7FF]/80">
                      <div className="flex flex-col items-center">
                        <div className="w-6 rounded-t-full bg-white/20" style={{ height: `${item.value}%` }} />
                        <span className="mt-2 text-[0.55rem] uppercase tracking-[0.3em]">Mon</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 rounded-t-full bg-white/30" style={{ height: `${Math.min(item.value + 8, 100)}%` }} />
                        <span className="mt-2 text-[0.55rem] uppercase tracking-[0.3em]">Wed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 rounded-t-full bg-white/40" style={{ height: `${Math.min(item.value + 15, 100)}%` }} />
                        <span className="mt-2 text-[0.55rem] uppercase tracking-[0.3em]">Fri</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


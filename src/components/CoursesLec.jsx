import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')

function CoursesLec() {
  const { courseId } = useParams()
  const [courseTitle, setCourseTitle] = useState('')
  const [chapters, setChapters] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!courseId) {
        setChapters([])
        setCourseTitle('')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE_URL}/courses/show.php?id=${encodeURIComponent(courseId)}`)
        if (!res.ok) throw new Error(`Failed to load course (${res.status})`)
        const data = await res.json()
        setCourseTitle(data?.title || 'Course')

        const collected = []
        const sections = Array.isArray(data?.sections) ? data.sections : []
        sections.forEach((section) => {
          if (Array.isArray(section?.lectures)) {
            section.lectures.forEach((lecture, idx) => {
              collected.push({
                id: `${section.title || 'Section'}-${idx}`,
                title: `Chapter ${collected.length + 1}`,
                section: section.title || 'Section',
                content: lecture,
              })
            })
          }
        })

        setChapters(collected)
        setActive(0)
      } catch (err) {
        console.error('Failed to load lectures', err)
        setError(err.message || 'Failed to load lectures')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [courseId])

  const activeChapter = useMemo(() => chapters[active], [chapters, active])

  if (loading) return <div className="text-white">Loading lectures...</div>
  if (error) return <div className="text-white">{error}</div>
  if (!courseId) return <div className="text-white">No course selected.</div>
  if (!chapters.length) return <div className="text-white">No lectures available for this course.</div>

  return (
    <div className="flex flex-col gap-6 text-white lg:flex-row">
      <aside className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4 lg:sticky lg:top-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#B7BCD9]">Chapters</h2>
        <div className="flex flex-col gap-2">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActive(idx)}
              className={`rounded-xl border px-3 py-2 text-left transition ${
                idx === active
                  ? 'border-[#60F5FF]/60 bg-[#60F5FF]/15 text-[#60F5FF]'
                  : 'border-white/10 bg-white/5 text-[#F5F7FF] hover:border-[#60F5FF]/30'
              }`}
            >
              <div className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">
                {ch.section}
              </div>
              <div className="text-sm font-semibold">{ch.title}</div>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex-1 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B7BCD9]">{courseTitle}</p>
        <h1 className="text-2xl font-bold text-[#F5F7FF]">{activeChapter?.title}</h1>
        <p className="text-sm text-[#C7CCF5]">{activeChapter?.content}</p>
        <p className="text-xs text-[#B7BCD9]">Section: {activeChapter?.section}</p>
      </section>
    </div>
  )
}

export default CoursesLec
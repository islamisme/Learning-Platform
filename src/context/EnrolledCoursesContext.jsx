import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from './UserContext'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')

const EnrolledCoursesContext = createContext(null)

export function EnrolledCoursesProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const { user } = useUser()

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      try {
        const res = await fetch(`${API_BASE_URL}/courses/enrolled.php?user_id=${encodeURIComponent(user.id)}`, {
          credentials: 'include',
        })
        const data = await res.json()
        setEnrolledCourses(data?.courses ?? [])
      } catch (err) {
        console.error('Failed to load enrolled courses', err)
      }
    }
    load()
  }, [user])

  const enrollCourse = async (courseId) => {
    if (!user?.id) return
    try {
      const res = await fetch(`${API_BASE_URL}/courses/enroll.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user_id: user.id, course_id: courseId }),
      })
      if (!res.ok) throw new Error('Enroll failed')

      // Refresh list
      const listRes = await fetch(`${API_BASE_URL}/courses/enrolled.php?user_id=${encodeURIComponent(user.id)}`, {
        credentials: 'include',
      })
      const data = await listRes.json()
      setEnrolledCourses(data?.courses ?? [])
    } catch (err) {
      console.error('Failed to enroll', err)
    }
  }

  const value = { enrolledCourses, enrollCourse }

  return (
    <EnrolledCoursesContext.Provider value={value}>
      {children}
    </EnrolledCoursesContext.Provider>
  )
}

export function useEnrolledCourses() {
  const ctx = useContext(EnrolledCoursesContext)
  if (!ctx) {
    throw new Error(
      'useEnrolledCourses must be used within an EnrolledCoursesProvider',
    )
  }
  return ctx
}



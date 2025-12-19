import React, { createContext, useContext, useEffect, useState } from 'react'

const EnrolledCoursesContext = createContext(null)

export function EnrolledCoursesProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('enrolledCourses')
      if (stored) {
        setEnrolledCourses(JSON.parse(stored))
      }
    } catch {
      // تجاهل أي أخطاء في قراءة التخزين المحلي
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses))
    } catch {
      // تجاهل أي أخطاء في كتابة التخزين المحلي
    }
  }, [enrolledCourses])

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => {
      if (prev.some((c) => c.id === course.id)) return prev
      return [...prev, course]
    })
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



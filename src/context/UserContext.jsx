import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed?.id) {
          setUser(parsed)
        } else {
          localStorage.removeItem('user')
        }
      } catch (err) {
        console.error('Failed to parse stored user:', err)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const setUserData = (userData) => {
    // Normalize a variety of backend response shapes
    const extractUser = (input) => {
      if (!input) return null
      if (input.id) return input
      if (input.user?.id) return { ...input.user }
      if (input.data?.id) return { ...input.data }
      if (input.data?.user?.id) return { ...input.data.user }
      if (input.user_id) return { id: input.user_id, name: input.name, email: input.email }
      return null
    }

    const normalized = extractUser(userData)

    if (!normalized) {
      setUser(null)
      localStorage.removeItem('user')
      return
    }

    setUser(normalized)
    localStorage.setItem('user', JSON.stringify(normalized))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, setUserData, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider')
  }
  return ctx
}

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')

export default function AuthGate({ children }) {
  const [status, setStatus] = useState({ loading: true, authenticated: false })

  useEffect(() => {
    let cancelled = false
    async function check() {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me.php`, {
          credentials: 'include',
        })
        if (cancelled) return
        if (!res.ok) {
          setStatus({ loading: false, authenticated: false })
          return
        }
        const data = await res.json().catch(() => ({}))
        setStatus({ loading: false, authenticated: !!data.authenticated })
      } catch {
        if (!cancelled) setStatus({ loading: false, authenticated: false })
      }
    }
    check()
    return () => {
      cancelled = true
    }
  }, [])

  if (status.loading) return null
  if (!status.authenticated) return <Navigate to="/" replace />
  return children
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const requestUrl = `${API_BASE_URL}/auth/login.php`
      console.log('Logging in with URL:', requestUrl)
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password }),
      })
      
      let payload = {}
      try {
        const text = await response.text()
        console.log('Response status:', response.status, response.statusText)
        console.log('Response text:', text)
        if (text) {
          payload = JSON.parse(text)
          console.log('Parsed payload:', payload)
        }
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        throw new Error(`خطأ في استجابة الخادم (${response.status}): ${response.statusText}`)
      }
      
      if (!response.ok || !payload.ok) {
        const errorMessage = payload.error || `خطأ في الخادم (${response.status}): ${response.statusText}`
        console.error('Login error:', errorMessage, payload)
        throw new Error(errorMessage)
      }
      navigate('/Home', { state: { user: payload } })
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative animated-background bg-gradient-to-br from-[#121869] via-[#1F1A55] to-[#6C47FF] flex h-full min-h-screen items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.12),transparent_60%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.12),transparent_55%)]" aria-hidden />
      
      <div className="relative w-full max-w-md px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_55px_-20px_rgba(9,10,25,0.6)] backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#6C47FF]/40 bg-[#1F1A55]/70 px-6 py-2 text-xs uppercase tracking-[0.4em] text-[#60F5FF]">
              Access Portal
            </div>
            <h1 className="text-4xl font-semibold text-[#F5F7FF] mb-2">Welcome Back</h1>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D5C9FF]">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#60F5FF]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cadet@knowledgehub.com"
                  className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#60F5FF]/50 focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/20 transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF7DE8]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#FF7DE8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7DE8]/20 transition"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#B7BCD9] cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-[#0F1223]/70 text-[#6C47FF] focus:ring-[#6C47FF]/20" />
                <span className="uppercase tracking-[0.3em]">Remember me</span>
              </label>
              <a href="#" className="uppercase tracking-[0.3em] text-[#60F5FF] hover:text-[#FF7DE8] transition">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border border-[#6C47FF]/40 bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF7DE8] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F5F7FF] shadow-[0_15px_35px_-18px_rgba(108,71,255,0.5)] transition hover:shadow-[0_20px_45px_-15px_rgba(108,71,255,0.6)] hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && <p className="mt-3 text-center text-xs text-[#FF7DE8]">{error}</p>}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B7BCD9]">
              Don't have an account?{' '}
            </p>
            <Link to={"/Register"} className="text-[#60F5FF] hover:text-[#FF7DE8] transition">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
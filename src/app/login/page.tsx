//src/app/login/page.tsx

'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Login failed')
        return
      }

      toast.success('Login successful, redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (err) {
      console.error('Login request failed:', err)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#333446] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f2e] p-8 rounded-xl shadow-lg space-y-6 w-full max-w-sm border border-[#6FE6FC]"
      >
        <h1 className="text-white text-2xl font-bold text-center">Moderator Login</h1>

        <div>
          <label htmlFor="username" className="block text-sm text-white mb-1">
            Username
          </label>
          <input
            id="username"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6FE6FC]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-white mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6FE6FC]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6FE6FC] text-[#333446] font-semibold py-2 rounded hover:bg-[#56d6ed] transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

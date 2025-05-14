'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AuthService } from '@/api-sdk'
import { setTokens } from '@/lib/auth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: () =>
      AuthService.authControllerLogin({
        requestBody: { email, password },
      }),
    onSuccess: (data) => {
      setTokens(data.access_token, data.refresh_token)
      router.push('/dashboard')
    },
    onError: (err) => {
      console.error('Login failed:', err)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate()
      }}
      className="mx-auto mt-20 flex max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-md border px-4 py-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="rounded-md border px-4 py-2"
      />
      <button type="submit" className="rounded-md bg-blue-600 py-2 text-white">
        Login
      </button>
      <button
        type="button"
        className="rounded-md bg-red-600 py-2 text-white"
        onClick={() => {
          window.location.href = 'http://localhost:5000/auth/google'
        }}
      >
        Login with Google
      </button>
    </form>
  )
}

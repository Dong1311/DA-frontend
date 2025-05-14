'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AuthService } from '@/api-sdk'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: () =>
      AuthService.authControllerRegister({
        requestBody: { name, email, password },
      }),
    onSuccess: () => {
      router.push('/login')
    },
    onError: (err) => {
      console.error('Register failed:', err)
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
      <h2 className="text-center text-2xl font-bold">Register</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="rounded-md border px-4 py-2"
      />

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

      <button type="submit" className="rounded-md bg-green-600 py-2 text-white">
        Register
      </button>

      <button type="button" className="rounded-md bg-gray-300 py-2 text-black" onClick={() => router.push('/login')}>
        Already have an account? Login
      </button>
    </form>
  )
}

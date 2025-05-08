'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function LoginClientHandler() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      window.location.href = '/'
    }
  }, [token])

  return null
}

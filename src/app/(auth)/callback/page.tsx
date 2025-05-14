'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { setTokens } from '@/lib/auth'

export default function AuthCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    const refresh = searchParams.get('refresh')
    if (token && refresh) {
      setTokens(token, refresh)
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [router, searchParams])

  return <p className="mt-20 text-center">Processing login...</p>
}

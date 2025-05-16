'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [router])

  return <p>Đang đăng nhập...</p>
}

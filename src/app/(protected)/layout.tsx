'use client'

import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthService } from '@/api-sdk'
import { useAuthStore } from '@/stores/authStore'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  const [isChecking, setIsChecking] = useState(!user)

  useEffect(() => {
    if (!user) {
      AuthService.authControllerGetProfile()
        .then((userFromServer) => {
          setUser(userFromServer)
          setIsChecking(false)
        })
        .catch(() => {
          router.replace('/login')
        })
    }
  }, [user, setUser, router])

  if (isChecking) {
    return <Spin tip="Đang tải..." fullscreen />
  }

  return <>{children}</>
}

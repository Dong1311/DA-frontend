'use client'

import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { AuthService } from '@/api-sdk'
import { useAuthStore } from '@/stores/authStore'

import AppLayout from './_components/Layout'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  useEffect(() => {
    if (!user) {
      AuthService.authControllerGetProfile()
        .then(setUser)
        .catch(() => router.replace('/login'))
    }
  }, [])

  if (!user) {
    return <Spin tip="Đang tải..." fullscreen />
  }

  return <AppLayout>{children}</AppLayout>
}

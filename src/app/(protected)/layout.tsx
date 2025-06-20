'use client'

import { Spin } from 'antd'

import { useAuthCheck } from '@/hooks/auth'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isChecking } = useAuthCheck()

  if (isChecking) {
    return <Spin fullscreen />
  }

  return <>{children}</>
}

'use client'

import { Spin } from 'antd'

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

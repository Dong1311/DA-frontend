'use client'

import { Spin } from 'antd'

export default function RegisteredGuestHistoryLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

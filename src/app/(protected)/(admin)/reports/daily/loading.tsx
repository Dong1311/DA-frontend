'use client'

import { Spin } from 'antd'

export default function ReportDailyLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

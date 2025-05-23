'use client'

import { Empty, Tabs } from 'antd'

import { SkeletonBox } from '@/components'
import { useClientReady } from '@/hooks/useClientReady'

const { TabPane } = Tabs

export const RevenueTabs = () => {
  const isClientReady = useClientReady()

  if (!isClientReady) {
    return (
      <div className="space-y-2">
        <div className="flex gap-4">
          <SkeletonBox className="h-8 w-24 rounded" />
          <SkeletonBox className="h-8 w-24 rounded" />
          <SkeletonBox className="h-8 w-24 rounded" />
        </div>
        <SkeletonBox className="h-40 w-full rounded" />
      </div>
    )
  }

  return (
    <Tabs defaultActiveKey="1" className="text-black">
      <TabPane tab="Theo ngày" key="1">
        <Empty description="Không có dữ liệu" />
      </TabPane>
      <TabPane tab="Theo giờ" key="2" disabled />
      <TabPane tab="Theo thứ" key="3" disabled />
    </Tabs>
  )
}

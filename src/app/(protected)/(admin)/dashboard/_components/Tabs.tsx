'use client'

import { Empty, Spin, Tabs } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { type RevenueByPeriodPointDto } from '@/api-sdk'
import { SkeletonBox } from '@/components'
import { useRevenueByPeriod } from '@/hooks/report'
import { useClientReady } from '@/hooks/useClientReady'

const { TabPane } = Tabs

export const RevenueTabs = () => {
  const isClientReady = useClientReady()
  const [tabKey, setTabKey] = useState<'day' | 'month'>('day')

  const refDate = dayjs().format('YYYY-MM-DD')
  const { data, isLoading } = useRevenueByPeriod({ type: tabKey, refDate })
  const handleChange = (key: string) => {
    if (key === '1') setTabKey('day')
    else if (key === '3') setTabKey('month')
  }

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

  const chartData = (data || []).map((item: RevenueByPeriodPointDto) => ({
    label: tabKey === 'day' ? item.date : item.month,
    total: item.total,
  }))

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Spin />
        </div>
      )
    }

    if (!chartData.length) {
      return <Empty description="Không có dữ liệu" />
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#1890ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <Tabs defaultActiveKey="1" onChange={handleChange} className="text-black">
      <TabPane tab="Theo ngày" key="1">
        {renderChart()}
      </TabPane>
      <TabPane tab="Theo tháng" key="3">
        {renderChart()}
      </TabPane>
    </Tabs>
  )
}

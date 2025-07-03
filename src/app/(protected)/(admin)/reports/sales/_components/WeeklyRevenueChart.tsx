'use client'

import { Spin } from 'antd'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useWeeklyRevenue } from '@/hooks/report'

export const WeeklyRevenueChart = ({ weekStart }: { weekStart?: string }) => {
  const { data, isLoading } = useWeeklyRevenue({ weekStart })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spin />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#1890ff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

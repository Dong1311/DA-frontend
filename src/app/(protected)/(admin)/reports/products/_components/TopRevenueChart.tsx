'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface TopRevenueChartProps {
  data: { productName: string; revenue: number }[]
}

export const TopRevenueChart = ({ data }: TopRevenueChartProps) => {
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData} margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productName" angle={-45} textAnchor="end" interval={0} height={80} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#1890ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}

'use client'

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface TopCustomersChartProps {
  data: { customerName: string; netSpending: number }[]
}

export const TopCustomersChart = ({ data }: TopCustomersChartProps) => {
  const sortedData = [...data].sort((a, b) => b.netSpending - a.netSpending)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData} layout="horizontal" margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" dataKey="customerName" angle={-30} textAnchor="end" interval={0} />
        <YAxis type="number" />
        <Tooltip formatter={(value) => `${value}₫`} />
        <Bar dataKey="netSpending" fill="#82ca9d">
          <LabelList dataKey="netSpending" position="top" formatter={(value: number) => `${value}₫`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

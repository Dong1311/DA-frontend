'use client'

import { DatePicker, Flex, Spin } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'
import { useTopRevenueProducts } from '@/hooks/report'

import { TopRevenueChart } from './TopRevenueChart'

export const TopRevenueLayout = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()

  useEffect(() => {
    const from = searchParams.get('fromDate') || undefined
    const to = searchParams.get('toDate') || undefined
    setFromDate(from)
    setToDate(to)
  }, [searchParams])

  const { data, isLoading } = useTopRevenueProducts({ fromDate, toDate })

  const handleRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (dates?.[0] && dates?.[1]) {
      const [start, end] = dates
      params.set('fromDate', start.format('YYYY-MM-DD'))
      params.set('toDate', end.format('YYYY-MM-DD'))
    } else {
      params.delete('fromDate')
      params.delete('toDate')
    }
    router.replace(`?${params.toString()}`)
  }

  return (
    <Flex className="w-full space-y-4 p-4" vertical justify="flex-start" align="start">
      <Text className="text-xl font-semibold">Top 10 sản phẩm theo doanh thu</Text>
      <DatePicker.RangePicker
        allowClear
        defaultValue={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
        onChange={handleRangeChange}
      />

      {isLoading ? (
        <Flex className="h-64 w-full items-center">
          <Spin size="large" />
        </Flex>
      ) : (
        <TopRevenueChart data={data || []} />
      )}
    </Flex>
  )
}

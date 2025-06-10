'use client'

import { DatePicker, Flex, Spin } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'
import { useTopSpendingCustomers } from '@/hooks/report'

import { TopCustomersChart } from './TopCustomersChart'

export const TopCustomersLayout = () => {
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

  const { data, isLoading } = useTopSpendingCustomers({ fromDate, toDate })

  const handleRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null, _: [string, string]) => {
    const params = new URLSearchParams(searchParams.toString())
    if (dates && dates[0] && dates[1]) {
      params.set('fromDate', dates[0].format('YYYY-MM-DD'))
      params.set('toDate', dates[1].format('YYYY-MM-DD'))
    } else {
      params.delete('fromDate')
      params.delete('toDate')
    }
    router.replace(`?${params.toString()}`)
  }

  return (
    <Flex className="w-full space-y-4 p-4" vertical align="start">
      <Text className="text-xl font-semibold">Top 10 khách hàng chi tiêu nhiều nhất</Text>
      <DatePicker.RangePicker
        allowClear
        defaultValue={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
        onChange={handleRangeChange}
      />

      {isLoading ? (
        <Flex className="h-64 w-full items-center justify-center">
          <Spin size="large" />
        </Flex>
      ) : (
        <TopCustomersChart data={data || []} />
      )}
    </Flex>
  )
}

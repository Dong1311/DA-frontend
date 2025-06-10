'use client'

import { DatePicker, Flex } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { WeeklyRevenueChart } from './WeeklyRevenueChart'

export const WeeklyReportLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const defaultWeekStart = useMemo(() => {
    const param = searchParams.get('weekStart')
    return param || dayjs().startOf('week').format('YYYY-MM-DD')
  }, [searchParams])

  const [weekStart, setWeekStart] = useState(defaultWeekStart)

  const handleChange = (date: dayjs.Dayjs | null) => {
    const newWeekStart = date?.startOf('week').format('YYYY-MM-DD') || ''
    const params = new URLSearchParams(searchParams.toString())
    params.set('weekStart', newWeekStart)
    router.replace(`?${params.toString()}`)
    setWeekStart(newWeekStart)
  }

  return (
    <Flex className="w-full space-y-4 p-4" vertical>
      <DatePicker picker="week" onChange={handleChange} defaultValue={dayjs(weekStart)} />
      <WeeklyRevenueChart weekStart={weekStart} />
    </Flex>
  )
}

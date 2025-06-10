'use client'

import { Flex } from 'antd'

import { Text } from '@/components'

import { ReportDailyTable } from './ReportDailyTable'
import { ReportDailyToolbar } from './ReportDailyToolbar'
export const ReportDailyLayout = () => {
  return (
    <Flex className="min-h-screen w-full bg-[#f5f6f8] p-4 pt-2 md:pt-4" vertical>
      <Text className="mb-4 text-[20px] font-semibold text-black">Hàng hóa</Text>

      <Flex justify="space-between" className="mb-4">
        <ReportDailyToolbar />
      </Flex>

      <div className="w-full max-w-full overflow-x-auto rounded-md bg-white p-4 shadow">
        <ReportDailyTable />
      </div>
    </Flex>
  )
}

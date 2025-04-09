'use client'

import { Flex } from 'antd'

import { Text } from '@/components'

import { PricebookFilters } from './PricebookFilters'
import { PricebookTable } from './PricebookTable'
import { PriceBookToolbar } from './PricebookToolbar'
export const PricebookLayout = () => {
  return (
    <Flex className="h-[calc(100vh-50px)] w-full overflow-hidden bg-[#f5f6f8] p-4" justify="space-between">
      <Flex vertical className="max-w-[300px] flex-1 overflow-y-auto px-4 pb-4">
        <Text className="mb-4 text-[20px] font-semibold text-black">Bảng giá chung</Text>
        <PricebookFilters />
      </Flex>

      <Flex vertical className="w-full max-w-[calc(100%-300px)] overflow-y-auto">
        <PriceBookToolbar />
        <PricebookTable />
      </Flex>
    </Flex>
  )
}

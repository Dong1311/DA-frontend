'use client'

import { Flex } from 'antd'

import { Text } from '@/components'

import { SupplierFilters } from './SupplierFilter'
import { SupplierTable } from './SupplierTable'
import { SupplierToolbar } from './SupplierToolbar'

export const SupplierLayout = () => {
  return (
    <Flex
      className="h-screen w-full overflow-hidden bg-[#f5f6f8] p-4 pt-2 md:pt-4"
      justify="space-between"
      wrap="wrap"
      gap={16}
    >
      <Flex vertical className="w-full overflow-y-auto px-2 pb-4 md:w-[280px] md:px-4" style={{ flexShrink: 0 }}>
        <Text className="mb-4 text-[20px] font-semibold text-black">Nhà cung cấp</Text>
        <SupplierFilters />
      </Flex>

      <Flex vertical className="min-w-0 flex-1 overflow-y-auto px-2 md:px-0">
        <SupplierToolbar />
        <SupplierTable />
      </Flex>
    </Flex>
  )
}

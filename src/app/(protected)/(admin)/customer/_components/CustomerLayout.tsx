'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'

import { CustomerSearch } from './CustomerSearch'
import { CustomerTable } from './CustomerTable'

export const CustomerLayout = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('search') || ''
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    router.replace(`?${params.toString()}`)
    setSearchKeyword(keyword)
  }

  return (
    <Flex
      className="h-screen w-full overflow-hidden bg-[#f5f6f8] p-4 pt-2 md:pt-4"
      justify="space-between"
      wrap="wrap"
      gap={16}
    >
      <Flex vertical>
        <Text className="mb-4 text-[20px] font-semibold text-black">Khách hàng</Text>

        <Flex vertical className="mt-2 min-w-0 flex-1 overflow-y-auto">
          <Flex justify="space-between" className="mb-4">
            <CustomerSearch onSearch={handleSearch} defaultValue={initialKeyword} />
          </Flex>
          <CustomerTable searchKeyword={searchKeyword} />
        </Flex>
      </Flex>
    </Flex>
  )
}

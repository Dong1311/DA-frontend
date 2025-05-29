'use client'
import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'

import { PricebookSearch } from './PricebookSearch'
import { PricebookTable } from './PricebookTable'
import { PricebookToolbar } from './PricebookToolbar'

export const PricebookLayout = () => {
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
    <Flex vertical className="min-h-screen w-full overflow-x-hidden bg-[#f5f6f8] p-4 pt-2 ">
      <Flex vertical className="w-full overflow-y-auto px-2 pb-4 md:w-[280px] ">
        <Text className="mb-4 text-[20px] font-semibold text-black">Bảng giá</Text>
      </Flex>

      <Flex vertical className="min-w-0 flex-1 overflow-y-auto px-2" justify="start" align="stretch">
        <Flex justify="space-between" align="center" className="mb-4">
          <PricebookSearch onSearch={handleSearch} defaultValue={initialKeyword} />
          <PricebookToolbar />
        </Flex>

        <PricebookTable searchKeyword={searchKeyword} />
      </Flex>
    </Flex>
  )
}

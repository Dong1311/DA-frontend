'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'

import { PricebookSearch } from './PricebookSearch'
import { PricebookTable } from './PricebookTable'
import { PricebookToolbar } from './PricebookToolbar'

export const PricebookLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialKeyword = searchParams.get('search') || ''
  const initialPage = parseInt(searchParams.get('page') || '1', 10)

  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)
  const [page, setPage] = useState(initialPage)

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
    setSearchKeyword(keyword)
    setPage(1)
  }

  useEffect(() => {
    setPage(initialPage)
    setSearchKeyword(initialKeyword)
  }, [initialPage, initialKeyword])

  return (
    <Flex vertical className="min-h-screen w-full overflow-x-hidden bg-[#f5f6f8] p-4 pt-2">
      <Flex vertical className="w-full overflow-y-auto px-2 pb-4 md:w-[280px] ">
        <Text className="mb-4 text-[20px] font-semibold text-black">Bảng giá</Text>
      </Flex>

      <Flex vertical className="min-w-0 flex-1 overflow-y-auto px-2" justify="start" align="stretch">
        <Flex justify="space-between" align="center" className="mb-4">
          <PricebookSearch onSearch={handleSearch} defaultValue={initialKeyword} />
          <PricebookToolbar />
        </Flex>

        <PricebookTable searchKeyword={searchKeyword} page={page} onPageChange={setPage} />
      </Flex>
    </Flex>
  )
}

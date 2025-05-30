'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'

import { ImportReceiptSearch } from './ImportReceiptSearch'
import { ImportReceiptTable } from './ImportReceiptTable'
import { ImportReceiptToolbar } from './ImportReceiptToolbar'

export const ImportReceiptLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialKeyword = searchParams.get('search') || ''
  const initialPage = parseInt(searchParams.get('page') || '1', 10)

  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    setSearchKeyword(searchParams.get('search') || '')
    setPage(parseInt(searchParams.get('page') || '1', 10))
  }, [searchParams])

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.replace(`?${params.toString()}`)
  }

  return (
    <Flex
      className="min-h-screen w-full overflow-x-hidden bg-[#f5f6f8] p-4 pt-2 md:pt-4"
      justify="space-between"
      wrap="wrap"
      gap={16}
    >
      <Flex vertical className="w-full p-0">
        <Text className="mb-4 text-[20px] font-semibold text-black">Đơn nhập hàng</Text>
        <Flex vertical className="min-w-0 flex-1 overflow-y-auto px-2 md:px-0">
          <Flex justify="space-between" className="my-4">
            <ImportReceiptSearch onSearch={handleSearch} defaultValue={initialKeyword} />
            <ImportReceiptToolbar />
          </Flex>
          <ImportReceiptTable searchKeyword={searchKeyword} page={page} onPageChange={handlePageChange} />
        </Flex>
      </Flex>
    </Flex>
  )
}

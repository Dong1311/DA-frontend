'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'

import { CustomerSearch } from './CustomerSearch'
import { CustomerTable } from './CustomerTable'
import { CustomerToolbar } from './CustomerToolbar'
export const CustomerLayout = () => {
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
    <Flex className="min-h-screen w-full bg-[#f5f6f8] p-4 pt-2 md:pt-4" vertical>
      <Text className="mb-4 text-[20px] font-semibold text-black">Khách hàng</Text>

      <Flex justify="space-between" className="mb-4">
        <CustomerSearch onSearch={handleSearch} defaultValue={searchKeyword} />
        <CustomerToolbar />
      </Flex>

      <div className="w-full max-w-full overflow-x-auto rounded-md bg-white p-4 shadow">
        <CustomerTable searchKeyword={searchKeyword} page={page} onPageChange={handlePageChange} />
      </div>
    </Flex>
  )
}

'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'

import { StockCheckSearch } from './StockCheckSearch'
import { StockCheckTable } from './StockCheckTable'
import { StockCheckToolbar } from './StockCheckToolbar'

export const StockCheckLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialKeyword = searchParams.get('search') || ''
  const initialFromDate = searchParams.get('fromDate') || undefined
  const initialToDate = searchParams.get('toDate') || undefined
  const initialPage = parseInt(searchParams.get('page') || '1', 10)

  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)
  const [fromDate, setFromDate] = useState<string | undefined>(initialFromDate)
  const [toDate, setToDate] = useState<string | undefined>(initialToDate)
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    setSearchKeyword(searchParams.get('search') || '')
    setFromDate(searchParams.get('fromDate') || undefined)
    setToDate(searchParams.get('toDate') || undefined)
    setPage(parseInt(searchParams.get('page') || '1', 10))
  }, [searchParams])

  const handleSearch = (params: { keyword: string; fromDate?: string; toDate?: string }) => {
    const { keyword, fromDate, toDate } = params
    const newSearchParams = new URLSearchParams()

    if (keyword) newSearchParams.set('search', keyword)
    if (fromDate) newSearchParams.set('fromDate', fromDate)
    if (toDate) newSearchParams.set('toDate', toDate)

    newSearchParams.set('page', '1')
    router.replace(`?${newSearchParams.toString()}`)

    setSearchKeyword(keyword)
    setFromDate(fromDate)
    setToDate(toDate)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.replace(`?${params.toString()}`)
    setPage(newPage)
  }

  return (
    <Flex className="min-h-screen w-full bg-[#f5f6f8] p-4 pt-2 md:pt-4" vertical>
      <Text className="mb-4 text-[20px] font-semibold text-black">Phiếu kiểm kho</Text>

      <Flex className="mb-4 flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
        <StockCheckSearch
          onSearch={handleSearch}
          defaultValue={initialKeyword}
          defaultFromDate={initialFromDate}
          defaultToDate={initialToDate}
        />
        <StockCheckToolbar />
      </Flex>

      <div className="w-full max-w-full overflow-x-auto rounded-md bg-white p-4 shadow">
        <StockCheckTable
          searchKeyword={searchKeyword}
          fromDate={fromDate}
          toDate={toDate}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </Flex>
  )
}

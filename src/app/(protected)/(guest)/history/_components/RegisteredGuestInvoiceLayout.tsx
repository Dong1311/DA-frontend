'use client'

import { Flex, message } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Text } from '@/components'

import { InvoiceSearch } from './RegisteredGuestInvoiceSearch'
import { RegisteredGuestInvoiceTable } from './RegisteredGuestInvoiceTable'

export const RegisteredGuestInvoiceLayout = () => {
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

    const showReturnMessage = localStorage.getItem('return_notice')
    if (showReturnMessage === '1') {
      message.info('Chọn hóa đơn để trả hàng')
      localStorage.removeItem('return_notice')
    }
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
      <Text className="mb-4 text-[20px] font-semibold text-black">Hóa đơn</Text>

      <Flex className="mb-4 flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
        <InvoiceSearch
          onSearch={handleSearch}
          defaultValue={initialKeyword}
          defaultFromDate={initialFromDate}
          defaultToDate={initialToDate}
        />
      </Flex>

      <div className="w-full max-w-full overflow-x-auto rounded-md bg-white p-4 shadow">
        <RegisteredGuestInvoiceTable
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

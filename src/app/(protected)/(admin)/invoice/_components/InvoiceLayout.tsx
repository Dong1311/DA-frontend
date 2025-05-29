'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'

import { InvoiceSearch } from './InvoiceSearch'
import { InvoiceTable } from './InvoiceTable'
import { InvoiceToolbar } from './InvoiceToolbar'

export const InvoiceLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialKeyword = searchParams.get('search') || ''
  const initialFromDate = searchParams.get('fromDate') || undefined
  const initialToDate = searchParams.get('toDate') || undefined

  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)
  const [fromDate, setFromDate] = useState<string | undefined>(initialFromDate)
  const [toDate, setToDate] = useState<string | undefined>(initialToDate)

  const handleSearch = (params: { keyword: string; fromDate?: string; toDate?: string }) => {
    const { keyword, fromDate, toDate } = params
    const newSearchParams = new URLSearchParams()

    if (keyword) newSearchParams.set('search', keyword)
    if (fromDate) newSearchParams.set('fromDate', fromDate)
    if (toDate) newSearchParams.set('toDate', toDate)

    router.replace(`?${newSearchParams.toString()}`)

    setSearchKeyword(keyword)
    setFromDate(fromDate)
    setToDate(toDate)
  }

  return (
    <Flex
      className="min-h-screen w-full overflow-x-hidden bg-[#f5f6f8] p-4 pt-2 md:pt-4"
      justify="space-between"
      wrap="wrap"
      gap={16}
    >
      <Flex vertical className="w-full overflow-y-auto px-2 pb-4 " style={{ flexShrink: 0 }}>
        <Text className="mb-4 text-[20px] font-semibold text-black">Hóa đơn</Text>
        <Flex vertical className="my-2 min-w-0 flex-1 overflow-y-auto px-2 md:px-0">
          <Flex justify="space-between" className="mb-4">
            <InvoiceSearch
              onSearch={handleSearch}
              defaultValue={initialKeyword}
              defaultFromDate={initialFromDate}
              defaultToDate={initialToDate}
            />
            <InvoiceToolbar />
          </Flex>
          <InvoiceTable searchKeyword={searchKeyword} fromDate={fromDate} toDate={toDate} />
        </Flex>
      </Flex>
    </Flex>
  )
}

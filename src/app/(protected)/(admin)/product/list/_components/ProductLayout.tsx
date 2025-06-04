'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'

import { ProductSearch } from './ProductSearch'
import { ProductTable } from './ProductTable'
import { ProductToolbar } from './ProductToolbar'
export const ProductLayout = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('search') || ''
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword)

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams()
    if (keyword) params.set('search', keyword)
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
    setSearchKeyword(keyword)
  }

  return (
    <Flex className="min-h-screen w-full bg-[#f5f6f8] p-4 pt-2 md:pt-4" vertical>
      <Text className="mb-4 text-[20px] font-semibold text-black">Hàng hóa</Text>

      <Flex justify="space-between" className="mb-4">
        <ProductSearch onSearch={handleSearch} defaultValue={initialKeyword} />
        <ProductToolbar />
      </Flex>

      <div className="w-full max-w-full overflow-x-auto rounded-md bg-white p-4 shadow">
        <ProductTable searchKeyword={searchKeyword} />
      </div>
    </Flex>
  )
}

'use client'

import { Table } from 'antd'
import { useRouter } from 'next/navigation'

import { Text } from '@/components'
import { useProductList, useProductSearch } from '@/hooks/product'

interface Props {
  searchKeyword: string
  page: number
  onPageChange: (page: number) => void
}

export const PricebookTable = ({ searchKeyword, page, onPageChange }: Props) => {
  const router = useRouter()
  const limit = 10

  const { data: allPricebooks, isLoading: isLoadingAll } = useProductList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useProductSearch(searchKeyword, page, limit)

  const data = searchKeyword ? searchResults : allPricebooks
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString())
    router.replace(`?${params.toString()}`)
    onPageChange(newPage)
  }

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'image',
      width: '15%',
      render: (images: { url: string }[]) => {
        const imageUrl = images?.[0]?.url ?? '/images/noimage.png'
        return (
          <img
            src={imageUrl}
            alt="Ảnh sản phẩm"
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          />
        )
      },
    },
    { title: 'Mã hàng', dataIndex: 'code', ellipsis: true, width: '20%' },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      ellipsis: true,
      width: '20%',
      render: (text: string) => <Text>{text}</Text>,
    },
    { title: 'Giá bán', dataIndex: 'salePrice', ellipsis: true, width: '17.5%' },
    { title: 'Giá vốn', dataIndex: 'costPrice', ellipsis: true, width: '17.5%' },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data?.items || []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: data?.total || 0,
        onChange: handlePageChange,
      }}
    />
  )
}

'use client'

import { Table } from 'antd'

import { Text } from '@/components'
import { useProductList, useProductSearch } from '@/hooks/product'

export const PricebookTable = ({ searchKeyword }: { searchKeyword: string }) => {
  const { data: allPricebooks, isLoading: isLoadingAll } = useProductList()

  const { data: searchResults, isLoading: isLoadingSearch } = useProductSearch(searchKeyword)

  const data = searchKeyword ? searchResults : allPricebooks
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

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
    {
      title: 'Mã hàng',
      dataIndex: 'code',
      ellipsis: true,
      width: '20%',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      ellipsis: true,
      width: '20%',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      ellipsis: true,
      width: '17.5%',
    },
    {
      title: 'Giá vốn',
      dataIndex: 'costPrice',
      ellipsis: true,
      width: '17.5%',
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="id" pagination={{ pageSize: 10 }} />
    </>
  )
}

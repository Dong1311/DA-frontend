'use client'

import { Button, Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useProductList, useProductSearch } from '@/hooks/product'

import { EditProductModal } from './EditProductModal'

export const ProductTable = ({ searchKeyword }: { searchKeyword: string }) => {
  const { data: allProducts, isLoading: isLoadingAll } = useProductList()

  const { data: searchResults, isLoading: isLoadingSearch } = useProductSearch(searchKeyword)

  const data = searchKeyword ? searchResults : allProducts
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const [editingProduct, setEditingProduct] = useState<any | null>(null)

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'image',
      onCell: () => ({ style: { width: '8%' } }),
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
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      ellipsis: true,
      onCell: () => ({ style: { width: '25%' } }),
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      ellipsis: true,
      onCell: () => ({ style: { width: '12%' } }),
    },
    {
      title: 'Giá vốn',
      dataIndex: 'costPrice',
      ellipsis: true,
      onCell: () => ({ style: { width: '12%' } }),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      ellipsis: true,
      onCell: () => ({ style: { width: '8%' } }),
    },
    {
      title: 'Đặt trước',
      dataIndex: 'reserved',
      ellipsis: true,
      onCell: () => ({ style: { width: '8%' } }),
    },
    {
      title: '',
      key: 'actions',
      onCell: () => ({ style: { width: '12%' } }),
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="link" onClick={() => setEditingProduct(record)}>
            Sửa
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="id" pagination={{ pageSize: 10 }} />
      {editingProduct && (
        <EditProductModal product={editingProduct} open={!!editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </>
  )
}

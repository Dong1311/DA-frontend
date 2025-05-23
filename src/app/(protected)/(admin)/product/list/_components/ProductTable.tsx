'use client'

import { Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useProductList } from '@/hooks/product'

import { EditProductModal } from './EditProductModal'

export const ProductTable = () => {
  const { data, isLoading } = useProductList()
  const [editingProduct, setEditingProduct] = useState<any | null>(null)

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'image',
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
    { title: 'Mã hàng', dataIndex: 'code' },
    { title: 'Tên hàng', dataIndex: 'name', render: (text: string) => <Text>{text}</Text> },
    { title: 'Giá bán', dataIndex: 'salePrice' },
    { title: 'Giá vốn', dataIndex: 'costPrice' },
    { title: 'Tồn kho', dataIndex: 'stock' },
    { title: 'Đặt trước', dataIndex: 'reserved' },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => setEditingProduct(record),
        })}
      />
      {editingProduct && (
        <EditProductModal product={editingProduct} open={!!editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </>
  )
}

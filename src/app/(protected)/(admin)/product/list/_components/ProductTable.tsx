import { Button, Table } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'
import { useProductList, useProductSearch } from '@/hooks/product'

import { EditProductModal } from './EditProductModal'

export const ProductTable = ({ searchKeyword }: { searchKeyword: string }) => {
  const [limit] = useState(10)
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const [page, setPage] = useState(initialPage)

  const { data: allProducts, isLoading: isLoadingAll } = useProductList(page, limit)

  const { data: searchResults, isLoading: isLoadingSearch } = useProductSearch(searchKeyword, page, limit)

  const data = searchKeyword ? searchResults : allProducts
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const [editingProduct, setEditingProduct] = useState<any | null>(null)

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'image',
      render: (images: { url: string }[]) => {
        const imageUrl = images?.[0]?.url ?? '/images/noimage.png'
        return <img src={imageUrl} alt="Ảnh" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      },
    },
    { title: 'Mã hàng', dataIndex: 'code' },
    { title: 'Tên hàng', dataIndex: 'name', render: (text: string) => <Text>{text}</Text> },
    { title: 'Giá bán', dataIndex: 'salePrice' },
    { title: 'Giá vốn', dataIndex: 'costPrice' },
    { title: 'Tồn kho', dataIndex: 'stock' },
    { title: 'Đặt trước', dataIndex: 'reserved' },
    {
      title: '',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => setEditingProduct(record)}>
          Sửa
        </Button>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (p) => {
            setPage(p)
            const params = new URLSearchParams(searchParams.toString())
            params.set('page', p.toString())
            router.replace(`?${params.toString()}`)
          },
        }}
      />
      {editingProduct && (
        <EditProductModal product={editingProduct} open={!!editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </>
  )
}

// ProductTable.tsx
'use client'

import { Button, InputNumber, Table } from 'antd'
import { useFormContext } from 'react-hook-form'

import { type ProductResponseDto } from '@/api-sdk'
export const ProductTable = () => {
  const { setValue, watch } = useFormContext()
  const products = watch('products')

  const handleQuantityChange = (value: number | null, productId: string) => {
    const updated = products.map((p: ProductResponseDto) =>
      p.id === productId && value && value > 0 ? { ...p, quantity: value, totalPrice: p.costPrice * value } : p
    )
    setValue('products', updated)
  }

  const removeProduct = (productId: string) => {
    setValue(
      'products',
      products.filter((p: ProductResponseDto) => p.id !== productId)
    )
  }

  const columns = [
    { title: 'Mã SP', dataIndex: 'code' },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber min={1} value={quantity} onChange={(val) => handleQuantityChange(val, record.id)} />
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      render: (val: number) => `${val.toLocaleString()} VND`,
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <Button danger onClick={() => removeProduct(record.id)}>
          Xóa
        </Button>
      ),
    },
  ]

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />
}

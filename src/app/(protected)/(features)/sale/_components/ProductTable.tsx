'use client'

import { Button, InputNumber, Select, Table } from 'antd'
import { useFormContext } from 'react-hook-form'

import { type ProductSaleDto, type ProductUnitDto } from '@/api-sdk'
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'

export type ProductSaleFormDto = ProductSaleDto & {
  productUnits: ProductUnitDto[]
  images: { url: string }[]
}

export const ProductTable = () => {
  const { setValue, watch } = useFormContext()
  const products: ProductSaleFormDto[] = watch('products')

  const handleQuantityChange = (value: number | null, productId: string) => {
    if (value === null || value <= 0) return
    const updated = products.map((p) => {
      if (p.id === productId) {
        const quantity = value
        return {
          ...p,
          quantity,
          totalPrice: quantity * p.unitPrice,
        }
      }
      return p
    })
    setValue('products', updated)
  }

  const handleUnitChange = (unitId: string, productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const selectedUnit = p.productUnits.find((u) => u.id === unitId)
        const unitPrice = selectedUnit?.unitPrice ?? 0
        return {
          ...p,
          unitId,
          unitPrice,
          totalPrice: p.quantity * unitPrice,
        }
      }
      return p
    })
    setValue('products', updated)
  }

  const removeProduct = (productId: string) => {
    setValue(
      'products',
      products.filter((p) => p.id !== productId)
    )
  }

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      render: (images: { url: string }[]) => {
        const url = images?.[0]?.url || '/images/notfound.png'
        return <img src={url} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
      },
    },
    { title: 'Mã SP', dataIndex: 'code' },
    {
      title: 'Đơn vị',
      dataIndex: 'unitId',
      render: (_: string, record: ProductSaleFormDto) => (
        <Select
          value={record.unitId}
          onChange={(val) => handleUnitChange(val, record.id)}
          options={record.productUnits.map((u) => ({
            label: u.unitName,
            value: u.id,
          }))}
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity: number, record: ProductSaleFormDto) => (
        <InputNumber min={1} value={quantity} onChange={(val) => handleQuantityChange(val, record.id)} />
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      render: (val: number | null | undefined) => `${formatNumberWithCommas(val ?? 0)} VND`,
    },
    {
      title: '',
      render: (_: any, record: ProductSaleFormDto) => (
        <Button danger onClick={() => removeProduct(record.id)}>
          Xóa
        </Button>
      ),
    },
  ]

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />
}

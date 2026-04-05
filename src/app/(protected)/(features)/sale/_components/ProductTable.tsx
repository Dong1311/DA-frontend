'use client'

import { Button, InputNumber, Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useFormContext } from 'react-hook-form'

import { type SaleFormValues, type SaleProductFormItem } from '@/features/invoice/types/sale-form.types'
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'

export type ProductSaleFormDto = SaleProductFormItem

export const ProductTable = () => {
  const { setValue, watch } = useFormContext<SaleFormValues>()
  const products = watch('products')

  const handleQuantityChange = (value: number | null, productId: string) => {
    if (value === null || value <= 0) return
    const updated = products.map((product) => {
      if (product.id === productId) {
        const quantity = value
        return {
          ...product,
          quantity,
          totalPrice: quantity * product.unitPrice,
        }
      }
      return product
    })
    setValue('products', updated)
  }

  const handleUnitChange = (unitId: string, productId: string) => {
    const updated = products.map((product) => {
      if (product.id === productId) {
        const selectedUnit = product.productUnits.find((unit) => unit.id === unitId)
        const unitPrice = selectedUnit?.unitPrice ?? 0
        return {
          ...product,
          unitId,
          unitPrice,
          totalPrice: product.quantity * unitPrice,
        }
      }
      return product
    })
    setValue('products', updated)
  }

  const removeProduct = (productId: string) => {
    setValue(
      'products',
      products.filter((product) => product.id !== productId)
    )
  }

  const columns: ColumnsType<ProductSaleFormDto> = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      render: (images: { url: string }[]) => {
        const url = images?.[0]?.url || '/images/noimage.png'
        return <img src={url} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
      },
    },
    { title: 'Mã SP', dataIndex: 'code' },
    { title: 'Tên SP', dataIndex: 'name' },
    {
      title: 'Đơn vị',
      dataIndex: 'unitId',
      render: (_value, record) => (
        <Select
          value={record.unitId}
          onChange={(nextUnitId) => handleUnitChange(nextUnitId, record.id)}
          options={record.productUnits.map((unit) => ({
            label: unit.unitName,
            value: unit.id,
          }))}
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={quantity}
          onChange={(nextQuantity) => handleQuantityChange(nextQuantity, record.id)}
        />
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      render: (value: number | null | undefined) => `${formatNumberWithCommas(value ?? 0)} VND`,
    },
    {
      title: '',
      render: (_value, record) => (
        <Button danger onClick={() => removeProduct(record.id)}>
          Xóa
        </Button>
      ),
    },
  ]

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />
}

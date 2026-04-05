'use client'

import { Button, Col, Form, Input, InputNumber, message, Popconfirm, Row, Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { type CreateImportReceiptDto, type CreateImportReceiptItemDto } from '@/api-sdk'
import { useProductList } from '@/hooks/product'

import { SupplierSearch } from './SupplierSearch'

type FormValues = CreateImportReceiptDto

export const ImportReceiptForm = ({ disabled = false }: { disabled?: boolean }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>()

  const { data: productResponse } = useProductList(1, 1000)
  const products = productResponse?.items || []

  const items = watch('items') || []

  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined)

  const handleAddProduct = () => {
    if (!selectedProductId) return
    if (items.find((item) => item.productId === selectedProductId)) {
      message.warning('Sản phẩm đã có trong danh sách')
      return
    }
    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return
    const baseUnit = product.productUnits?.find((u) => u.isBaseUnit) ?? product.productUnits?.[0]

    const newItem: CreateImportReceiptItemDto = {
      productId: product.id,
      quantity: 1,
      unitPrice: product.costPrice ?? 0,
      unitId: baseUnit?.id ?? '',
    }

    setValue('items', [...items, newItem])
    setSelectedProductId(undefined)
  }

  const handleRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setValue('items', newItems)
  }

  const handleChangeItem = <K extends 'quantity' | 'unitPrice' | 'unitId'>(
    index: number,
    field: K,
    value: CreateImportReceiptItemDto[K]
  ) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    setValue('items', newItems)
  }

  const columns: ColumnsType<CreateImportReceiptItemDto> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => products.find((p) => p.id === record.productId)?.name || '-',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      render: (_, record) => products.find((p) => p.id === record.productId)?.code || '-',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record, index: number) => (
        <InputNumber
          min={1}
          disabled={disabled}
          value={record.quantity}
          onChange={(val) => handleChangeItem(index, 'quantity', val ?? 1)}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (_, record, index: number) => (
        <InputNumber
          min={0}
          disabled={disabled}
          value={record.unitPrice}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => {
            if (!value) return 0
            const num = Number(value.replace(/\$\s?|(,*)/g, ''))
            return isNaN(num) ? 0 : num
          }}
          onChange={(val) => handleChangeItem(index, 'unitPrice', val ?? 0)}
        />
      ),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unitId',
      key: 'unitId',
      render: (_, record, index) => {
        const product = products.find((p) => p.id === record.productId)
        const units = product?.productUnits || []

        return (
          <Select
            style={{ width: 120 }}
            disabled={disabled}
            value={record.unitId}
            onChange={(value) => handleChangeItem(index, 'unitId', value)}
            options={units.map((u) => ({
              label: u.unitName,
              value: u.id,
            }))}
          />
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, _record, index: number) =>
        disabled ? null : (
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleRemove(index)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        ),
    },
  ]

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <SupplierSearch disabled={disabled} />
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Tên đơn nhập"
            required
            validateStatus={errors.name ? 'error' : undefined}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nhập tên đơn nhập" disabled={disabled} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Mã đơn" validateStatus={errors.code ? 'error' : undefined} help={errors.code?.message}>
            <Controller
              name="code"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nhập mã đơn nhập" disabled={disabled} />}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item label="Chọn sản phẩm" className="w-full">
            <Select
              className="w-full"
              showSearch
              placeholder="Chọn sản phẩm"
              disabled={disabled}
              options={products.map((p) => ({
                label: `${p.code} - ${p.name}`,
                value: p.id,
              }))}
              value={selectedProductId}
              onChange={setSelectedProductId}
              filterOption={(input, option) =>
                String(option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Button onClick={handleAddProduct} disabled={disabled || !selectedProductId} className="sm:mt-7">
            Thêm
          </Button>
        </Col>
        <Col xs={24} sm={8}></Col>
      </Row>

      <Form.Item label="Danh sách sản phẩm">
        <Table
          dataSource={items}
          columns={columns}
          rowKey={(_, index) => String(index)}
          pagination={false}
          locale={{ emptyText: 'Chưa có sản phẩm nào' }}
          scroll={{ x: 'max-content' }}
        />
      </Form.Item>
    </Form>
  )
}

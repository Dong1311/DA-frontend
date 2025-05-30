'use client'

import { Button, Col, Form, Input, InputNumber, message, Popconfirm, Row, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { type CreateImportReceiptDto, type CreateImportReceiptItemDto } from '@/api-sdk'
import { type ProductFormValues } from '@/constants/schema'
import { useProductList } from '@/hooks/product'

import { CreateProductModal } from './CreateProductModal'
import { SupplierSearch } from './SupplierSearch'

type FormValues = CreateImportReceiptDto

export const ImportReceiptForm = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>()

  const { data: productResponse } = useProductList(1, 1000)
  const products = productResponse?.items || []

  const items = watch('items') || []

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined)

  const handleAddProduct = () => {
    if (!selectedProductId) return

    if (items.find((item) => item.productId === selectedProductId)) {
      message.warning('Sản phẩm đã có trong danh sách')
      return
    }

    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return

    const newItem = {
      productId: product.id,
      newProduct: undefined,
      quantity: 1,
      unitPrice: product.costPrice ?? 0,
    }

    setValue('items', [...items, newItem])
    setSelectedProductId(undefined)
  }

  const handleRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setValue('items', newItems)
  }

  const handleChangeItem = (index: number, field: 'quantity' | 'unitPrice', value: number) => {
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    setValue('items', newItems)
  }

  const handleCreateProduct = (newProduct: ProductFormValues) => {
    setValue('items', [
      ...items,
      {
        productId: undefined,
        newProduct,
        quantity: 1,
        unitPrice: newProduct.costPrice ?? 0,
      },
    ])
    setOpenCreateModal(false)
  }

  const columns: ColumnsType<CreateImportReceiptItemDto> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => record.newProduct?.name || products?.find((p) => p.id === record.productId)?.name || '-',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      render: (_, record) => record.newProduct?.code || products?.find((p) => p.id === record.productId)?.code || '-',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record, index: number) => (
        <InputNumber
          min={1}
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
      title: 'Hành động',
      key: 'action',
      render: (_, _record, index: number) => (
        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleRemove(index)}>
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <SupplierSearch />
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
                render={({ field }) => <Input {...field} placeholder="Nhập tên đơn nhập" />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Mã đơn" validateStatus={errors.code ? 'error' : undefined} help={errors.code?.message}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập tên đơn nhập" />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Chọn sản phẩm">
          <Space>
            <Select
              showSearch
              placeholder="Chọn sản phẩm"
              style={{ width: 300 }}
              options={
                products?.map((p) => ({
                  label: `${p.code} - ${p.name}`,
                  value: p.id,
                })) || []
              }
              value={selectedProductId}
              onChange={setSelectedProductId}
              filterOption={(input, option) =>
                String(option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            <Button onClick={handleAddProduct} disabled={!selectedProductId}>
              Thêm
            </Button>

            <Button type="primary" onClick={() => setOpenCreateModal(true)}>
              Thêm sản phẩm mới
            </Button>
          </Space>
        </Form.Item>

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

      <CreateProductModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreate={handleCreateProduct}
      />
    </>
  )
}

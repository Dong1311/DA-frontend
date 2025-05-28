'use client'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select, Space } from 'antd'
import { useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { type CreateImportReceiptDto } from '@/api-sdk'
import { ControlledNumberInput } from '@/components/ControlledNumberInput'
import { type ProductFormValues } from '@/constants/schema'
import { useProductList } from '@/hooks/product'

import { CreateProductModal } from './CreateProductModal'
import { SupplierSearch } from './SupplierSearch'

type FormValues = CreateImportReceiptDto

export const ImportReceiptForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>()

  const { data: products } = useProductList()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [creatingIndex, setCreatingIndex] = useState<number | null>(null)

  const items = watch('items')
  const handleCreateProduct = (newProduct: ProductFormValues) => {
    if (creatingIndex === null) return

    setValue(`items.${creatingIndex}`, {
      productId: undefined,
      newProduct,
      quantity: 1,
      unitPrice: newProduct.costPrice ?? 0,
    })

    setOpenCreateModal(false)
    setCreatingIndex(null)
  }
  return (
    <>
      <Form layout="vertical">
        <SupplierSearch />
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

        <Form.Item label="Danh sách sản phẩm">
          {fields.map((field, index) => {
            const isNewProduct = !!items?.[index]?.newProduct

            return (
              <Space key={field.id} align="start" style={{ display: 'flex', marginBottom: 8, flexWrap: 'wrap' }}>
                {!isNewProduct ? (
                  <Controller
                    name={`items.${index}.productId` as const}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: 250 }}
                        placeholder="Chọn sản phẩm có sẵn"
                        options={
                          products?.map((p) => ({
                            label: `${p.code} - ${p.name}`,
                            value: p.id,
                          })) || []
                        }
                      />
                    )}
                  />
                ) : (
                  <Divider plain type="horizontal" style={{ width: '100%' }}>
                    Tạo sản phẩm mới
                  </Divider>
                )}

                <Button
                  type="link"
                  onClick={() => {
                    if (isNewProduct) {
                      setValue(`items.${index}.newProduct`, undefined)
                      setValue(`items.${index}.productId`, undefined)
                    } else {
                      setCreatingIndex(index)
                      setOpenCreateModal(true)
                    }
                  }}
                >
                  {isNewProduct ? 'Chọn sản phẩm có sẵn' : 'Tạo sản phẩm mới'}
                </Button>

                {isNewProduct && (
                  <>
                    <div style={{ width: 250 }}>
                      <strong>{items[index].newProduct?.name}</strong>
                      <br />
                      Mã: {items[index].newProduct?.code}
                      <br />
                      Giá bán: {items[index].newProduct?.salePrice}
                      <br />
                      Giá nhập: {items[index].newProduct?.costPrice}
                    </div>
                  </>
                )}

                <ControlledNumberInput
                  control={control}
                  name={`items.${index}.quantity` as const}
                  label="Số lượng"
                  errorMessage={errors.items?.[index]?.quantity?.message}
                />
                <ControlledNumberInput
                  control={control}
                  name={`items.${index}.unitPrice` as const}
                  label="Đơn giá"
                  errorMessage={errors.items?.[index]?.unitPrice?.message}
                />

                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(index)}
                  danger
                  style={{ marginTop: 30 }}
                />
              </Space>
            )
          })}

          <Button
            type="dashed"
            onClick={() =>
              append({
                productId: undefined,
                newProduct: undefined,
                quantity: 1,
                unitPrice: 0,
              })
            }
            block
            icon={<PlusOutlined />}
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
      <CreateProductModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false)
          setCreatingIndex(null)
        }}
        onCreate={handleCreateProduct}
      />
    </>
  )
}

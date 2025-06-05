'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin } from 'antd'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { type DisposalReceiptFormValues } from '@/constants/schema'
import { useProductList } from '@/hooks/product'

import { DisposalReceiptItemRow } from './DisposalReceiptItemRow'

export const DisposalReceiptForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<DisposalReceiptFormValues>()

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const productsQuery = useProductList(1, 1000)
  const products = productsQuery.data?.items ?? []
  const watchedItems = useWatch({ control, name: 'items' })

  if (productsQuery.isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spin />
      </div>
    )
  }

  return (
    <Form layout="vertical">
      {fields.map((item, index) => (
        <DisposalReceiptItemRow
          key={item.id}
          index={index}
          remove={remove}
          control={control}
          setValue={setValue}
          products={products}
          watchedItems={watchedItems}
        />
      ))}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => append({ productId: '', unitId: '', quantity: 0, unitPrice: 0 })}
      >
        Thêm sản phẩm
      </Button>
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <Form.Item
            className="sm: mt-3"
            label="Ghi chú"
            validateStatus={errors.note ? 'error' : ''}
            help={errors.note?.message as string}
          >
            <Input.TextArea rows={2} {...field} />
          </Form.Item>
        )}
      />
    </Form>
  )
}

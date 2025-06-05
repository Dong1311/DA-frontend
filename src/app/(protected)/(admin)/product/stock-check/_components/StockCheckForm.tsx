'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Spin } from 'antd'
import dayjs from 'dayjs'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { type StockCheckFormValues } from '@/constants/schema'
import { useProductList } from '@/hooks/product'

import { StockCheckItemRow } from './StockCheckItemRow'

export const StockCheckForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<StockCheckFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'details' })
  const productsQuery = useProductList(1, 1000)
  const products = productsQuery.data?.items ?? []
  const watchedDetails = useWatch({ control, name: 'details' })

  if (productsQuery.isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Spin />
      </div>
    )
  }

  return (
    <Form layout="vertical">
      <Controller
        name="balancedAt"
        control={control}
        render={({ field }) => (
          <Form.Item label="Ngày kiểm" validateStatus={errors.balancedAt && 'error'}>
            <DatePicker
              style={{ width: '100%' }}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) => field.onChange(date?.toISOString())}
            />
          </Form.Item>
        )}
      />

      {fields.map((item, index) => (
        <StockCheckItemRow
          key={item.id}
          index={index}
          remove={remove}
          control={control}
          setValue={setValue}
          products={products}
          watchedDetails={watchedDetails}
        />
      ))}

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => append({ productId: '', unitId: '', quantityInStock: 0, quantityActual: 0 })}
      >
        Thêm sản phẩm
      </Button>
    </Form>
  )
}

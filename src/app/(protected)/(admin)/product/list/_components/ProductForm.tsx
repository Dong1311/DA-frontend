'use client'

import { Form, Input } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

import { ControlledNumberInput } from '@/components/ControlledNumberInput'
import { type ProductFormValues } from '@/constants/schema'

export const ProductForm = ({ isEdit }: { isEdit: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormValues>()

  return (
    <Form layout="vertical">
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Form.Item label="Mã sản phẩm" validateStatus={errors.code && 'error'} help={errors.code?.message}>
            <Input {...field} disabled={isEdit} />
          </Form.Item>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item label="Tên sản phẩm" validateStatus={errors.name && 'error'} help={errors.name?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="shortName"
        control={control}
        render={({ field }) => (
          <Form.Item label="Tên rút gọn" validateStatus={errors.shortName && 'error'} help={errors.shortName?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <ControlledNumberInput
        control={control}
        name="salePrice"
        label="Giá bán"
        errorMessage={errors.salePrice?.message}
      />
      <ControlledNumberInput
        control={control}
        name="costPrice"
        label="Giá nhập"
        errorMessage={errors.costPrice?.message}
      />
      <ControlledNumberInput
        control={control}
        name="stock"
        label="Tồn kho"
        errorMessage={errors.stock?.message}
        disabled={isEdit}
      />
    </Form>
  )
}

'use client'

import { Form, Input } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

import { type SupplierFormValues } from '@/constants/schema'

export const SupplierForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SupplierFormValues>()

  return (
    <Form layout="vertical">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item label="Tên nhà cung cấp" validateStatus={errors.name && 'error'} help={errors.name?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Form.Item label="Số điện thoại" validateStatus={errors.phone && 'error'} help={errors.phone?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="taxCode"
        control={control}
        render={({ field }) => (
          <Form.Item label="Mã số thuế" validateStatus={errors.taxCode && 'error'} help={errors.taxCode?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="group"
        control={control}
        render={({ field }) => (
          <Form.Item label="Nhóm nhà cung cấp" validateStatus={errors.group && 'error'} help={errors.group?.message}>
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Form.Item label="Địa chỉ" validateStatus={errors.address && 'error'} help={errors.address?.message}>
            <Input.TextArea rows={2} {...field} />
          </Form.Item>
        )}
      />
    </Form>
  )
}

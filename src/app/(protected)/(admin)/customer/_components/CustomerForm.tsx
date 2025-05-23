'use client'

import { DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'

import { type CustomerFormValues } from '@/constants/schema'

const { Option } = Select

export const CustomerForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerFormValues>()

  return (
    <Form layout="vertical">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item label="Tên khách hàng" validateStatus={errors.name && 'error'} help={errors.name?.message}>
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
        name="dob"
        control={control}
        render={({ field }) => (
          <Form.Item label="Ngày sinh" validateStatus={errors.dob && 'error'} help={errors.dob?.message}>
            <DatePicker
              style={{ width: '100%' }}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) => field.onChange(date?.toISOString())}
              format="DD/MM/YYYY"
            />
          </Form.Item>
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Form.Item label="Giới tính" validateStatus={errors.gender && 'error'} help={errors.gender?.message}>
            <Select {...field} allowClear>
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Form.Item label="Loại khách" validateStatus={errors.type && 'error'} help={errors.type?.message}>
            <Select {...field} allowClear>
              <Option value="INDIVIDUAL">Cá nhân</Option>
              <Option value="COMPANY">Công ty</Option>
            </Select>
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

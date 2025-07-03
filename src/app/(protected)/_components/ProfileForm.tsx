'use client'

import { Col, Form, Input, Row } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

import { UserRole } from '@/constants/enums'
import { type ProfileFormValues } from '@/constants/schema'
import { useFullProfile } from '@/hooks/user'

import { VietnamAddressSelectorForEdit } from './VietnamAddressSelectorForEdit'

export const ProfileForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>()

  const { data: profile } = useFullProfile()
  const role = profile?.role

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tên người dùng" validateStatus={errors.name && 'error'} help={errors.name?.message}>
            <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Email" validateStatus={errors.email && 'error'} help={errors.email?.message}>
            <Controller name="email" control={control} render={({ field }) => <Input {...field} disabled />} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Mật khẩu mới" validateStatus={errors.password && 'error'} help={errors.password?.message}>
            <Controller name="password" control={control} render={({ field }) => <Input.Password {...field} />} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Xác nhận mật khẩu"
            validateStatus={errors.confirmPassword && 'error'}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
        </Col>

        {role === UserRole.ADMIN && (
          <>
            <Col span={12}>
              <Form.Item
                label="Tên cửa hàng"
                validateStatus={errors.storeName && 'error'}
                help={errors.storeName?.message}
              >
                <Controller name="storeName" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <VietnamAddressSelectorForEdit initialAddress={profile.store.address} />
            </Col>

            <Col span={12}>
              <Form.Item
                label="SĐT cửa hàng"
                validateStatus={errors.storePhone && 'error'}
                help={errors.storePhone?.message}
              >
                <Controller name="storePhone" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mã số giấy phép KD"
                validateStatus={errors.licenseNumber && 'error'}
                help={errors.licenseNumber?.message}
              >
                <Controller
                  name="licenseNumber"
                  control={control}
                  render={({ field }) => <Input {...field} disabled />}
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
    </Form>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type RegisterDto } from '@/api-sdk'
import { Text } from '@/components'
import { FormItemController } from '@/components/FormItemController'
import { RegisterFormSchema, type RegisterFormValues } from '@/constants/schema'
import { useRegisterMutation } from '@/hooks/auth'

import { VietnamAddressSelector } from './VietnamAddressSelector'

interface Props {
  role: RegisterDto.role
}

export default function RegisterForm({ role }: Props) {
  const router = useRouter()

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role,
      storeName: '',
      storeAddress: '',
      storePhone: '',
      licenseNumber: '',
    },
  })

  const { handleSubmit } = methods

  const isAdmin = role === 'ADMIN'
  const mutation = useRegisterMutation(role)
  const onSubmit = ({ confirmPassword: _c, ...data }: RegisterFormValues) => mutation.mutate(data)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  useEffect(() => {
    if (role === 'GUEST') {
      const guestSessionId = localStorage.getItem('guestSessionId')
      if (guestSessionId) {
        methods.setValue('guestSessionId', guestSessionId)
      }
    }
  }, [role, methods])

  if (!isMounted) return null

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="mx-auto mt-20 w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <Text className="mb-6 block text-center text-2xl font-bold">
          Đăng ký tài khoản {isAdmin ? 'cửa hàng' : 'guest'}
        </Text>

        <FormItemController name="name" label="Tên" required render={(field) => <Input {...field} />} />
        <FormItemController name="email" label="Email" required render={(field) => <Input type="email" {...field} />} />
        <FormItemController
          name="password"
          label="Mật khẩu"
          required
          render={(field) => <Input.Password {...field} />}
        />
        <FormItemController
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          required
          render={(field) => <Input.Password {...field} />}
        />

        {isAdmin && (
          <>
            <FormItemController
              name="storeName"
              label="Tên cửa hàng"
              required
              render={(field) => <Input {...field} />}
            />
            <VietnamAddressSelector />
            <FormItemController
              name="storePhone"
              label="Số điện thoại cửa hàng"
              required
              render={(field) => <Input {...field} />}
            />
            <FormItemController
              name="licenseNumber"
              label="Mã số giấy phép kinh doanh"
              required
              render={(field) => <Input {...field} />}
            />
          </>
        )}

        <Button size="large" type="primary" htmlType="submit" className="w-full">
          Đăng ký
        </Button>

        <Button size="large" onClick={() => router.push('/login')} className="mt-3 w-full">
          Đã có tài khoản? Đăng nhập
        </Button>
      </Form>
    </FormProvider>
  )
}

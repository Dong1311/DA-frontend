'use client'

import { Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { type RegisterDto } from '@/api-sdk'
import { Text } from '@/components'
import { useRegisterMutation } from '@/hooks/auth'

interface Props {
  role: RegisterDto['role']
}

export default function RegisterForm({ role }: Props) {
  const router = useRouter()

  const methods = useForm<RegisterDto & { confirmPassword: string }>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const isAdmin = role === 'ADMIN'

  const mutation = useRegisterMutation(role)

  const onSubmit = ({ confirmPassword: _confirmPassword, ...data }: RegisterDto & { confirmPassword: string }) => {
    mutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 shadow-md">
        <Text className="mb-4 block text-center text-2xl font-bold">Register as {role}</Text>

        <Controller
          name="name"
          control={control}
          rules={{ required: 'Vui lòng nhập tên' }}
          render={({ field }) => (
            <Form.Item label="Tên" validateStatus={errors.name && 'error'} help={errors.name?.message}>
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: 'Vui lòng nhập email' }}
          render={({ field }) => (
            <Form.Item label="Email" validateStatus={errors.email && 'error'} help={errors.email?.message}>
              <Input type="email" {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Vui lòng nhập mật khẩu' }}
          render={({ field }) => (
            <Form.Item label="Mật khẩu" validateStatus={errors.password && 'error'} help={errors.password?.message}>
              <Input.Password {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) => value === methods.getValues('password') || 'Mật khẩu không khớp',
          }}
          render={({ field }) => (
            <Form.Item
              label="Xác nhận mật khẩu"
              validateStatus={errors.confirmPassword && 'error'}
              help={errors.confirmPassword?.message}
            >
              <Input.Password {...field} />
            </Form.Item>
          )}
        />

        {isAdmin && (
          <>
            <Controller
              name="storeName"
              control={control}
              render={({ field }) => (
                <Form.Item label="Tên cửa hàng">
                  <Input {...field} />
                </Form.Item>
              )}
            />

            <Controller
              name="storeAddress"
              control={control}
              render={({ field }) => (
                <Form.Item label="Địa chỉ cửa hàng">
                  <Input {...field} />
                </Form.Item>
              )}
            />

            <Controller
              name="storePhone"
              control={control}
              render={({ field }) => (
                <Form.Item label="Số điện thoại cửa hàng">
                  <Input {...field} />
                </Form.Item>
              )}
            />

            <Controller
              name="licenseNumber"
              control={control}
              render={({ field }) => (
                <Form.Item label="Mã số giấy phép kinh doanh">
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </>
        )}

        <button type="submit" className="w-full rounded-md bg-green-600 py-2 text-white disabled:opacity-60">
          Đăng ký
        </button>

        <button
          type="button"
          className="mt-2 w-full rounded-md bg-gray-300 py-2 text-black"
          onClick={() => router.push('/login')}
        >
          Đã có tài khoản? Đăng nhập
        </button>
      </form>
    </FormProvider>
  )
}

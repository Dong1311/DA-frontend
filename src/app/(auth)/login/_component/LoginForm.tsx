'use client'

import { useMutation } from '@tanstack/react-query'
import { Button, Flex, Form, Input, message, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AuthService } from '@/api-sdk'
import { UserRole } from '@/constants/enums'
import { useAuthStore } from '@/stores/authStore'

const { Title, Text } = Typography

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => await AuthService.authControllerLogin({ requestBody: data }),
    onSuccess: (data) => {
      setUser(data.user)
      if (data.user.guestSessionId) {
        localStorage.setItem('guestSessionId', data.user.guestSessionId)
      }

      switch (data.user.role) {
        case UserRole.SUPER_ADMIN:
          router.push('/management')
          break
        case UserRole.ADMIN:
          router.push('/dashboard')
          break
        case UserRole.GUEST:
          router.push('/history')
          break
        default:
          router.push('/')
      }
    },
    onError: (err: any) => {
      console.error('Login failed:', err)
      const errorMsg =
        err?.response?.data?.message || err?.body?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      message.error(errorMsg)
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data)
  }
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-50 px-4 ">
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-10 shadow-lg  "
      >
        <Title level={2} className="mb-8 text-center text-3xl text-gray-900 ">
          Đăng nhập
        </Title>

        <Controller
          name="email"
          control={control}
          rules={{ required: 'Vui lòng nhập email' }}
          render={({ field }) => (
            <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
              <Input {...field} type="email" size="large" autoComplete="username" placeholder="email@example.com" />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Vui lòng nhập mật khẩu' }}
          render={({ field }) => (
            <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
              <Input.Password {...field} size="large" autoComplete="current-password" placeholder="••••••••" />
            </Form.Item>
          )}
        />

        <Form.Item className="mt-6">
          <Button type="primary" htmlType="submit" block size="large" className="bg-blue-600 hover:bg-blue-700">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            block
            danger
            size="large"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
            }}
          >
            Đăng nhập với Google
          </Button>
        </Form.Item>

        <Form.Item className="mt-6 text-center">
          <Text type="secondary">Bạn chưa có tài khoản?</Text>
          <Flex justify="center" gap="large" className="mt-3">
            <Button type="link" size="large" onClick={() => router.push('/register/guest')}>
              Đăng ký Guest
            </Button>
            <Button type="link" size="large" className="text-green-600" onClick={() => router.push('/register/admin')}>
              Đăng ký Cửa hàng
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  )
}

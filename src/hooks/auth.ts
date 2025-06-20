import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthService, type RegisterDto } from '@/api-sdk'
import { useAuthStore } from '@/stores/authStore'
export const useRegisterMutation = (role: RegisterDto['role']) => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterDto) =>
      AuthService.authControllerRegister({ requestBody: data }),
    onSuccess: () => {
      if (role === 'ADMIN') {
        message.success('Đăng ký thành công. Cửa hàng của bạn đang chờ phê duyệt.')
      } else {
        message.success('Đăng ký thành công.')
      }
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    },
    onError: (err) => {
      console.error('Register failed:', err)
      message.error('Đăng ký thất bại. Vui lòng thử lại.')
    },
  })
}

export const useAuthCheck = () => {
  const { user, setUser } = useAuthStore()
  const [isChecking, setIsChecking] = useState(!user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      AuthService.authControllerGetProfile()
        .then(setUser)
        .catch(() => router.replace('/login'))
        .finally(() => setIsChecking(false))
    } else {
      setIsChecking(false)
    }
  }, [user, setUser, router])

  return { isChecking, user }
}

export const useLogout = () => {
  const router = useRouter()

  const logout = async () => {
    try {
      await AuthService.authControllerLogout()
      router.replace('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { logout }
}


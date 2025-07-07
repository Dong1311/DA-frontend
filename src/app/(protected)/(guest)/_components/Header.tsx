'use client'

import { LogoutOutlined } from '@ant-design/icons'
import { Flex, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'

import { AuthService } from '@/api-sdk'

export const RegisteredGuestHeader = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await AuthService.authControllerLogout()
      router.replace('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Flex align="center" justify="space-between" className="h-[50px] w-full bg-white px-4 text-sm">
      <div className="ms-3 gap-2">
        {/* <img src="/images/kiotviet_logo.png" alt="logo" className="h-6" style={{ width: '40px', height: '40px' }} />
        <Text className="text-[20px] font-bold text-black">KiotViet</Text> */}
      </div>

      <Flex align="center" className="me-3 gap-4 text-black">
        <Tooltip title="Logout">
          <LogoutOutlined className="cursor-pointer text-lg" onClick={handleLogout} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

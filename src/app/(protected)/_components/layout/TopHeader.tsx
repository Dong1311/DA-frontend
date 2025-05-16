'use client'

import { LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Flex, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'

import { AuthService } from '@/api-sdk'
import { Text } from '@/components'

export const TopHeader = () => {
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
    <Flex align="center" justify="space-between" className="h-[50px] border-b border-gray-200 bg-white px-4 text-sm">
      <Flex align="center" className="ms-3 gap-2">
        <img src="/images/kiotviet_logo.png" alt="logo" className="h-6" style={{ width: '40px', height: '40px' }} />
        <Text className="text-[20px] font-bold text-black">KiotViet</Text>
      </Flex>

      <Flex align="center" className="gap-4 text-black">
        <Badge count={5} size="small">
          <MailOutlined className="text-lg" />
        </Badge>
        <SettingOutlined className="cursor-pointer text-lg" />
        <Text className="font-semibold">0386959930</Text>
        <UserOutlined className="text-lg" />

        <Tooltip title="Logout">
          <LogoutOutlined className="cursor-pointer text-lg" onClick={handleLogout} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

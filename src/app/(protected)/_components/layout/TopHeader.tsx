'use client'

import { MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Flex } from 'antd'

import { Text } from '@/components'

export const TopHeader = () => {
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
      </Flex>
    </Flex>
  )
}

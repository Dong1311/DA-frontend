'use client'
import { EyeOutlined, MessageOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

import { HoverMenuItem } from './HoverMenuItem'

export const GuestSidebarHeader = () => {
  return (
    <Flex className="w-full bg-[#0070f4] text-white">
      <Flex justify="space-between" wrap="wrap" className="hidden px-4 md:flex">
        <Flex flex={1} wrap="wrap" gap={8}>
          <HoverMenuItem icon={<EyeOutlined />} label="Lịch sử mua hàng" href="/history" />

          <HoverMenuItem icon={<MessageOutlined />} label="Tin nhắn" href="/chat" target="_blank" />
        </Flex>
      </Flex>
    </Flex>
  )
}

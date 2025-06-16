'use client'

import { Flex } from 'antd'

import { RegisteredGuestHeader } from './Header'

export const RegisteredGuestLayout = () => {
  return (
    <Flex vertical gap={16} className="w-full p-4">
      <RegisteredGuestHeader />
    </Flex>
  )
}

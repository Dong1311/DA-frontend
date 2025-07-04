'use client'

import { Layout, Spin } from 'antd'
import { Flex } from 'antd'
import React from 'react'

import { useClientReady } from '@/hooks/useClientReady'
import { useNProgress } from '@/utils/nprogress'

import { GuestSidebarHeader } from './_components/GuestSidebarHeader'
import { RegisteredGuestHeader } from './_components/Header'

const { Content } = Layout

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  useNProgress()
  const isClientReady = useClientReady()

  if (!isClientReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <RegisteredGuestHeader />
      <GuestSidebarHeader />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Flex className="min-h-[360px] rounded-lg bg-white">{children}</Flex>
        </Content>
      </Layout>
    </Layout>
  )
}

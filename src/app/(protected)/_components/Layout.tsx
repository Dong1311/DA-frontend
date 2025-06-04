'use client'

import { Layout, Spin } from 'antd'
import { Flex } from 'antd'
import React from 'react'

import { useClientReady } from '@/hooks/useClientReady'
import { useNProgress } from '@/utils/nprogress'

import { SidebarHeader } from './layout/SidebarHeader'
import { TopHeader } from './layout/TopHeader'

const { Content } = Layout

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useNProgress()
  const isClientReady = useClientReady()
  if (!isClientReady) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Spin size="large" />
        </div>
      </>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <TopHeader />
      <SidebarHeader />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Flex className="min-h-[360px] rounded-lg bg-[#f5f6f8] p-6">{children}</Flex>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

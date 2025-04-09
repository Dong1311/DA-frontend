'use client'
import { Layout } from 'antd'
import { Flex } from 'antd'
import React from 'react'

import { SidebarHeader } from './layout/SidebarHeader'
import { TopHeader } from './layout/TopHeader'
const { Content } = Layout

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <TopHeader />
      <SidebarHeader />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Flex className="min-h-[360px] rounded-lg bg-white p-6">{children}</Flex>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

'use client'
import { Layout } from 'antd'
import { Flex } from 'antd'
import React from 'react'

import { SidebarHeader } from './layout/SidebarHeader'
import { TopHeader } from './layout/TopHeader'
const { Content, Footer } = Layout

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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout

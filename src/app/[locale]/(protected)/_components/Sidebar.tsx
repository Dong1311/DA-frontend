'use client'

import { Flex, Layout, Menu } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

import { Split } from '@/components'
import {
  CashBook,
  Collapsed,
  Customer,
  Discount,
  HomeIcon,
  List,
  Product,
  Report,
  Setting,
  Store,
  Transport,
  Uncollapsed,
} from '#/icons'
const { Sider } = Layout

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}

type MenuItem = Required<Parameters<typeof Menu>['0']>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Tổng quan', '1', <HomeIcon />),
  getItem('Đơn hàng', '2', <List />, [
    getItem('Danh sách đơn hàng', '13'),
    getItem('Đơn hàng nháp', '14'),
    getItem('Trả hàng', '15'),
    getItem('Đơn chưa hoàn tất', '16'),
  ]),
  getItem('Vận chuyển', '3', <Transport />, [getItem('Tổng quan', '17'), getItem('Vận đơn', '18')]),
  getItem('Sản phẩm', '4', <Product />, [
    getItem('Danh sách sản phẩm', '19'),
    getItem('Danh mục sản phẩm', '20'),
    getItem('Bảng giá', '21'),
  ]),
  getItem('Quản lý kho', '5', <Store />, [
    getItem('Tồn kho', '19'),
    getItem('Tồn kho', '20'),
    getItem('Đặt hàng nhập', '21'),
    getItem('Nhập hàng', '19'),
    getItem('Trả hàng nhập', '20'),
    getItem('Chuyển kho', '21'),
    getItem('Nhà cung cấp', '21'),
  ]),
  getItem('Khách hàng', '6', <Customer />, [
    getItem('Khách hàng', '19'),
    getItem('Nhóm khách hàng', '20'),
    getItem('Bảng giá', '21'),
  ]),
  getItem('Khuyến mại', '7', <Discount />),
  getItem('Sổ quỹ', '8', <CashBook />),
  getItem('Báo cáo', '9', <Report />, [getItem('Tổng quan báo cáo', '19'), getItem('Danh sách báo cáo', '20')]),
]

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys.length === 0 ? [] : [keys[keys.length - 1]])
  }
  return (
    <Sider
      style={{ ...siderStyle, backgroundColor: '#001529' }}
      width={230}
      collapsedWidth={55}
      trigger={null}
      collapsed={collapsed}
      breakpoint="lg"
      onBreakpoint={(broken) => setCollapsed(broken)}
    >
      <Flex justify="space-between" className="h-full" vertical>
        <Flex justify="flex-start" vertical>
          <Flex
            align="center"
            justify={collapsed ? 'center' : 'space-between'}
            className="h-14 bg-[#001529] text-white"
          >
            <Link href="/" className="ms-2 truncate text-lg font-bold">
              {!collapsed && 'MyLogo'}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg text-white hover:opacity-80 focus:outline-none"
            >
              {collapsed ? <Uncollapsed /> : <Collapsed />}
            </button>
          </Flex>
          <Split className=" translate-y-[-3px]" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            className="mt-2"
            mode="inline"
            items={items}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
            expandIcon={null}
          />
          <Split className=" translate-y-[-3px]" />
        </Flex>
        <Menu theme="dark" className="mb-2" mode="inline" items={[getItem('Cấu hình', '10', <Setting />)]} />
      </Flex>
    </Sider>
  )
}

export default Sidebar

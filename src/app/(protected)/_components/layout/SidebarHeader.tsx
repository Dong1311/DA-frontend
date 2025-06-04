'use client'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CheckSquareOutlined,
  DropboxOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SwapOutlined,
  TagsOutlined,
  TeamOutlined,
  UndoOutlined,
  UploadOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { Flex } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'

import { HoverMenuItem } from './HoverMenuItem'

const SubItem = ({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) => {
  const router = useRouter()
  return (
    <Flex
      className="cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-[#005ac3]"
      onClick={() => href && router.push(href)}
    >
      {icon}
      <Text className="whitespace-nowrap font-medium text-white">{label}</Text>
    </Flex>
  )
}

export const SidebarHeader = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Flex className="w-full bg-[#0070f4] text-white">
      <Flex justify="space-between" wrap="wrap" className="hidden px-4 md:flex">
        <Flex flex={1} wrap="wrap" gap={8}>
          <HoverMenuItem icon={<EyeOutlined />} label="Tổng quan" href="/dashboard" />

          <HoverMenuItem icon={<DropboxOutlined />} label="Hàng hóa">
            <SubItem icon={<AppstoreOutlined />} label="Danh mục" href="/product/list" />
            <SubItem icon={<FileDoneOutlined />} label="Đơn thuốc mẫu" />
            <SubItem icon={<TagsOutlined />} label="Bảng giá" href="/product/pricebook" />
            <SubItem icon={<CheckSquareOutlined />} label="Kiểm kho" />
          </HoverMenuItem>

          <HoverMenuItem icon={<SwapOutlined />} label="Giao dịch">
            <SubItem icon={<ShoppingOutlined />} label="Đặt hàng" />
            <SubItem icon={<FileExcelOutlined />} label="Hóa đơn" href="/invoice" />
            <SubItem icon={<UndoOutlined />} label="Trả hàng" />
            <SubItem icon={<UploadOutlined />} label="Nhập hàng" href="/import-receipt" />
            <SubItem icon={<FileDoneOutlined />} label="Xuất huỷ" />
          </HoverMenuItem>

          <HoverMenuItem icon={<TeamOutlined />} label="Đối tác">
            <SubItem icon={<UserOutlined />} label="Khách hàng" href="/customer" />
            <SubItem icon={<UserSwitchOutlined />} label="Nhà cung cấp" href="/supplier" />
          </HoverMenuItem>
          <HoverMenuItem icon={<FileTextOutlined />} label="Báo cáo">
            <SubItem icon={<BarChartOutlined />} label="Cuối ngày" />
            <SubItem icon={<ShoppingCartOutlined />} label="Bán hàng" />
            <SubItem icon={<ShoppingOutlined />} label="Đặt hàng" />
            <SubItem icon={<DropboxOutlined />} label="Hàng hóa" />
            <SubItem icon={<UserOutlined />} label="Khách hàng" />
          </HoverMenuItem>
        </Flex>

        <Flex wrap="wrap" gap={8} justify="end">
          <a href="/sale" target="_blank" rel="noopener noreferrer">
            <HoverMenuItem icon={<ShopOutlined />} label="Bán hàng" />
          </a>
        </Flex>
      </Flex>

      <Flex justify="start" align="center" className="px-4 py-2 md:hidden">
        <button onClick={() => setCollapsed(!collapsed)} className="text-lg text-white">
          ☰
        </button>
      </Flex>

      {collapsed && (
        <Flex vertical justify="start" gap={8} className="px-4 pb-2 md:hidden">
          <HoverMenuItem icon={<EyeOutlined />} label="Tổng quan" />
          <HoverMenuItem icon={<DropboxOutlined />} label="Hàng hóa" />
          <HoverMenuItem icon={<SwapOutlined />} label="Giao dịch" />
          <HoverMenuItem icon={<TeamOutlined />} label="Đối tác" />
          <HoverMenuItem icon={<UserOutlined />} label="Nhân viên" />
          <HoverMenuItem icon={<FileTextOutlined />} label="Báo cáo" />
          <HoverMenuItem icon={<ShoppingCartOutlined />} label="Bán Online" />
          <HoverMenuItem icon={<ShopOutlined />} label="Bán hàng" />
        </Flex>
      )}
    </Flex>
  )
}

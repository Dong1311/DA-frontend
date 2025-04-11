'use client'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CarOutlined,
  CheckSquareOutlined,
  DeliveredProcedureOutlined,
  DollarOutlined,
  DropboxOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FundOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  SwapOutlined,
  TagsOutlined,
  TeamOutlined,
  UndoOutlined,
  UploadOutlined,
  UserAddOutlined,
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
            <SubItem icon={<MedicineBoxOutlined />} label="Danh mục thuốc" />
            <SubItem icon={<FileDoneOutlined />} label="Đơn thuốc mẫu" />
            <SubItem icon={<TagsOutlined />} label="Thiết lập giá" href="/product/price-book" />
            <SubItem icon={<CheckSquareOutlined />} label="Kiểm kho" />
          </HoverMenuItem>

          <HoverMenuItem icon={<SwapOutlined />} label="Giao dịch">
            <SubItem icon={<ShoppingOutlined />} label="Đặt hàng" />
            <SubItem icon={<FileExcelOutlined />} label="Hóa đơn" />
            <SubItem icon={<DeliveredProcedureOutlined />} label="Vận đơn" />
            <SubItem icon={<UndoOutlined />} label="Trả hàng" />
            <SubItem icon={<UploadOutlined />} label="Nhập hàng" />
            <SubItem icon={<UploadOutlined />} label="Trả hàng nhập" />
            <SubItem icon={<FileDoneOutlined />} label="Xuất huỷ" />
          </HoverMenuItem>

          <HoverMenuItem icon={<TeamOutlined />} label="Đối tác">
            <SubItem icon={<UserOutlined />} label="Khách hàng" />
            <SubItem icon={<UserSwitchOutlined />} label="Nhà cung cấp" />
            <SubItem icon={<CarOutlined />} label="Đối tác giao hàng" />
            <SubItem icon={<MedicineBoxOutlined />} label="Bác sĩ" />
          </HoverMenuItem>

          <HoverMenuItem icon={<UserOutlined />} label="Nhân viên">
            <SubItem icon={<UserOutlined />} label="Nhân viên" />
            <SubItem icon={<ScheduleOutlined />} label="Lịch làm việc" />
            <SubItem icon={<CalendarOutlined />} label="Chấm công" />
            <SubItem icon={<SolutionOutlined />} label="Bảng tính lương" />
            <SubItem icon={<TagsOutlined />} label="Thiết lập hoa hồng" />
            <SubItem icon={<SettingOutlined />} label="Thiết lập nhân viên" />
          </HoverMenuItem>

          <HoverMenuItem icon={<DollarOutlined />} label="Sổ quỹ" />

          <HoverMenuItem icon={<FileTextOutlined />} label="Báo cáo">
            <SubItem icon={<BarChartOutlined />} label="Cuối ngày" />
            <SubItem icon={<ShoppingCartOutlined />} label="Bán hàng" />
            <SubItem icon={<ShoppingOutlined />} label="Đặt hàng" />
            <SubItem icon={<DropboxOutlined />} label="Hàng hóa" />
            <SubItem icon={<UserOutlined />} label="Khách hàng" />
            <SubItem icon={<UserSwitchOutlined />} label="Nhà cung cấp" />
            <SubItem icon={<UserAddOutlined />} label="Nhân viên" />
            <SubItem icon={<AppstoreOutlined />} label="Kênh bán hàng" />
            <SubItem icon={<FundOutlined />} label="Tài chính" />
          </HoverMenuItem>

          <HoverMenuItem icon={<ShoppingCartOutlined />} label="Bán Online" />
        </Flex>

        <Flex wrap="wrap" gap={8} justify="end">
          <HoverMenuItem icon={<ShopOutlined />} label="Bán hàng" />
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
          <HoverMenuItem icon={<DollarOutlined />} label="Sổ quỹ" />
          <HoverMenuItem icon={<FileTextOutlined />} label="Báo cáo" />
          <HoverMenuItem icon={<ShoppingCartOutlined />} label="Bán Online" />
          <HoverMenuItem icon={<ShopOutlined />} label="Bán hàng" />
        </Flex>
      )}
    </Flex>
  )
}

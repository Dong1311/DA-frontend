'use client'
import { Card, Checkbox, Input, Space } from 'antd'

import { Text } from '@/components'

export const SupplierFilters = () => {
  return (
    <Space direction="vertical" size="middle" className="w-[250px]">
      <Card size="small" title={<Text className="font-semibold text-black">Loại nhà cung cấp</Text>}>
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox>Công ty</Checkbox>
            <Checkbox>Cá nhân</Checkbox>
            <Checkbox>Đại lý</Checkbox>
            <Checkbox>Nhà phân phối</Checkbox>
            <Checkbox>Nhà sản xuất</Checkbox>
          </Space>
        </Checkbox.Group>
      </Card>

      <Card size="small" title={<Text className="font-semibold text-black">Khu vực</Text>}>
        <Input placeholder="Tìm kiếm khu vực" size="small" className="mb-2" />
        <Space direction="vertical">
          <Checkbox>Tất cả</Checkbox>
          <Checkbox>Miền Bắc</Checkbox>
          <Checkbox>Miền Trung</Checkbox>
          <Checkbox>Miền Nam</Checkbox>
        </Space>
      </Card>

      <Card size="small" title={<Text className="font-semibold text-black">Tình trạng nhà cung cấp</Text>}>
        <Input placeholder="Tìm kiếm tình trạng" size="small" className="mb-2" />
        <Space direction="vertical">
          <Checkbox>Tất cả</Checkbox>
          <Checkbox>Đang hoạt động</Checkbox>
          <Checkbox>Ngừng cung cấp</Checkbox>
          <Checkbox>Tiềm năng</Checkbox>
        </Space>
      </Card>
    </Space>
  )
}

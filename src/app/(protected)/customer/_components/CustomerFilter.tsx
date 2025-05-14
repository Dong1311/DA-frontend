'use client'
import { Card, Checkbox, Input, Space } from 'antd'

import { Text } from '@/components'

export const CustomerFilters = () => {
  return (
    <Space direction="vertical" size="middle" className="w-[250px]">
      <Card size="small" title={<Text className="font-semibold text-black">Loại hàng</Text>}>
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox>Thuốc</Checkbox>
            <Checkbox>Hàng hóa thường</Checkbox>
            <Checkbox>Hàng hóa - lô, hạn sử dụng</Checkbox>
            <Checkbox>Dịch vụ</Checkbox>
            <Checkbox>Combo - Đóng gói</Checkbox>
          </Space>
        </Checkbox.Group>
      </Card>

      <Card size="small" title={<Text className="font-semibold text-black">Nhóm hàng</Text>}>
        <Input placeholder="Tìm kiếm nhóm hàng" size="small" className="mb-2" />
        <Space direction="vertical">
          <Checkbox>Tất cả</Checkbox>
          <Checkbox>Thực phẩm chức năng</Checkbox>
          <Checkbox>Dụng cụ Y Tế</Checkbox>
          <Checkbox>Thuốc chống viêm</Checkbox>
          <Checkbox>Thuốc Dị Ứng</Checkbox>
        </Space>
      </Card>
      <Card size="small" title={<Text className="font-semibold text-black">Nhóm hàng</Text>}>
        <Input placeholder="Tìm kiếm nhóm hàng" size="small" className="mb-2" />
        <Space direction="vertical">
          <Checkbox>Tất cả</Checkbox>
          <Checkbox>Thực phẩm chức năng</Checkbox>
          <Checkbox>Dụng cụ Y Tế</Checkbox>
          <Checkbox>Thuốc chống viêm</Checkbox>
          <Checkbox>Thuốc Dị Ứng</Checkbox>
        </Space>
      </Card>
    </Space>
  )
}

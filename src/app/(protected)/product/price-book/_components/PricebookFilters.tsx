'use client'
import { Card, Input, Select, Space } from 'antd'

import { Text } from '@/components'

export const PricebookFilters = () => {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Card size="small" title={<Text className="font-semibold text-black">Bảng giá</Text>}>
        <Select
          mode="multiple"
          defaultValue={['Bảng giá chung']}
          style={{ width: '100%' }}
          options={[{ value: 'Bảng giá chung', label: 'Bảng giá chung' }]}
        />
      </Card>

      <Card size="small" title={<Text className="font-semibold text-black">Nhóm hàng</Text>}>
        <Input placeholder="Tìm kiếm nhóm hàng" size="small" className="mb-2" />
        <Space direction="vertical">
          <Text>Tất cả</Text>
          <Text>Thực phẩm chức năng</Text>
          <Text>Dụng Cụ Y Tế</Text>
          <Text>Thuốc chống viêm</Text>
          <Text>Thuốc Dị Ứng</Text>
        </Space>
      </Card>
      <Card size="small" title={<Text className="font-semibold text-black">Nhóm hàng</Text>}>
        <Input placeholder="Tìm kiếm nhóm hàng" size="small" className="mb-2" />
        <Space direction="vertical">
          <Text>Tất cả</Text>
          <Text>Thực phẩm chức năng</Text>
          <Text>Dụng Cụ Y Tế</Text>
          <Text>Thuốc chống viêm</Text>
          <Text>Thuốc Dị Ứng</Text>
        </Space>
      </Card>
      <Card size="small" title={<Text className="font-semibold text-black">Tồn kho</Text>}>
        <Text>Chỉ hiện hàng còn tồn kho</Text>
      </Card>
    </Space>
  )
}

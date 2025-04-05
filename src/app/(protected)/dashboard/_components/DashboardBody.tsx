'use client'

import { DollarCircleOutlined, DownOutlined, UndoOutlined } from '@ant-design/icons'
import { Dropdown, Flex, Tabs } from 'antd'

import { Text } from '@/components'

const { TabPane } = Tabs

const items = [
  { key: 'month', label: 'Tháng này' },
  { key: 'last-month', label: 'Tháng trước' },
]

export const DashboardBody = () => {
  return (
    <Flex vertical className="w-full gap-4 bg-[#f5f6f8] p-4">
      <Flex vertical className="rounded bg-white p-4 shadow-sm">
        <Text className="mb-4 text-[16px] font-semibold text-black">KẾT QUẢ BÁN HÀNG HÔM NAY</Text>
        <Flex className="divide-x overflow-hidden rounded border">
          <Flex vertical className="flex-1 items-center justify-center gap-1 p-4">
            <DollarCircleOutlined className="text-[24px] text-blue-600" />
            <Text className="text-sm text-gray-600">0 Hóa đơn</Text>
            <Text className="text-[20px] font-semibold text-blue-600">0</Text>
            <Text className="text-xs text-gray-500">Doanh thu</Text>
          </Flex>

          <Flex vertical className="flex-1 items-center justify-center gap-1 p-4">
            <UndoOutlined className="text-[24px] text-orange-500" />
            <Text className="text-sm text-gray-600">0 phiếu</Text>
            <Text className="text-[20px] font-semibold text-orange-500">0</Text>
            <Text className="text-xs text-gray-500">Trả hàng</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex vertical className="rounded bg-white p-4 shadow-sm">
        <Flex justify="space-between" align="center" className="mb-2">
          <Text className="text-[16px] font-semibold text-black">
            DOANH THU THUẦN THÁNG NÀY <span className="text-blue-600">→ 0</span>
          </Text>
          <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <Flex className="cursor-pointer items-center gap-1 text-blue-600">
              <Text className="text-sm font-medium">Tháng này</Text>
              <DownOutlined />
            </Flex>
          </Dropdown>
        </Flex>

        {/* Tabs */}
        <Tabs defaultActiveKey="1" className="text-black">
          <TabPane tab="Theo ngày" key="1">
            <Flex vertical className="min-h-[200px] items-center justify-center">
              <img src="/empty-box.svg" className="size-10 opacity-40" />
              <Text className="mt-2 text-gray-400">Không có dữ liệu</Text>
            </Flex>
          </TabPane>
          <TabPane tab="Theo giờ" key="2" disabled />
          <TabPane tab="Theo thứ" key="3" disabled />
        </Tabs>
      </Flex>
    </Flex>
  )
}

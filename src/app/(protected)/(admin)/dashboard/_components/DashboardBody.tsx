'use client'

import { DollarCircleOutlined, DownOutlined, UndoOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

import { Text } from '@/components'

import { RevenueTabs } from './Tabs'

const items = [
  { key: 'month', label: 'Tháng này' },
  { key: 'last-month', label: 'Tháng trước' },
]

export const DashboardBody = () => {
  return (
    <div className="flex w-full flex-col gap-4 bg-white">
      <div className="flex flex-col rounded bg-white shadow-sm">
        <Text className="mb-4 text-[16px] font-semibold text-black">KẾT QUẢ BÁN HÀNG HÔM NAY</Text>
        <div className="flex divide-x overflow-hidden rounded ">
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            <DollarCircleOutlined className="text-[24px] text-blue-600" />
            <Text className="text-sm text-gray-600">0 Hóa đơn</Text>
            <Text className="text-[20px] font-semibold text-blue-600">0</Text>
            <Text className="text-xs text-gray-500">Doanh thu</Text>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            <UndoOutlined className="text-[24px] text-orange-500" />
            <Text className="text-sm text-gray-600">0 phiếu</Text>
            <Text className="text-[20px] font-semibold text-orange-500">0</Text>
            <Text className="text-xs text-gray-500">Trả hàng</Text>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col rounded bg-white shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <Text className="text-[16px] font-semibold text-black">
            DOANH THU THUẦN THÁNG NÀY <span className="text-blue-600">→ 0</span>
          </Text>
          <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <div className="flex cursor-pointer items-center gap-1 text-blue-600">
              <Text className="text-sm font-medium">Tháng này</Text>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>

        <RevenueTabs />
      </div>
    </div>
  )
}

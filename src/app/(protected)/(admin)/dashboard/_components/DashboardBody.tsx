'use client'

import { DollarCircleOutlined, DownOutlined, UndoOutlined } from '@ant-design/icons'
import { Dropdown, Spin } from 'antd'
import dayjs from 'dayjs'

import { Text } from '@/components'
import { useDailySummary } from '@/hooks/useDailySummary'

import { RevenueTabs } from './Tabs'

const items = [
  { key: 'month', label: 'Tháng này' },
  { key: 'last-month', label: 'Tháng trước' },
]

export const DashboardBody = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const { data: reportToday, isLoading } = useDailySummary({ date: today })

  return (
    <div className="flex w-full flex-col gap-4 bg-white p-4">
      <div className="flex flex-col rounded bg-white p-4 shadow-sm">
        <Text className="mb-4 text-[16px] font-semibold text-black">
          KẾT QUẢ BÁN HÀNG HÔM NAY {dayjs(today).format('DD/MM')}
        </Text>

        {isLoading ? (
          <div className="flex justify-center p-6">
            <Spin />
          </div>
        ) : (
          <div className="flex divide-x overflow-hidden rounded border">
            <div className="flex flex-1 flex-col items-center justify-center gap-1 p-4">
              <DollarCircleOutlined className="text-[24px] text-blue-600" />
              <Text className="text-sm text-gray-600">{reportToday?.totalInvoices ?? 0} Hóa đơn</Text>
              <Text className="text-[20px] font-semibold text-blue-600">
                {reportToday?.totalRevenue?.toLocaleString() ?? '0'}
              </Text>
              <Text className="text-xs text-gray-500">Doanh thu</Text>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1 p-4">
              <UndoOutlined className="text-[24px] text-orange-500" />
              <Text className="text-sm text-gray-600">{reportToday?.totalReturns ?? 0} phiếu trả hàng</Text>
              <Text className="text-[20px] font-semibold text-orange-500">
                {(reportToday?.totalRefund ?? 0).toLocaleString()}
              </Text>
              <Text className="text-xs text-gray-500">Tiền hoàn lại</Text>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1 p-4">
              <Text className="text-[24px] font-bold text-green-600">📦</Text>
              <Text className="text-sm text-gray-600">{reportToday?.totalImportReceipts ?? 0} phiếu nhập</Text>
              <Text className="text-[20px] font-semibold text-green-600"></Text>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col rounded bg-white p-4 shadow-sm">
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

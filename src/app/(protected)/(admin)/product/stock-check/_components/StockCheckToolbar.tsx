'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'
import { useState } from 'react'

import { useStockCheckList } from '@/hooks/stock-check'
import { exportStockChecksWithDetailsToExcel } from '@/utils/exportToExcel'

import { CreateStockCheckModal } from './CreateStockCheckModal'

export const StockCheckToolbar = () => {
  const [open, setOpen] = useState(false)

  const { data } = useStockCheckList(1, 1000)
  const handleExport = () => {
    const stockChecks = data?.items ?? []
    if (!stockChecks.length) return message.warning('Không có dữ liệu để xuất')
    exportStockChecksWithDetailsToExcel(stockChecks)
  }

  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          <span className="hidden lg:inline">Thêm mới</span>
        </Button>

        <Button icon={<FileExcelOutlined />} onClick={handleExport}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>

      <CreateStockCheckModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'
import { useState } from 'react'

import { useImportReceiptList } from '@/hooks/import-receipt'
import { exportImportReceiptsToExcel } from '@/utils/exportToExcel'

import { CreateImportReceiptModal } from './CreateImportReceiptModal'

export const ImportReceiptToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useImportReceiptList(1, 1000)
  const handleExport = () => {
    const receipts = data?.items ?? []
    if (!receipts.length) return message.warning('Không có dữ liệu để xuất')
    exportImportReceiptsToExcel(receipts)
  }
  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8} className="w-full">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          <span className="hidden lg:inline">Thêm mới</span>
        </Button>

        <Button icon={<FileExcelOutlined />} onClick={handleExport}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>

      <CreateImportReceiptModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'
import { useState } from 'react'

import { useDisposalReceiptList } from '@/hooks/disposal-receipt'
import { exportDisposalReceiptsToExcel } from '@/utils/exportToExcel'

import { CreateDisposalReceiptModal } from './CreateDisposalReceiptModal'

export const DisposalReceiptToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useDisposalReceiptList(1, 1000)

  const handleExport = () => {
    const receipts = data?.items ?? []
    if (!receipts.length) return message.warning('Không có dữ liệu để xuất')
    exportDisposalReceiptsToExcel(receipts)
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

      <CreateDisposalReceiptModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

'use client'

import { BarsOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useState } from 'react'

// import { useImportReceiptList } from '@/hooks/importReceipt'
// import { exportImportReceiptsToExcel } from '@/utils/exportToExcel'
import { CreateImportReceiptModal } from './CreateImportReceiptModal'

export const ImportReceiptToolbar = () => {
  const [open, setOpen] = useState(false)
  // const { data } = useImportReceiptList()

  // const handleExport = () => {
  //   if (!data || data.length === 0) {
  //     return message.warning('Không có dữ liệu để xuất')
  //   }
  //   exportImportReceiptsToExcel(data)
  // }

  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8} className="w-full">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          <span className="hidden lg:inline">Thêm mới</span>
        </Button>

        {/* <Button icon={<FileExcelOutlined />} onClick={handleExport}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button> */}

        <Button icon={<BarsOutlined />} />
      </Flex>

      <CreateImportReceiptModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

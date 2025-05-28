'use client'

import { BarsOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

// import { useInvoiceList } from '@/hooks/invoice'
// import { exportInvoicesToExcel } from '@/utils/exportToExcel'

export const InvoiceToolbar = () => {
  // const { data } = useInvoiceList()

  // const handleExport = () => {
  //   if (!data || data.length === 0) {
  //     return message.warning('Không có dữ liệu để xuất')
  //   }
  //   exportInvoicesToExcel(data)
  // }

  return (
    <>
      <Flex justify="flex-end" gap={8}>
        <Button icon={<FileExcelOutlined />}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>
    </>
  )
}

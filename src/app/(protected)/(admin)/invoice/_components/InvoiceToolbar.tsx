'use client'

import { BarsOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'

import { useInvoiceList } from '@/hooks/invoice'
import { exportInvoicesToExcel } from '@/utils/exportToExcel'

export const InvoiceToolbar = () => {
  const { data } = useInvoiceList(1, 1000)
  const handleExport = () => {
    const invoices = data?.items ?? []
    if (!invoices.length) return message.warning('Không có dữ liệu để xuất')
    exportInvoicesToExcel(invoices)
  }
  return (
    <>
      <Flex justify="flex-end" gap={8}>
        <Button icon={<FileExcelOutlined />} onClick={handleExport}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>
    </>
  )
}

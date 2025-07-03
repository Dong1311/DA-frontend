'use client'

import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'
import { useState } from 'react'

import { useCustomerList } from '@/hooks/customer'
import { exportCustomersToExcel } from '@/utils/exportToExcel'

import { CreateCustomerModal } from './CreateCustomerModal'

export const CustomerToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useCustomerList(1, 1000)

  const handleExport = () => {
    const customers = data?.items ?? []
    if (!customers.length) return message.warning('Không có dữ liệu để xuất')
    exportCustomersToExcel(customers)
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
      </Flex>

      <CreateCustomerModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

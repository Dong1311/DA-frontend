'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { message } from 'antd'
import { useState } from 'react'

import { useProductList } from '@/hooks/useProductList'
import { exportProductsToExcel } from '@/utils/exportProductsToExcel'

import { CreateCustomerModal } from './CreateCustomerModal'

export const CustomerToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useProductList()

  const handleExport = () => {
    if (!data || data.length === 0) {
      return message.warning('Không có dữ liệu để xuất')
    }
    exportProductsToExcel(data)
  }

  return (
    <>
      <Flex justify="flex-end" gap={8}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Thêm mới
        </Button>
        <Button icon={<UploadOutlined />}>Import</Button>
        <Button icon={<FileExcelOutlined />} onClick={handleExport}>
          Xuất file
        </Button>
        <Button icon={<BarsOutlined />} />
      </Flex>

      <CreateCustomerModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

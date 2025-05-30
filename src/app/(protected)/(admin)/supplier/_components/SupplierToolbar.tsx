'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { message } from 'antd'
import { useState } from 'react'

import { useSupplierList } from '@/hooks/supplier'
import { exportSuppliersToExcel } from '@/utils/exportToExcel'

import { CreateSupplierModal } from './CreateSupplierModal'

export const SupplierToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useSupplierList(1, 1000)

  const handleExport = () => {
    if (!data || data.length === 0) {
      return message.warning('Không có dữ liệu để xuất')
    }
    exportSuppliersToExcel(data)
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

      <CreateSupplierModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

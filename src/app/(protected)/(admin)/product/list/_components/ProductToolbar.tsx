'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { message } from 'antd'
import { useState } from 'react'

import { useProductList } from '@/hooks/product'
import { exportProductsToExcel } from '@/utils/exportToExcel'

import { CreateProductModal } from './CreateProductModal'

export const ProductToolbar = () => {
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

      <CreateProductModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

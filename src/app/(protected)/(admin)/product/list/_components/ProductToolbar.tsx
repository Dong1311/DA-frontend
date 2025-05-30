'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'
import { useState } from 'react'

import { useProductList } from '@/hooks/product'
import { exportProductsToExcel } from '@/utils/exportToExcel'

import { CreateProductModal } from './CreateProductModal'

export const ProductToolbar = () => {
  const [open, setOpen] = useState(false)
  const { data } = useProductList(1, 1000)

  const handleExport = () => {
    const products = data?.items ?? []

    if (products.length === 0) {
      return message.warning('Không có dữ liệu để xuất')
    }

    exportProductsToExcel(products)
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

      <CreateProductModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

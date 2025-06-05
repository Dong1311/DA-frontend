'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useState } from 'react'

import { CreateStockCheckModal } from './CreateStockCheckModal'

export const StockCheckToolbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          <span className="hidden lg:inline">Thêm mới</span>
        </Button>

        <Button icon={<FileExcelOutlined />}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>

      <CreateStockCheckModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

'use client'

import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useState } from 'react'

import { CreateCustomerModal } from './CreateCustomerModal'

export const CustomerToolbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8} className="w-full">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          <span className="hidden lg:inline">Thêm mới</span>
        </Button>

        <Button icon={<FileExcelOutlined />}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>
      </Flex>

      <CreateCustomerModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

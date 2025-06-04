'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

export const ReturnToolbar = () => {
  const handleAddReturn = () => {
    localStorage.setItem('return_notice', '1')
    window.open('/invoice', '_blank')
  }

  return (
    <Flex justify="flex-end" gap={8}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddReturn}>
        Thêm mới
      </Button>
      <Button icon={<FileExcelOutlined />}>Xuất file</Button>
      <Button icon={<BarsOutlined />} />
    </Flex>
  )
}

'use client'
import { BarsOutlined, FileExcelOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

export const ProductToolbar = () => {
  return (
    <Flex justify="flex-end" gap={8}>
      <Button type="primary" icon={<PlusOutlined />}>
        Thêm mới
      </Button>
      <Button icon={<UploadOutlined />}>Import</Button>
      <Button icon={<FileExcelOutlined />}>Xuất file</Button>
      <Button icon={<BarsOutlined />} />
    </Flex>
  )
}

'use client'
import { BarsOutlined, FileExcelOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

export const PriceBookToolbar = () => {
  return (
    <Flex justify="flex-end" gap={8}>
      <Button icon={<UploadOutlined />} type="primary">
        Import
      </Button>
      <Button icon={<FileExcelOutlined />} type="primary">
        Xuất file
      </Button>
      <Button icon={<BarsOutlined />} type="primary" />
    </Flex>
  )
}

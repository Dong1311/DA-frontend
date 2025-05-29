'use client'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

export const PricebookToolbar = () => {
  return (
    <Flex justify="flex-end" gap={8}>
      <Button icon={<FileExcelOutlined />} type="primary">
        Xuất file
      </Button>
    </Flex>
  )
}

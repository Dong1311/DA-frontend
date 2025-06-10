'use client'

import { BarsOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

export const ReportDailyToolbar = () => {
  return (
    <>
      <Flex wrap="wrap" justify="flex-end" gap={8} className="w-full">
        <Button icon={<FileExcelOutlined />}>
          <span className="hidden lg:inline">Xuất file</span>
        </Button>

        <Button icon={<BarsOutlined />} />
      </Flex>
    </>
  )
}

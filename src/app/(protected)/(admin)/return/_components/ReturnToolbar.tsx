'use client'

import { BarsOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message } from 'antd'

import { useReturnList } from '@/hooks/return'
import { exportReturnsToExcel } from '@/utils/exportToExcel'

export const ReturnToolbar = () => {
  const handleAddReturn = () => {
    localStorage.setItem('return_notice', '1')
    window.open('/invoice', '_blank')
  }
  const { data } = useReturnList(1, 1000)

  const handleExport = () => {
    const returns = data?.items ?? []
    if (!returns.length) return message.warning('Không có dữ liệu để xuất')
    exportReturnsToExcel(returns)
  }

  return (
    <Flex justify="flex-end" gap={8}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddReturn}>
        Thêm mới
      </Button>
      <Button icon={<FileExcelOutlined />} onClick={handleExport}>
        <span className="hidden lg:inline">Xuất file</span>
      </Button>
      <Button icon={<BarsOutlined />} />
    </Flex>
  )
}

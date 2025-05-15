'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export const QuickSaleButton = () => {
  return (
    <Button type="primary" icon={<PlusOutlined />} style={{ width: '100%' }}>
      Bán nhanh
    </Button>
  )
}

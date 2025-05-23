'use client'

import { Card, Input } from 'antd'

export const CustomerInfo = () => {
  return (
    <Card title="Thông tin khách hàng">
      <Input.Search placeholder="Tìm khách hàng (F4)" enterButton="Tìm" size="large" />
    </Card>
  )
}

'use client'

import { Card, Radio } from 'antd'

export const PaymentMethods = () => {
  return (
    <Card title="Phương thức thanh toán">
      <Radio.Group>
        <Radio.Button value="cash">Tiền mặt</Radio.Button>
        <Radio.Button value="bankTransfer">Chuyển khoản</Radio.Button>
        <Radio.Button value="creditCard">Thẻ</Radio.Button>
        <Radio.Button value="wallet">Ví</Radio.Button>
      </Radio.Group>
    </Card>
  )
}

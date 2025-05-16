'use client'

import { Card, Col, InputNumber, Row, Statistic } from 'antd'
import { useFormContext } from 'react-hook-form'

export const OrderSummary = () => {
  const { watch, setValue } = useFormContext()
  const products = watch('products')
  const discount = watch('discount')

  const totalAmount = products.reduce((sum: number, p: { totalPrice: number }) => sum + p.totalPrice, 0)

  return (
    <Card title="Tổng tiền hàng">
      <Row>
        <Col span={12}>
          <Statistic title="Tổng tiền hàng" value={totalAmount} suffix="VND" />
        </Col>
        <Col span={12}>
          <Statistic title="Giảm giá" value={discount} suffix="VND" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Statistic title="Khách cần trả" value={totalAmount - discount} suffix="VND" />
        </Col>
      </Row>
      <InputNumber
        min={0}
        max={totalAmount}
        value={discount}
        onChange={(val) => setValue('discount', val ?? 0)}
        style={{ width: '100%', marginTop: 8 }}
      />
    </Card>
  )
}

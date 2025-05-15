'use client'

import { Card, Col, Row, Statistic } from 'antd'

export const OrderSummary = () => {
  const quantity = 1
  const unit = 'viên'

  return (
    <Card title="Tổng tiền hàng">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Statistic title="Số lượng" value={quantity} />
        </Col>
        <Col span={8}>
          <Statistic title="Đơn vị" value={unit} />
        </Col>
        <Col span={8}>
          <Statistic title="Tổng tiền hàng" value={36000} suffix="VND" />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Statistic title="Giảm giá" value={0} suffix="VND" />
        </Col>
        <Col span={12}>
          <Statistic title="Khách cần trả" value={36000} suffix="VND" />
        </Col>
      </Row>
    </Card>
  )
}

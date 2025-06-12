'use client'

import { Card, Col, Input, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormattedCurrencyInput } from '@/components/FormattedCurrencyInput'
import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'

const { Text } = Typography

export const OrderSummary = () => {
  const { watch, setValue } = useFormContext()
  const products = watch('products') || []
  const discount = watch('discount') || 0

  const totalAmount = products.reduce((sum: number, p: { totalPrice: number }) => sum + p.totalPrice, 0)
  const amountToPay = Math.max(0, totalAmount - discount)

  const [customerPaid, setCustomerPaid] = useState(amountToPay)

  useEffect(() => {
    setCustomerPaid(amountToPay)
  }, [amountToPay])

  useEffect(() => {
    setValue('amountPaid', amountToPay)
  }, [amountToPay, setValue])

  const change = Math.max(0, customerPaid - amountToPay)

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '')
    const num = Number(raw)
    if (!isNaN(num)) {
      setCustomerPaid(num)
    }
  }

  return (
    <Card title="Tổng kết đơn hàng">
      <Row justify="space-between" style={{ marginBottom: 8 }}>
        <Col>
          <Text>Tổng tiền hàng</Text>
        </Col>
        <Col>
          <Text>{formatNumberWithCommas(totalAmount)} VND</Text>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
        <Col>
          <Text>Giảm giá</Text>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <FormattedCurrencyInput name="discount" max={totalAmount} />
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: 8 }}>
        <Col>
          <Text strong>Khách cần trả</Text>
        </Col>
        <Col>
          <Text strong style={{ color: '#1677ff' }}>
            {formatNumberWithCommas(amountToPay)} VND
          </Text>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
        <Col>
          <Text strong>Khách thanh toán</Text>
        </Col>
        <Col style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Input
            value={formatNumberWithCommas(customerPaid)}
            onChange={handleAmountPaidChange}
            inputMode="numeric"
            pattern="[0-9]*"
            style={{
              border: 'none',
              borderBottom: '1px solid #d9d9d9',
              borderRadius: 0,
              outline: 'none',
              boxShadow: 'none',
              width: 100,
              textAlign: 'right',
              paddingRight: 0,
            }}
          />
          <span style={{ fontSize: 14 }}>VND</span>
        </Col>
      </Row>

      <Row justify="space-between">
        <Col>
          <Text strong>Tiền trả lại</Text>
        </Col>
        <Col>
          <Text>{formatNumberWithCommas(change)} VND</Text>
        </Col>
      </Row>
    </Card>
  )
}

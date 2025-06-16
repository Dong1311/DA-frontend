import { Col, Row, Typography } from 'antd'

import { type InvoiceResponseDto } from '@/api-sdk'
import { Text } from '@/components'
const { Title } = Typography

export const RegisteredGuestInvoiceInfo = ({ invoice }: { invoice: InvoiceResponseDto }) => {
  return (
    <>
      <Title level={4} style={{ marginBottom: 24 }}>
        Thông tin hóa đơn
      </Title>
      <Row gutter={[24, 12]}>
        <Col span={12}>
          <Text strong>Mã hóa đơn:</Text> <Text>{invoice.id}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Ngày tạo:</Text> <Text>{new Date(invoice.createdAt).toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Khách hàng: </Text> <Text>{invoice.customer ? invoice.customer.name : ''}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Trạng thái:</Text> <Text>{invoice.paymentStatus}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Phương thức thanh toán:</Text>{' '}
          <Text>{invoice.paymentMethod === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Tổng tiền:</Text> <Text>{invoice.totalAmount.toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Giảm giá:</Text> <Text>{invoice.discount.toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Đã thanh toán:</Text> <Text>{invoice.amountPaid.toLocaleString()}</Text>
        </Col>
      </Row>
    </>
  )
}

import { Button, Col, Form, InputNumber, message, Modal, Row, Typography } from 'antd'
import { useState } from 'react'

import { type InvoiceResponseDto } from '@/api-sdk'
import { Text } from '@/components'
import { useCreateReturn } from '@/hooks/return'
const { Title } = Typography

type ReturnProductInput = {
  productId: string
  code: string
  name: string
  maxQuantity: number
  quantity: number
  unitPrice: number
}

export const InvoiceInfo = ({ invoice }: { invoice: InvoiceResponseDto }) => {
  const [openReturnModal, setOpenReturnModal] = useState(false)
  const [form] = Form.useForm()
  const createReturn = useCreateReturn()

  const returnProducts: ReturnProductInput[] = invoice.invoiceItems.map((item) => ({
    productId: item.productId,
    code: item.product?.code || '',
    name: item.product?.name || '',
    maxQuantity: item.quantity,
    quantity: 0,
    unitPrice: item.unitPrice,
  }))

  const onSubmitReturn = (values: any) => {
    const productsToReturn: ReturnProductInput[] = values.products.filter((p: ReturnProductInput) => p.quantity > 0)

    if (productsToReturn.length === 0) {
      message.warning('Vui lòng chọn ít nhất một sản phẩm để trả')
      return
    }

    const refundAmount = productsToReturn.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0)

    createReturn.mutate(
      {
        invoiceId: invoice.id,
        customerId: invoice.customerId ?? '',
        refundAmount,
        storeId: invoice.storeId,
        products: productsToReturn,
      },
      {
        onSuccess: () => {
          message.success('Tạo phiếu trả hàng thành công')
          setOpenReturnModal(false)
          form.resetFields()
        },
        onError: (error: any) => {
          const errorMsg = error?.response?.data?.message || error?.message || 'Tạo phiếu trả hàng thất bại'
          message.error(errorMsg)
        },
      }
    )
  }

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

      <Button type="primary" style={{ marginTop: 24 }} onClick={() => setOpenReturnModal(true)}>
        Trả hàng
      </Button>

      <Modal
        title="Tạo phiếu trả hàng"
        open={openReturnModal}
        onCancel={() => setOpenReturnModal(false)}
        onOk={() => form.submit()}
        okText="Gửi"
      >
        <Form form={form} layout="vertical" onFinish={onSubmitReturn} initialValues={{ products: returnProducts }}>
          {returnProducts.map((p, idx) => (
            <Form.Item
              label={`${p.code} - ${p.name} (tối đa ${p.maxQuantity})`}
              key={p.productId}
              name={['products', idx, 'quantity']}
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng trả' },
                {
                  type: 'number',
                  min: 0,
                  max: p.maxQuantity,
                  message: `Số lượng phải từ 0 đến ${p.maxQuantity}`,
                },
              ]}
            >
              <InputNumber min={0} max={p.maxQuantity} />
            </Form.Item>
          ))}

          <Form.Item name="products" noStyle>
            <input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

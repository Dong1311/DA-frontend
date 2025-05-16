'use client'

import { Button, Col, Layout, message, Row } from 'antd'
import { useFormContext } from 'react-hook-form'

import { SalesService } from '@/api-sdk'

import { CustomerInfo } from './CustomerInfo'
import { OrderSummary } from './OrderSummary'
import { PaymentMethods } from './PaymentMethods'
import { ProductSelector } from './ProductSelector'
import { ProductTable } from './ProductTable'
import { SaleFormProvider } from './SaleFormProvider'

const { Content } = Layout

const SaleFormContent = () => {
  const { handleSubmit, reset } = useFormContext()

  const onSubmit = async (data: any) => {
    const totalAmount = data.products.reduce((sum: number, p: { totalPrice: number }) => sum + p.totalPrice, 0)

    const payload = {
      ...data,
      totalAmount,
    }

    try {
      const response = await SalesService.salesControllerCreateInvoice({
        requestBody: payload,
      })
      message.success('Tạo đơn hàng thành công!')
      reset({
        products: [],
        discount: 0,
        amountPaid: 0,
      })
      console.log('Response:', response)
    } catch (err) {
      console.error(err)
      message.error('Tạo đơn hàng thất bại!')
    }
  }

  return (
    <Layout>
      <Content style={{ padding: 20 }}>
        <Row>
          <ProductSelector />
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={16}>
            <ProductTable />
          </Col>
          <Col span={8}>
            <CustomerInfo />
            <OrderSummary />
            <PaymentMethods />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 24 }}>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Thanh toán
          </Button>
        </Row>
      </Content>
    </Layout>
  )
}

export const SaleLayout = () => (
  <SaleFormProvider>
    <SaleFormContent />
  </SaleFormProvider>
)

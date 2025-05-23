'use client'

import { Button, Col, Layout, message, Row } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { SalesService } from '@/api-sdk'
import { CreateInvoiceDto } from '@/api-sdk'
import { useSocket } from '@/hooks/useSocket'

import { CustomerInfo } from './CustomerInfo'
import { OrderSummary } from './OrderSummary'
import { PaymentMethods } from './PaymentMethods'
import { ProductSelector } from './ProductSelector'
import { ProductTable } from './ProductTable'
import { SaleFormProvider } from './SaleFormProvider'
const { Content } = Layout

const SaleFormContent = () => {
  const { handleSubmit, reset } = useFormContext()
  const cash = CreateInvoiceDto.paymentMethod.CASH
  const paymentWindowRef = useRef<Window | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const { paymentSuccessData } = useSocket()

  const resetForm = () => {
    reset({
      products: [],
      discount: 0,
      amountPaid: 0,
      paymentMethod: cash,
    })
  }

  useEffect(() => {
    if (paymentUrl) {
      paymentWindowRef.current = window.open(paymentUrl, 'PaymentQR', 'width=400,height=400')
    } else if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
      paymentWindowRef.current.close()
      paymentWindowRef.current = null
    }
  }, [paymentUrl])

  useEffect(() => {
    if (!paymentSuccessData) return
    message.success(`Thanh toán thành công hóa đơn ${paymentSuccessData.invoiceId}!`)
    resetForm()
    setPaymentUrl(null)
  }, [paymentSuccessData])

  const onSubmit = async (data: any) => {
    const totalAmount = data.products.reduce((sum: number, p: { totalPrice: number }) => sum + p.totalPrice, 0)
    const payload = { ...data, totalAmount }

    try {
      const response = await SalesService.salesControllerCreateInvoice({ requestBody: payload })

      if (payload.paymentMethod === cash) {
        message.success('Tạo đơn hàng thành công!')
        resetForm()
      } else if (response.paymentUrl) {
        setPaymentUrl(response.paymentUrl)
      } else {
        setPaymentUrl(null)
      }

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

'use client'

import { Button, Col, Layout, message, Row } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { type CreateInvoiceDto, type ProductSaleDto } from '@/api-sdk'
import { useCreateInvoice } from '@/hooks/invoice'
import { usePaymentSocket } from '@/hooks/socket/usePaymentSocket'

import { CustomerInfo } from './CustomerInfo'
import { OrderSummary } from './OrderSummary'
import { PaymentMethods } from './PaymentMethods'
import { ProductSelector } from './ProductSelector'
import { type ProductSaleFormDto, ProductTable } from './ProductTable'

const { Content } = Layout
const CASH = 'CASH'

export const SaleFormContent = () => {
  const { handleSubmit, reset } = useFormContext()
  const paymentWindowRef = useRef<Window | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const { paymentSuccessData } = usePaymentSocket()

  const resetForm = () => {
    reset({
      products: [],
      discount: 0,
      amountPaid: 0,
      paymentMethod: CASH,
      customerId: undefined,
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
  const { mutateAsync: createInvoice, isPending } = useCreateInvoice()

  const onSubmit = async (data: any) => {
    const products: ProductSaleFormDto[] = data.products
    if (!products || products.length === 0) {
      message.error('Đơn hàng trống')
      return
    }

    const cleanedProducts: ProductSaleDto[] = products.map((p) => ({
      id: p.id,
      code: p.code,
      quantity: p.quantity,
      unitPrice: p.unitPrice,
      totalPrice: p.totalPrice,
      unitId: p.unitId,
    }))

    const totalAmount = cleanedProducts.reduce((sum, p) => sum + p.totalPrice, 0)

    const payload: CreateInvoiceDto = {
      ...data,
      totalAmount,
      products: cleanedProducts,
    }

    try {
      const response = await createInvoice(payload)

      if (payload.paymentMethod === CASH) {
        message.success('Tạo đơn hàng thành công!')
        resetForm()
      } else if (response.paymentUrl) {
        setPaymentUrl(response.paymentUrl)
      } else {
        setPaymentUrl(null)
      }
    } catch (err) {
      console.error(err)
      message.error('Tạo đơn hàng thất bại!')
    }
  }

  return (
    <Layout className="bg-white">
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
          <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isPending}>
            Thanh toán
          </Button>
        </Row>
      </Content>
    </Layout>
  )
}

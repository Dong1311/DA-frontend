'use client'

import { Button, Col, Layout, message, Modal, Row } from 'antd'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { type CreateInvoiceDto, type ProductSaleDto } from '@/api-sdk'
import { OrderSummary } from '@/app/(protected)/(features)/sale/_components/OrderSummary'
import { ProductSelector } from '@/app/(protected)/(features)/sale/_components/ProductSelector'
import { type ProductSaleFormDto, ProductTable } from '@/app/(protected)/(features)/sale/_components/ProductTable'
import { useCreateInvoice } from '@/hooks/invoice'
import { usePaymentSocket } from '@/hooks/socket/usePaymentSocket'

import { ChatSaleFormProvider } from './ChatSaleFormProvider'

const { Content } = Layout
const CASH = 'CASH'

interface ChatSaleFormProps {
  conversationId: string
  onInvoiceCreated: (invoiceId: string) => void
  open: boolean
  onClose: () => void
}

export const ChatSaleForm = ({ conversationId, onInvoiceCreated, open, onClose }: ChatSaleFormProps) => {
  const paymentWindowRef = useRef<Window | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const { paymentSuccessData } = usePaymentSocket()
  const { mutateAsync: createInvoice, isPending } = useCreateInvoice()

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={1000} centered>
      <ChatSaleFormProvider>
        <ChatSaleFormContent
          conversationId={conversationId}
          onInvoiceCreated={onInvoiceCreated}
          onClose={onClose}
          isPending={isPending}
          createInvoice={createInvoice}
          paymentUrl={paymentUrl}
          setPaymentUrl={setPaymentUrl}
          paymentSuccessData={paymentSuccessData}
          paymentWindowRef={paymentWindowRef}
        />
      </ChatSaleFormProvider>
    </Modal>
  )
}

const ChatSaleFormContent = ({
  conversationId,
  onInvoiceCreated,
  onClose,
  isPending,
  createInvoice,
}: {
  conversationId: string
  onInvoiceCreated: (invoiceId: string) => void
  onClose: () => void
  isPending: boolean
  createInvoice: any
  paymentSuccessData: any
  paymentUrl: string | null
  setPaymentUrl: React.Dispatch<React.SetStateAction<string | null>>
  paymentWindowRef: React.MutableRefObject<Window | null>
}) => {
  const { handleSubmit, reset } = useFormContext()

  const onSubmit = async (data: any) => {
    const products: ProductSaleFormDto[] = data.products || []
    if (!products.length) {
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
      conversationId,
      totalAmount,
      products: cleanedProducts,
    }

    try {
      const response = await createInvoice(payload)
      if (payload.paymentMethod === CASH) {
        message.success('Tạo đơn hàng thành công!')
        reset()
        onInvoiceCreated(response.id)
        onClose()
      } else if (response.paymentUrl) {
        onInvoiceCreated(response.id)
        message.success('Tạo đơn hàng thành công, đã gửi cho khách!')
        reset()
        onClose()
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
            <OrderSummary />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 24 }}>
          <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isPending}>
            Tạo đơn
          </Button>
        </Row>
      </Content>
    </Layout>
  )
}

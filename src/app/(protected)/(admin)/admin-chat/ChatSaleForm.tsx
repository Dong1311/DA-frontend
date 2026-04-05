'use client'

import { Button, Col, Layout, message, Modal, Row } from 'antd'
import { useFormContext } from 'react-hook-form'

import { CreateInvoiceDto, type InvoiceResponseDto, type ProductSaleDto } from '@/api-sdk'
import { OrderSummary } from '@/app/(protected)/(features)/sale/_components/OrderSummary'
import { ProductSelector } from '@/app/(protected)/(features)/sale/_components/ProductSelector'
import { type ProductSaleFormDto, ProductTable } from '@/app/(protected)/(features)/sale/_components/ProductTable'
import { type CreateInvoiceRequestDto, type SaleFormValues } from '@/features/invoice/types/sale-form.types'
import { useCreateInvoice } from '@/hooks/invoice'

import { ChatSaleFormProvider } from './ChatSaleFormProvider'

const { Content } = Layout
const CASH = CreateInvoiceDto.paymentMethod.CASH

interface ChatSaleFormProps {
  conversationId: string
  onInvoiceCreated: (invoiceId: string) => void
  open: boolean
  onClose: () => void
}

interface ChatSaleFormContentProps {
  conversationId: string
  onInvoiceCreated: (invoiceId: string) => void
  onClose: () => void
  isPending: boolean
  createInvoice: (payload: CreateInvoiceRequestDto) => Promise<InvoiceResponseDto>
}

export const ChatSaleForm = ({ conversationId, onInvoiceCreated, open, onClose }: ChatSaleFormProps) => {
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
}: ChatSaleFormContentProps) => {
  const { handleSubmit, reset } = useFormContext<SaleFormValues>()

  const onSubmit = async (data: SaleFormValues) => {
    const products: ProductSaleFormDto[] = data.products || []
    if (!products.length) {
      message.error('Đơn hàng trống')
      return
    }

    const cleanedProducts: ProductSaleDto[] = products.map((product) => ({
      id: product.id,
      code: product.code,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.totalPrice,
      unitId: product.unitId,
    }))

    const totalAmount = cleanedProducts.reduce((sum, product) => sum + product.totalPrice, 0)

    const payload: CreateInvoiceRequestDto = {
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
    } catch (error) {
      console.error(error)
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

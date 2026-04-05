'use client'

import { Button, Flex, Input, message, Modal, Steps } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { GuestSalesService, type InvoiceItemDto, type InvoiceResponseDto } from '@/api-sdk'
import { Text } from '@/components'
import { usePaymentSocket } from '@/hooks/socket/usePaymentSocket'

export const ModalCheckoutGuest = ({
  open,
  onClose,
  invoiceId,
}: {
  open: boolean
  onClose: () => void
  invoiceId: string
}) => {
  const [step, setStep] = useState(0)
  const [guestEmail, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const paymentWindowRef = useRef<Window | null>(null)
  const [invoiceDetail, setInvoiceDetail] = useState<InvoiceResponseDto | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const { paymentSuccessData } = usePaymentSocket()

  useEffect(() => {
    if (!open || !invoiceId) return

    GuestSalesService.guestSalesControllerGetInvoice({ id: invoiceId })
      .then((invoice) => {
        setInvoiceDetail(invoice)
        setIsPaid(invoice.paymentStatus === 'PAID')
      })
      .catch((error) => {
        console.error('Không lấy được thông tin đơn hàng:', error)
        message.error('Không thể tải thông tin đơn hàng')
      })
  }, [open, invoiceId])

  useEffect(() => {
    if (!open || !paymentSuccessData) return

    if (paymentSuccessData.invoiceId === invoiceId) {
      message.success('Thanh toán thành công!')

      if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
        paymentWindowRef.current.close()
      }

      onClose()
    }
  }, [paymentSuccessData, invoiceId, onClose, open])

  const handleSubmitEmail = async () => {
    if (!guestEmail.includes('@')) {
      message.error('Email không hợp lệ')
      return
    }

    setIsSubmitting(true)

    try {
      await GuestSalesService.guestSalesControllerUpdateGuestEmail({
        id: invoiceId,
        requestBody: { guestEmail },
      })

      const invoice = await GuestSalesService.guestSalesControllerGetInvoice({ id: invoiceId })

      if (invoice.paymentUrl) {
        setPaymentUrl(invoice.paymentUrl)
      } else if (invoice.paymentMethod === 'BANKTRANSFER' && invoice.paymentId) {
        const fallbackQR = `https://img.vietqr.io/image/vietinbank-108873580322-qronly.png?amount=${invoice.totalAmount}&addInfo=${invoice.paymentId}`
        setPaymentUrl(fallbackQR)
      }

      setStep(2)
    } catch (error) {
      console.error('Lỗi khi xử lý invoice:', error)
      message.error('Không thể tiếp tục tiến trình')
    } finally {
      setIsSubmitting(false)
    }
  }

  const invoiceItems: InvoiceItemDto[] = invoiceDetail?.invoiceItems ?? []

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Flex vertical className="space-y-4 text-sm">
            <Flex>
              <Text>Mã đơn: {invoiceDetail?.id}</Text>
            </Flex>
            <Flex>
              <Text>Ngày tạo: {invoiceDetail?.createdAt ? new Date(invoiceDetail.createdAt).toLocaleString() : '...'}</Text>
            </Flex>
            <Flex>
              <Text>Tổng tiền: {invoiceDetail?.totalAmount?.toLocaleString()} đ</Text>
            </Flex>
            <Flex>
              <Text>
                Phương thức thanh toán:{' '}
                {invoiceDetail?.paymentMethod === 'BANKTRANSFER' ? 'Chuyển khoản' : invoiceDetail?.paymentMethod}
              </Text>
            </Flex>

            {invoiceItems.length > 0 && (
              <Flex vertical className="mt-2">
                <Text>Danh sách sản phẩm:</Text>
                <ul className="ml-4 mt-1 list-disc">
                  {invoiceItems.map((item) => (
                    <li key={item.id}>
                      {item.product?.name || 'Sản phẩm'} x {item.quantity} - {(item.totalPrice || 0).toLocaleString()} đ
                    </li>
                  ))}
                </ul>
              </Flex>
            )}

            <Flex gap={8}>
              <Button block onClick={onClose}>
                Hủy
              </Button>
              <Button
                type="primary"
                block
                onClick={() => {
                  if (isPaid) return
                  setStep(1)
                }}
                disabled={isPaid}
              >
                Tiếp tục
              </Button>
            </Flex>
          </Flex>
        )

      case 1:
        if (isPaid) return null
        return (
          <Flex vertical className="space-y-4">
            <Input placeholder="Nhập email" value={guestEmail} onChange={(event) => setEmail(event.target.value)} />
            <Flex gap={8}>
              <Button block onClick={() => setStep(0)}>
                Quay lại
              </Button>
              <Button type="primary" block onClick={handleSubmitEmail} loading={isSubmitting}>
                Tiếp tục
              </Button>
            </Flex>
          </Flex>
        )

      case 2:
        if (isPaid) return null
        return (
          <Flex vertical className="space-y-4 text-center">
            <Flex className="font-semibold text-green-600">Thông tin đã được lưu</Flex>
            <Flex gap={8} justify="center">
              <Button onClick={() => setStep(1)}>Quay lại</Button>
              <Button
                type="primary"
                onClick={() => {
                  if (paymentUrl) {
                    paymentWindowRef.current = window.open(paymentUrl, 'PaymentQR', 'width=400,height=400')
                  } else {
                    message.warning('Không tìm thấy mã QR thanh toán')
                  }
                }}
              >
                Mở QR để thanh toán
              </Button>
            </Flex>
          </Flex>
        )

      default:
        return null
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={500} centered>
      <Steps
        current={step}
        items={isPaid ? [{ title: 'Đã thanh toán' }] : [{ title: 'Xem đơn hàng' }, { title: 'Nhập email' }, { title: 'Thanh toán' }]}
        className="mb-6"
      />
      {renderStepContent()}
    </Modal>
  )
}

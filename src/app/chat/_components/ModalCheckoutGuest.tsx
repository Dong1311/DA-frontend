'use client'

import { Button, Input, message, Modal, Steps } from 'antd'
import { useState } from 'react'

import { GuestSalesService } from '@/api-sdk'
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

  const handleSubmitEmail = async () => {
    if (!guestEmail.includes('@')) return message.error('Email không hợp lệ')
    setIsSubmitting(true)

    try {
      await GuestSalesService.guestSalesControllerUpdateGuestEmail({
        id: invoiceId,
        requestBody: { guestEmail },
      })

      setStep(1)
    } catch (err) {
      console.error(err)
      message.error('Gửi email thất bại')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={500} centered>
      <Steps current={step} items={[{ title: 'Nhập email' }, { title: 'Thanh toán' }]} className="mb-6" />

      {step === 0 && (
        <div className="space-y-4">
          <Input placeholder="Nhập email" value={guestEmail} onChange={(e) => setEmail(e.target.value)} />
          <Button type="primary" block onClick={handleSubmitEmail} loading={isSubmitting}>
            Tiếp tục
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 text-center">
          <div className="font-semibold text-green-600">Thông tin đã được lưu</div>
          <Button type="primary" onClick={() => window.open(`/payment/qr/${invoiceId}`, '_blank')}>
            Mở QR để thanh toán
          </Button>
        </div>
      )}
    </Modal>
  )
}

'use client'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, message, Modal } from 'antd'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type CreateDisposalReceiptDto, CreateDisposalReceiptDto as StatusEnum } from '@/api-sdk'
import { type DisposalReceiptFormValues, disposalReceiptSchema } from '@/constants/schema'
import { useCreateDisposalReceipt } from '@/hooks/disposal-receipt'

import { DisposalReceiptForm } from './DisposalReceiptForm'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateDisposalReceiptModal = ({ open, onClose }: Props) => {
  const methods = useForm<DisposalReceiptFormValues>({
    resolver: zodResolver(disposalReceiptSchema),
    defaultValues: {
      note: '',
      items: [],
    },
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useCreateDisposalReceipt()
  const [loading, setLoading] = useState(false)

  const saveDisposalReceipt = async (values: DisposalReceiptFormValues, status: StatusEnum.status) => {
    try {
      setLoading(true)
      const payload: CreateDisposalReceiptDto = {
        note: values.note,
        items: values.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          status,
        })),
      }

      await mutateAsync(payload)
      message.success(`Tạo phiếu hủy (${status === StatusEnum.status.DRAFT ? 'nháp' : 'hoàn tất'}) thành công`)
      reset()
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Tạo phiếu hủy thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDraft = handleSubmit((values) => saveDisposalReceipt(values, StatusEnum.status.DRAFT))

  const handleCreateCompleted = handleSubmit((values) => {
    Modal.confirm({
      title: 'Xác nhận lưu phiếu?',
      icon: <ExclamationCircleOutlined />,
      content: 'Sau khi lưu sẽ không thể chỉnh sửa lại. Bạn có chắc chắn muốn lưu?',
      okText: 'Lưu',
      cancelText: 'Hủy',
      onOk: () => saveDisposalReceipt(values, StatusEnum.status.COMPLETED),
    })
  })

  return (
    <Modal
      title="Tạo phiếu hủy hàng"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" type="dashed" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="draft" onClick={handleCreateDraft} loading={loading}>
          Tạo nháp
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreateCompleted} loading={loading}>
          Lưu
        </Button>,
      ]}
      width={900}
    >
      <FormProvider {...methods}>
        <DisposalReceiptForm />
      </FormProvider>
    </Modal>
  )
}

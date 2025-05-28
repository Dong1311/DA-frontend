'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, message, Modal } from 'antd'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type CreateImportReceiptDto, createImportReceiptSchema } from '@/constants/schema'
import { useCreateImportReceipt } from '@/hooks/import-receipt'

import { ImportReceiptForm } from './ImportReceiptForm'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateImportReceiptModal = ({ open, onClose }: Props) => {
  const methods = useForm<CreateImportReceiptDto>({
    resolver: zodResolver(createImportReceiptSchema),
    defaultValues: {
      supplierId: '',
      amountDue: 0,
      items: [],
    },
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useCreateImportReceipt()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values: CreateImportReceiptDto) => {
    try {
      setSubmitting(true)
      await mutateAsync(values)
      message.success('Tạo đơn nhập hàng thành công')
      reset()
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Tạo đơn nhập hàng thất bại')
    } finally {
      setSubmitting(false)
    }
  }
  const onInvalid = (errors: any) => {
    console.log('Validation errors:', errors)
    message.error('Có lỗi trong form, vui lòng kiểm tra lại')
  }
  return (
    <Modal
      title="Tạo đơn nhập hàng mới"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit, onInvalid)}
      okText="Tạo"
      cancelText="Hủy"
      confirmLoading={submitting}
      width={900}
      destroyOnHidden
    >
      <FormProvider {...methods}>
        <ImportReceiptForm />
      </FormProvider>

      <Divider />
      {/* Có thể thêm phần preview tổng tiền, trạng thái... */}
    </Modal>
  )
}

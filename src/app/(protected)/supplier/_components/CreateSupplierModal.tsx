'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { message, Modal } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'

import { type CreateSupplierDto } from '@/api-sdk'
import { type SupplierFormValues, supplierSchema } from '@/constants/schema'
import { useCreateSupplier } from '@/hooks/supplier'

import { SupplierForm } from './SupplierForm'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateSupplierModal = ({ open, onClose }: Props) => {
  const methods = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {},
  })
  const { handleSubmit, reset } = methods
  const { mutateAsync } = useCreateSupplier()

  const onSubmit = async (values: SupplierFormValues) => {
    try {
      const payload: CreateSupplierDto = {
        ...values,
      }

      await mutateAsync(payload)
      message.success('Tạo nhà cung cấp thành công')
      reset()
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Tạo nhà cung cấp thất bại')
    }
  }

  return (
    <Modal
      title="Thêm nhà cung cấp mới"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Tạo"
      cancelText="Hủy"
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <SupplierForm />
      </FormProvider>
    </Modal>
  )
}

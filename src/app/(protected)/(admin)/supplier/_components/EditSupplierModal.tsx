'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { message, Modal } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type SupplierFormValues, supplierSchema } from '@/constants/schema'
import { useUpdateSupplier } from '@/hooks/supplier'

import { SupplierForm } from './SupplierForm'

interface Props {
  open: boolean
  onClose: () => void
  supplier: any
}

export const EditSupplierModal = ({ open, onClose, supplier }: Props) => {
  const methods = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {},
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useUpdateSupplier()

  useEffect(() => {
    if (supplier) {
      reset(supplier)
    }
  }, [supplier, reset])

  const onSubmit = async (values: SupplierFormValues) => {
    try {
      await mutateAsync({ id: supplier.id, requestBody: values })
      message.success('Cập nhật nhà cung cấp thành công')
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Cập nhật thất bại')
    }
  }

  return (
    <Modal
      title="Chỉnh sửa nhà cung cấp"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <SupplierForm />
      </FormProvider>
    </Modal>
  )
}

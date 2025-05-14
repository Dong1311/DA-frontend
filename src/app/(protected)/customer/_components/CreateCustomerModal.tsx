'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { message, Modal } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'

import { type CreateCustomerDto } from '@/api-sdk'
import { useCreateCustomer } from '@/hooks/useCreateCustomer'

import { type CustomerFormValues, customerSchema } from '../schemas/customer.schema'
import { CustomerForm } from './CustomerForm'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateCustomerModal = ({ open, onClose }: Props) => {
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      totalPurchase: 0,
      netPurchase: 0,
    },
  })
  const { handleSubmit, reset } = methods
  const { mutateAsync } = useCreateCustomer()

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      const payload: CreateCustomerDto = {
        ...values,
        gender: values.gender as CreateCustomerDto.gender,
        type: values.type as CreateCustomerDto.type,
      }

      await mutateAsync(payload)
      message.success('Tạo khách hàng thành công')
      reset()
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Tạo khách hàng thất bại')
    }
  }

  return (
    <Modal
      title="Thêm khách hàng mới"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Tạo"
      cancelText="Hủy"
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <CustomerForm />
      </FormProvider>
    </Modal>
  )
}

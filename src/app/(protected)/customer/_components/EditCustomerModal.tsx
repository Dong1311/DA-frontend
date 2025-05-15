'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { message, Modal } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type CustomerFormValues, customerSchema } from '@/constants/schema'
import { useUpdateCustomer } from '@/hooks/customer'

import { CustomerForm } from './CustomerForm'

interface Props {
  open: boolean
  onClose: () => void
  customer: any
}

export const EditCustomerModal = ({ open, onClose, customer }: Props) => {
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      totalPurchase: 0,
      netPurchase: 0,
    },
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useUpdateCustomer()

  useEffect(() => {
    if (customer) {
      reset(customer)
    }
  }, [customer, reset])

  const onSubmit = async (values: CustomerFormValues) => {
    try {
      await mutateAsync({ id: customer.id, requestBody: values })
      message.success('Cập nhật khách hàng thành công')
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Cập nhật thất bại')
    }
  }

  return (
    <Modal
      title="Chỉnh sửa khách hàng"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <CustomerForm />
      </FormProvider>
    </Modal>
  )
}

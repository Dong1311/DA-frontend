'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { message, Modal } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'

import { type ProductFormValues, productSchema } from '@/constants/schema'

import { ProductForm } from '../../product/list/_components/ProductForm'

interface Props {
  open: boolean
  onClose: () => void
  onCreate: (newProduct: ProductFormValues) => void
}

export const CreateProductModal = ({ open, onClose, onCreate }: Props) => {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: 0,
      salePrice: 0,
      costPrice: 0,
      productUnits: [
        {
          unitName: '',
          conversionFactor: 1,
          isBaseUnit: true,
        },
      ],
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data: ProductFormValues) => {
    onCreate(data)
    reset()
    onClose()
    message.success('Đã thêm sản phẩm mới vào danh sách nhập')
  }

  return (
    <Modal
      title="Tạo sản phẩm mới"
      open={open}
      onCancel={() => {
        reset()
        onClose()
      }}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isSubmitting}
      okText="Thêm"
      cancelText="Hủy"
    >
      <FormProvider {...methods}>
        <ProductForm isEdit={false} showStock={false} />
      </FormProvider>
    </Modal>
  )
}

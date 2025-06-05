'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, message, Modal } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type ProductFormValues, productSchema } from '@/constants/schema'
import { useUploadImage } from '@/hooks/image'
import { useCreateProduct } from '@/hooks/product'

import { ProductForm } from './ProductForm'
import { ProductImageUploader } from './ProductImageUploader'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateProductModal = ({ open, onClose }: Props) => {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { stock: 0 },
  })
  const { handleSubmit, reset } = methods
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { uploadToS3 } = useUploadImage()
  const { mutateAsync } = useCreateProduct()

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const imageUrls = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) {
            const uploadedUrl = await uploadToS3(file.originFileObj)
            return uploadedUrl
          }
          return file.url || ''
        })
      )

      const fixedUnits = values.productUnits?.map((unit) => ({
        ...unit,
        isBaseUnit: unit.isBaseUnit ?? false,
      }))

      const payload = {
        ...values,
        images: imageUrls,
        productUnits: fixedUnits,
      }

      await mutateAsync(payload)

      message.success('Tạo sản phẩm thành công')
      reset()
      setFileList([])
      onClose()
    } catch (err) {
      console.error('[onSubmit] Error while creating product:', err)
      message.error('Tạo sản phẩm thất bại')
    }
  }

  useEffect(() => {
    console.log('[Form errors]', methods.formState.errors)
  }, [methods.formState.errors])

  return (
    <Modal
      title="Thêm sản phẩm mới"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Tạo"
      cancelText="Hủy"
      width={550}
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <ProductForm isEdit={false} />
      </FormProvider>

      <Form.Item label="Ảnh sản phẩm">
        <ProductImageUploader fileList={fileList} onChange={setFileList} />
      </Form.Item>
    </Modal>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, message, Modal } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type ProductFormValues, productSchema } from '@/constants/schema'
import { useUploadImage } from '@/hooks/image'
import { useUpdateProduct } from '@/hooks/product'

import { ProductForm } from './ProductForm'
import { ProductImageUploader } from './ProductImageUploader'

interface Props {
  open: boolean
  onClose: () => void
  product: any
}

export const EditProductModal = ({ open, onClose, product }: Props) => {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: 0,
    },
  })
  const { formState } = methods
  useEffect(() => {
    console.log('errors', formState.errors)
  }, [formState.errors])
  const { handleSubmit, reset } = methods
  const { mutateAsync } = useUpdateProduct()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { uploadToS3 } = useUploadImage()

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        images: product.images?.map((img: any) => img.url) || [],
      })
      setFileList(
        product.images?.map((img: any) => ({
          uid: img.id,
          name: 'Ảnh',
          url: img.url,
        })) || []
      )
    }
  }, [product, reset])

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const imageUrls = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) return await uploadToS3(file.originFileObj)
          return file.url || ''
        })
      )
      await mutateAsync({ id: product.id, requestBody: { ...values, images: imageUrls } })

      message.success('Cập nhật thành công')
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Cập nhật thất bại')
    }
  }

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={methods.formState.isSubmitting}
    >
      <FormProvider {...methods}>
        <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
          <ProductForm isEdit />
          <Form.Item label="Ảnh sản phẩm">
            <ProductImageUploader fileList={fileList} onChange={setFileList} />
          </Form.Item>
        </form>
      </FormProvider>
    </Modal>
  )
}

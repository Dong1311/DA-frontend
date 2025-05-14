'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, message, Modal } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProductsService } from '@/api-sdk'
import { useUploadImage } from '@/hooks/useUploadImage'

import { type ProductFormValues, productSchema } from '../../schemas/product.schema'
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
      reserved: 0,
      stock: 0,
    },
  })

  const { handleSubmit, reset } = methods

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { uploadToS3 } = useUploadImage()

  useEffect(() => {
    if (product) {
      reset(product)
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

      await ProductsService.productControllerUpdate({
        id: product.id,
        requestBody: { ...values, images: imageUrls },
      })

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
        <ProductForm />
      </FormProvider>

      <Form.Item label="Ảnh sản phẩm">
        <ProductImageUploader fileList={fileList} onChange={setFileList} />
      </Form.Item>
    </Modal>
  )
}

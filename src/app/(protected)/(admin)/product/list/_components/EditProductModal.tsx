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
    defaultValues: { stock: 0 },
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useUpdateProduct()
  const { uploadToS3 } = useUploadImage()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        images: product.images?.map((img: any) => img.url) || [],
        productUnits:
          product.productUnits?.map((u: any) => ({
            unitName: u.unitName,
            conversionFactor: u.conversionFactor,
            isBaseUnit: u.isBaseUnit ?? false,
          })) || [],
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

      const normalizedUnits =
        values.productUnits?.map((unit) => ({
          unitName: unit.unitName,
          conversionFactor: unit.conversionFactor,
          isBaseUnit: unit.isBaseUnit ?? false,
        })) || []

      await mutateAsync({
        id: product.id,
        requestBody: {
          ...values,
          images: imageUrls,
          productUnits: normalizedUnits,
        },
      })

      message.success('Cập nhật sản phẩm thành công')
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Cập nhật sản phẩm thất bại')
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
      width={550}
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

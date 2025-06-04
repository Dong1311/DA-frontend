'use client'

import { Button, Divider, message, Modal, Space, Spin } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type ImportReceiptResponseDto, type UpdateImportReceiptDto } from '@/api-sdk'
import { useUpdateImportReceipt } from '@/hooks/import-receipt'

import { ImportReceiptForm } from './ImportReceiptForm'

interface Props {
  open: boolean
  onClose: () => void
  receipt: ImportReceiptResponseDto
  refetchList: () => void
  isLoading: boolean
}

export const ImportReceiptEditModal = ({ open, onClose, receipt, isLoading, refetchList }: Props) => {
  const methods = useForm<UpdateImportReceiptDto>({
    defaultValues: {
      name: receipt.name,
      code: receipt.code,
      supplierId: receipt.supplierId,
      items: receipt.importReceiptItems.map((item) => ({
        productId: item.productId,
        unitId: item.unitId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    },
  })

  const { handleSubmit, reset } = methods

  const { mutateAsync: updateReceipt, isPending } = useUpdateImportReceipt()

  const handleSave = async (status: 'DRAFT' | 'COMPLETED') => {
    if (status === 'COMPLETED') {
      Modal.confirm({
        title: 'Xác nhận nhập hàng?',
        content: 'Sau khi xác nhận, bạn sẽ không thể chỉnh sửa phiếu này.',
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onOk: async () => {
          await submitForm(status)
        },
      })
    } else {
      await submitForm(status)
    }
  }

  const submitForm = async (status: 'DRAFT' | 'COMPLETED') => {
    try {
      await handleSubmit(async (values) => {
        await updateReceipt({
          id: receipt.id,
          requestBody: { ...values, status },
        })
        message.success(status === 'DRAFT' ? 'Đã lưu nháp' : 'Đã xác nhận nhập hàng')
        refetchList()
        onClose()
      })()
    } catch (error: any) {
      message.error('Có lỗi xảy ra khi lưu phiếu nhập hàng')
      console.error(error)
    }
  }

  useEffect(() => {
    if (receipt) {
      reset({
        name: receipt.name,
        code: receipt.code,
        supplierId: receipt.supplierId,
        items: receipt.importReceiptItems.map((item) => ({
          productId: item.productId,
          unitId: item.unitId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      })
    }
  }, [receipt, reset])

  const isSubmitted = receipt.status === 'COMPLETED'

  return (
    <Modal title="Chỉnh sửa phiếu nhập" open={open} onCancel={onClose} footer={null} width={1000} destroyOnClose>
      <Spin spinning={isLoading}>
        <FormProvider {...methods}>
          <ImportReceiptForm disabled={isSubmitted} />
        </FormProvider>

        {!isSubmitted && (
          <>
            <Divider />
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => handleSave('DRAFT')} loading={isPending}>
                Lưu nháp
              </Button>
              <Button type="primary" onClick={() => handleSave('COMPLETED')} loading={isPending}>
                Xác nhận nhập
              </Button>
            </Space>
          </>
        )}
      </Spin>
    </Modal>
  )
}

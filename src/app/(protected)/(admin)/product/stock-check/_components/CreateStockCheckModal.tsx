'use client'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, message, Modal } from 'antd'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type CreateStockCheckDto, CreateStockCheckDto as StatusEnum } from '@/api-sdk'
import { type StockCheckFormValues, stockCheckSchema } from '@/constants/schema'
import { useCreateStockCheck } from '@/hooks/stock-check'

import { StockCheckForm } from './StockCheckForm'

interface Props {
  open: boolean
  onClose: () => void
}

export const CreateStockCheckModal = ({ open, onClose }: Props) => {
  const methods = useForm<StockCheckFormValues>({
    resolver: zodResolver(stockCheckSchema),
    defaultValues: {
      details: [],
      balancedAt: undefined,
    },
  })

  const { handleSubmit, reset } = methods
  const { mutateAsync } = useCreateStockCheck()
  const [loading, setLoading] = useState(false)

  const saveStockCheck = async (values: StockCheckFormValues, status: StatusEnum.status) => {
    try {
      setLoading(true)
      const payload: CreateStockCheckDto = {
        balancedAt: values.balancedAt,
        status,
        details: values.details.map((item) => ({
          ...item,
          quantityInStock: Number(item.quantityInStock),
          quantityActual: Number(item.quantityActual),
        })),
      }

      await mutateAsync(payload)
      message.success(`Tạo phiếu kiểm kho (${status === StatusEnum.status.DRAFT ? 'nháp' : 'hoàn tất'}) thành công`)
      reset()
      onClose()
    } catch (err) {
      console.error(err)
      message.error('Tạo phiếu kiểm kho thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDraft = handleSubmit((values) => saveStockCheck(values, StatusEnum.status.DRAFT))

  const handleCreateCompleted = handleSubmit((values) => {
    Modal.confirm({
      title: 'Xác nhận lưu phiếu?',
      icon: <ExclamationCircleOutlined />,
      content: 'Sau khi lưu sẽ không thể chỉnh sửa lại. Bạn có chắc chắn muốn lưu?',
      okText: 'Lưu',
      cancelText: 'Hủy',
      onOk: () => saveStockCheck(values, StatusEnum.status.COMPLETED),
    })
  })

  return (
    <Modal
      title="Tạo phiếu kiểm kho"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" type="dashed" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="draft" onClick={handleCreateDraft} loading={loading}>
          Tạo nháp
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreateCompleted} loading={loading}>
          Lưu
        </Button>,
      ]}
      width={900}
    >
      <FormProvider {...methods}>
        <StockCheckForm />
      </FormProvider>
    </Modal>
  )
}

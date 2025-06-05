'use client'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Descriptions, message, Modal, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type StockCheckResponseDto, type UpdateStockCheckDto } from '@/api-sdk'
import { type StockCheckFormValues, stockCheckSchema } from '@/constants/schema'
import { useUpdateStockCheck } from '@/hooks/stock-check'

import { StockCheckForm } from './StockCheckForm'

interface Props {
  open: boolean
  loading: boolean
  stockCheck: StockCheckResponseDto | null
  onClose: () => void
}

export const StockCheckDetailModal = ({ open, loading, stockCheck, onClose }: Props) => {
  const isDraft = stockCheck?.status === 'DRAFT'

  const methods = useForm<StockCheckFormValues>({
    resolver: zodResolver(stockCheckSchema),
    defaultValues: {
      balancedAt: stockCheck?.balancedAt ?? undefined,
      details:
        stockCheck?.details.map((d) => ({
          productId: d.product.id,
          unitId: d.unit.id,
          quantityInStock: d.quantityInStock,
          quantityActual: d.quantityActual,
        })) ?? [],
    },
  })

  const { handleSubmit, reset } = methods
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (stockCheck && isDraft) {
      reset({
        balancedAt: stockCheck.balancedAt ?? undefined,
        details: stockCheck.details.map((d) => ({
          productId: d.product.id,
          unitId: d.unit.id,
          quantityInStock: d.quantityInStock,
          quantityActual: d.quantityActual,
        })),
      })
    }
  }, [stockCheck, reset, isDraft])

  const { mutateAsync: updateStockCheck } = useUpdateStockCheck()

  const saveUpdate = async (status: 'DRAFT' | 'COMPLETED', values: StockCheckFormValues) => {
    try {
      setSaving(true)
      const payload: UpdateStockCheckDto = {
        status,
        balancedAt: values.balancedAt,
        details: values.details.map((d) => ({
          ...d,
          quantityInStock: Number(d.quantityInStock),
          quantityActual: Number(d.quantityActual),
        })),
      }
      await updateStockCheck({ id: stockCheck!.id, payload })
      message.success('Cập nhật phiếu kiểm kho thành công')
      onClose()
    } catch {
      message.error('Cập nhật thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDraft = handleSubmit((values) => saveUpdate('DRAFT', values))
  const handleSaveCompleted = handleSubmit((values) => {
    Modal.confirm({
      title: 'Xác nhận lưu phiếu?',
      icon: <ExclamationCircleOutlined />,
      content: 'Sau khi lưu sẽ không thể chỉnh sửa lại. Bạn có chắc chắn muốn lưu?',
      okText: 'Lưu',
      cancelText: 'Hủy',
      onOk: () => saveUpdate('COMPLETED', values),
    })
  })

  return (
    <Modal
      title="Chi tiết phiếu kiểm kho"
      open={open}
      onCancel={onClose}
      footer={
        isDraft && !loading
          ? [
              <Button key="draft" onClick={handleSaveDraft} loading={saving}>
                Lưu nháp
              </Button>,
              <Button key="save" type="primary" onClick={handleSaveCompleted} loading={saving}>
                Lưu
              </Button>,
            ]
          : null
      }
      width={900}
    >
      {loading || !stockCheck ? (
        <Spin size="large" className="flex justify-center py-10" />
      ) : isDraft ? (
        <FormProvider {...methods}>
          <StockCheckForm />
        </FormProvider>
      ) : (
        <>
          <Descriptions column={2} bordered size="small" className="mb-4">
            <Descriptions.Item label="Ngày tạo">{new Date(stockCheck.createdAt).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Ngày cân bằng">
              {stockCheck.balancedAt ? new Date(stockCheck.balancedAt).toLocaleString() : '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng thực tế">{stockCheck.totalActual}</Descriptions.Item>
            <Descriptions.Item label="Tổng chênh lệch">{stockCheck.totalDifference}</Descriptions.Item>
            <Descriptions.Item label="Tăng">{stockCheck.incDifference}</Descriptions.Item>
            <Descriptions.Item label="Giảm">{stockCheck.decDifference}</Descriptions.Item>
          </Descriptions>

          <Table
            columns={[
              {
                title: 'Sản phẩm',
                dataIndex: 'product',
                render: (p) => p?.name ?? '(đã xóa)',
              },
              {
                title: 'Đơn vị',
                dataIndex: 'unit',
                render: (u) => u?.unitName ?? '(đã xóa)',
              },
              { title: 'Tồn kho', dataIndex: 'quantityInStock' },
              { title: 'Thực tế', dataIndex: 'quantityActual' },
              { title: 'Chênh lệch', dataIndex: 'quantityDiff' },
              { title: 'Giá trị chênh lệch', dataIndex: 'valueDiff' },
            ]}
            dataSource={stockCheck.details}
            pagination={false}
            rowKey="id"
            scroll={{ x: 'max-content' }}
          />
        </>
      )}
    </Modal>
  )
}

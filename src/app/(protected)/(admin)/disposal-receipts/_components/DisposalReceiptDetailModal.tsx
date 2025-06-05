'use client'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Descriptions, message, Modal, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type DisposalReceiptResponseDto, type UpdateDisposalReceiptDto } from '@/api-sdk'
import { type DisposalReceiptFormValues, disposalReceiptSchema } from '@/constants/schema'
import { useUpdateDisposalReceipt } from '@/hooks/disposal-receipt'

import { DisposalReceiptForm } from './DisposalReceiptForm'

interface Props {
  open: boolean
  loading: boolean
  disposalReceipt: DisposalReceiptResponseDto | null
  onClose: () => void
}

export const DisposalReceiptDetailModal = ({ open, loading, disposalReceipt, onClose }: Props) => {
  const isDraft = disposalReceipt?.status === 'DRAFT'

  const methods = useForm<DisposalReceiptFormValues>({
    resolver: zodResolver(disposalReceiptSchema),
    defaultValues: {
      note: disposalReceipt?.note ?? '',
      items:
        disposalReceipt?.disposalReceiptItems.map((item) => ({
          productId: item.product.id,
          unitId: item.unit.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })) ?? [],
    },
  })

  const { handleSubmit, reset } = methods
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (disposalReceipt && isDraft) {
      reset({
        note: disposalReceipt.note ?? '',
        items: disposalReceipt.disposalReceiptItems.map((item) => ({
          productId: item.product.id,
          unitId: item.unit.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      })
    }
  }, [disposalReceipt, reset, isDraft])

  const { mutateAsync: updateDisposalReceipt } = useUpdateDisposalReceipt()

  const saveUpdate = async (status: 'DRAFT' | 'COMPLETED', values: DisposalReceiptFormValues) => {
    try {
      setSaving(true)
      const payload: UpdateDisposalReceiptDto = {
        status: status as UpdateDisposalReceiptDto['status'],
        note: values.note,
        items: values.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
        })),
      }
      await updateDisposalReceipt({ id: disposalReceipt!.id, payload })
      message.success('Cập nhật phiếu hủy hàng thành công')
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
      title="Chi tiết phiếu hủy hàng"
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
      {loading || !disposalReceipt ? (
        <Spin size="large" className="flex justify-center py-10" />
      ) : isDraft ? (
        <FormProvider {...methods}>
          <DisposalReceiptForm />
        </FormProvider>
      ) : (
        <>
          <Descriptions column={2} bordered size="small" className="mb-4">
            <Descriptions.Item label="Ngày tạo">
              {new Date(disposalReceipt.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú">{disposalReceipt.note || '—'}</Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{disposalReceipt.totalAmount.toLocaleString()}</Descriptions.Item>
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
              { title: 'Số lượng', dataIndex: 'quantity' },
              { title: 'Đơn giá', dataIndex: 'unitPrice' },
              { title: 'Thành tiền', dataIndex: 'totalPrice' },
            ]}
            dataSource={disposalReceipt.disposalReceiptItems}
            pagination={false}
            rowKey="id"
            scroll={{ x: 'max-content' }}
          />
        </>
      )}
    </Modal>
  )
}

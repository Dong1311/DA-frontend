'use client'

import { Descriptions, Modal, Spin, Table } from 'antd'

import { type StockCheckResponseDto } from '@/api-sdk'

interface Props {
  open: boolean
  loading: boolean
  stockCheck: StockCheckResponseDto | null
  onClose: () => void
}

export const StockCheckDetailModal = ({ open, loading, stockCheck, onClose }: Props) => {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      render: (product: { name: string }) => product?.name ?? '(đã xóa)',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      render: (unit: { unitName: string }) => unit?.unitName ?? '(đã xóa)',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantityInStock',
    },
    {
      title: 'Thực tế',
      dataIndex: 'quantityActual',
    },
    {
      title: 'Chênh lệch',
      dataIndex: 'quantityDiff',
    },
    {
      title: 'Giá trị chênh lệch',
      dataIndex: 'valueDiff',
    },
  ]

  return (
    <Modal title="Chi tiết phiếu kiểm kho" open={open} onCancel={onClose} footer={null} width={900}>
      {loading || !stockCheck ? (
        <Spin size="large" className="flex justify-center py-10" />
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
            columns={columns}
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

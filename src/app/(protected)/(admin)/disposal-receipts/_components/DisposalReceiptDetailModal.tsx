'use client'

import { Descriptions, Modal, Spin, Table } from 'antd'

import { type DisposalReceiptResponseDto } from '@/api-sdk'

interface Props {
  open: boolean
  loading: boolean
  disposalReceipt: DisposalReceiptResponseDto | null
  onClose: () => void
}

export const DisposalReceiptDetailModal = ({ open, loading, disposalReceipt, onClose }: Props) => {
  return (
    <Modal title="Chi tiết phiếu hủy hàng" open={open} onCancel={onClose} footer={null} width={900}>
      {loading || !disposalReceipt ? (
        <Spin size="large" className="flex justify-center py-10" />
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
              { title: 'Trạng thái', dataIndex: 'status' },
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

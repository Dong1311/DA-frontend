'use client'

import { Col, Modal, Row, Table, Typography } from 'antd'

import { Text } from '@/components'
import { useReturnById } from '@/hooks/return'

const { Title } = Typography

export const ReturnDetailModal = ({
  returnId,
  open,
  onClose,
}: {
  returnId: string | null
  open: boolean
  onClose: () => void
}) => {
  const { data, isLoading } = useReturnById(returnId || '', !!returnId)

  const columns = [
    {
      title: 'Mã sản phẩm',
      render: (_: any, record: any) => record.product?.code ?? '-',
      key: 'code',
    },
    {
      title: 'Tên sản phẩm',
      render: (_: any, record: any) => record.product?.name ?? '-',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn vị',
      render: (_: any, record: any) => record.unit?.unitName ?? '-',
      key: 'unit',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value: number) => value.toLocaleString(),
    },
  ]

  return (
    <Modal title="Chi tiết phiếu trả hàng" open={open} onCancel={onClose} footer={null} width={800}>
      {data && (
        <>
          <Row gutter={[24, 12]}>
            <Col span={12}>
              <Text strong>Mã phiếu:</Text> <Text>{data.id}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Ngày tạo:</Text> <Text>{new Date(data.createdAt).toLocaleString()}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Khách hàng:</Text> <Text>{data.customer?.name || 'Khách lẻ'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Hóa đơn gốc:</Text> <Text>{data.invoiceId}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Phương thức:</Text>{' '}
              <Text>{data.invoice?.paymentMethod === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Tổng tiền hoàn:</Text> <Text>{data.refundAmount.toLocaleString()}đ</Text>
            </Col>
          </Row>

          <Title level={5} style={{ marginTop: 24 }}>
            Sản phẩm trả
          </Title>
          <Table columns={columns} dataSource={data.returnItems} rowKey="id" pagination={false} loading={isLoading} />
        </>
      )}
    </Modal>
  )
}

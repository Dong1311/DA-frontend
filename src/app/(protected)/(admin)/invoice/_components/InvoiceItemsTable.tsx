import { Table } from 'antd'

import type { InvoiceItemDto } from '@/api-sdk'

const invoiceItemColumns = [
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
    render: (_: any, record: any) => record.unit.unitName ?? '-',
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

export const InvoiceItemsTable = ({ items }: { items: InvoiceItemDto[] }) => {
  return <Table columns={invoiceItemColumns} dataSource={items} rowKey="id" pagination={false} />
}

'use client'
import { Input, Table } from 'antd'

import { Text } from '@/components'

const data = [
  {
    key: '1',
    code: 'SP000032',
    name: 'PQA viêm mũi dị ứng (Lọ)',
    cost: 250000,
    lastImport: 250000,
    price: 280000,
  },
  {
    key: '2',
    code: 'SP000031',
    name: 'Ibuprofen 400mg (Viên)',
    cost: 800,
    lastImport: 800,
    price: 1200,
  },
]

export const PricebookTable = () => {
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'code',
      render: (text: string) => <Text>{text}</Text>,
      filterDropdown: () => <Input placeholder="Tìm mã hàng" size="small" />,
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
      render: (text: string) => <Text>{text}</Text>,
      filterDropdown: () => <Input placeholder="Tìm tên hàng" size="small" />,
    },
    {
      title: 'Giá vốn',
      dataIndex: 'cost',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Giá nhập cuối',
      dataIndex: 'lastImport',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Bảng giá chung',
      dataIndex: 'price',
      render: (value: number) => value.toLocaleString(),
    },
  ]

  return (
    <Table
      className="ms-4"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
      size="middle"
    />
  )
}

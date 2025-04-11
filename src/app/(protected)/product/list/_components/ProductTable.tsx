'use client'
import { Table } from 'antd'

import { Text } from '@/components'

const data = [
  {
    key: '1',
    code: 'SP000032',
    name: 'PQA viêm mũi dị ứng (Lọ)',
    price: 300000,
    cost: 250000,
    stock: 464,
    createdAt: '29/03/2025 16:46',
  },
  {
    key: '2',
    code: 'SP000031',
    name: 'Ibuprofen 400mg (Viên)',
    price: 1200,
    cost: 800,
    stock: 30,
    createdAt: '29/03/2025 16:46',
  },
]

const columns = [
  {
    title: '',
    dataIndex: 'star',
    render: () => '⭐',
  },
  {
    title: 'Mã hàng',
    dataIndex: 'code',
  },
  {
    title: 'Tên hàng',
    dataIndex: 'name',
    render: (text: string) => <Text className="text-black">{text}</Text>,
  },
  {
    title: 'Giá bán',
    dataIndex: 'price',
    render: (value: number) => value,
  },
  {
    title: 'Giá vốn',
    dataIndex: 'cost',
    render: (value: number) => value,
  },
  {
    title: 'Tồn kho',
    dataIndex: 'stock',
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
  },
]

export const ProductTable = () => {
  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
}

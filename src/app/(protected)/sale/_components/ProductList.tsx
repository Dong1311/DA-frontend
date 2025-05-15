'use client'

import { Table } from 'antd'
import { useState } from 'react'

const mockProducts = [
  { id: 1, code: 'SP000003', name: 'Zentomum - Tân Thịnh - H2Vi x15Viên', price: 36000 },
  // Add more products as needed
]

export const ProductList = () => {
  const [data] = useState(mockProducts)

  const columns = [
    { title: 'Mã sản phẩm', dataIndex: 'code' },
    { title: 'Tên sản phẩm', dataIndex: 'name' },
    { title: 'Giá', dataIndex: 'price', render: (price: number) => <span>{price.toLocaleString()} VND</span> },
  ]

  return <Table columns={columns} dataSource={data} rowKey="id" pagination={false} size="small" bordered />
}

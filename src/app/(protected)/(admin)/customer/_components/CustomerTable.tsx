'use client'

import { Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useCustomerList } from '@/hooks/customer'

import { EditCustomerModal } from './EditCustomerModal'

export const CustomerTable = () => {
  const { data, isLoading } = useCustomerList()
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null)

  const columns = [
    { title: 'Tên khách hàng', dataIndex: 'name', render: (text: string) => <Text>{text}</Text> },
    { title: 'SĐT', dataIndex: 'phone' },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      render: (val: string) => (val === 'MALE' ? 'Nam' : val === 'FEMALE' ? 'Nữ' : '-'),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      render: (val: string) => (val === 'INDIVIDUAL' ? 'Cá nhân' : val === 'COMPANY' ? 'Công ty' : '-'),
    },
    { title: 'Ngày sinh', dataIndex: 'dob', render: (dob: string) => (dob ? new Date(dob).toLocaleDateString() : '-') },
    { title: 'Tổng mua', dataIndex: 'totalPurchase' },
    { title: 'Tổng mua ròng', dataIndex: 'netPurchase' },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => setEditingCustomer(record),
        })}
      />
      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          open={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </>
  )
}

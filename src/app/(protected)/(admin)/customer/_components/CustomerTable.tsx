'use client'

import { Button, Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useCustomerList, useCustomerSearch } from '@/hooks/customer'

import { EditCustomerModal } from './EditCustomerModal'

export const CustomerTable = ({
  searchKeyword,
  page,
  onPageChange,
}: {
  searchKeyword: string
  page: number
  onPageChange: (page: number) => void
}) => {
  const limit = 10
  const { data: allCustomers, isLoading: isLoadingAll } = useCustomerList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useCustomerSearch(searchKeyword, page, limit)

  const data = searchKeyword ? searchResults : allCustomers
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const [editingCustomer, setEditingCustomer] = useState<any | null>(null)

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      ellipsis: true,
      onCell: () => ({ style: { width: '25%' } }),
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      ellipsis: true,
      onCell: () => ({ style: { width: '25%' } }),
    },
    {
      title: 'Loại khách hàng',
      dataIndex: 'type',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
      render: (type: string) => <Text>{type === 'COMPANY' ? 'Công ty' : 'Cá nhân'}</Text>,
    },
    {
      title: 'Tổng mua hàng',
      dataIndex: 'totalPurchase',
      ellipsis: true,
      onCell: () => ({ style: { width: '10%' } }),
      render: (value: number) => <Text>{value?.toLocaleString() || '0'}</Text>,
    },
    {
      title: '',
      key: 'actions',
      onCell: () => ({ style: { width: '10%' } }),
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => setEditingCustomer(record)}>
          Sửa
        </Button>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: onPageChange,
        }}
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

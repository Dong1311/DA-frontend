'use client'

import { Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useReturnList, useReturnSearch } from '@/hooks/return'

import { ReturnDetailModal } from './ReturnDetailModal'

export const ReturnTable = ({
  searchKeyword,
  page,
  onPageChange,
}: {
  searchKeyword: string
  page: number
  onPageChange: (page: number) => void
}) => {
  const limit = 10

  const { data: allReturns, isLoading: isLoadingAll } = useReturnList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useReturnSearch(searchKeyword, page, limit)
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null)

  const data = searchKeyword ? searchResults : allReturns
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const columns = [
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (date: string) => <Text>{new Date(date).toLocaleString()}</Text>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'refundAmount',
    },
    {
      title: 'Phương thức',
      dataIndex: 'invoice',
      render: (invoice: { paymentMethod: string }) => (
        <Text>{invoice.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản'}</Text>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      render: (customer: { name: string }) => <Text>{customer?.name ?? 'Khách lẻ'}</Text>,
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
        onRow={(record) => ({
          onClick: () => setSelectedReturnId(record.id),
        })}
      />
      <ReturnDetailModal
        returnId={selectedReturnId}
        open={!!selectedReturnId}
        onClose={() => setSelectedReturnId(null)}
      />
    </>
  )
}

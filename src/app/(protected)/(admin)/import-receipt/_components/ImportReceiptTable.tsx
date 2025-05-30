'use client'

import { Table } from 'antd'

import { Text } from '@/components'
import { useImportReceiptList, useImportReceiptSearch } from '@/hooks/import-receipt'

export const ImportReceiptTable = ({
  searchKeyword,
  page,
  onPageChange,
}: {
  searchKeyword: string
  page: number
  onPageChange: (page: number) => void
}) => {
  const limit = 10

  const { data: allReceipts, isLoading: isLoadingAll } = useImportReceiptList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useImportReceiptSearch(searchKeyword, page, limit)

  const data = searchKeyword ? searchResults : allReceipts
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      key: 'code',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Tên đơn nhập',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier: { name: string }) => <Text>{supplier?.name}</Text>,
      onCell: () => ({ style: { width: '25%' } }),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amountDue',
      key: 'amountDue',
      render: (val: number) => val.toLocaleString(),
      onCell: () => ({ style: { width: '15%' } }),
    },
  ]

  return (
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
  )
}

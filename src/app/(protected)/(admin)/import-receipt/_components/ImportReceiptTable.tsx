'use client'

import { Button, Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useImportReceiptDetail, useImportReceiptList, useImportReceiptSearch } from '@/hooks/import-receipt'

import { ImportReceiptEditModal } from './ImportReceiptEditModal'

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

  const { data: allReceipts, isLoading: isLoadingAll, refetch: refetchList } = useImportReceiptList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useImportReceiptSearch(searchKeyword, page, limit)

  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: editingReceipt, isLoading: isEditingLoading } = useImportReceiptDetail(editingId ?? '')

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
      ellipsis: true,
      render: (date: string) => new Date(date).toLocaleDateString(),
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplier',
      ellipsis: true,
      render: (supplier: { name: string }) => <Text>{supplier?.name}</Text>,
      onCell: () => ({ style: { width: '25%' } }),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amountDue',
      key: 'amountDue',
      ellipsis: true,
      render: (val: number) => val.toLocaleString(),
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      ellipsis: true,
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'COMPLETED' ? 'success' : 'secondary'}>
          {status === 'COMPLETED' ? 'Đã nhập hàng' : 'Bản nháp'}
        </Text>
      ),
      onCell: () => ({ style: { width: '15%' } }),
    },

    {
      title: 'Hành động',
      key: 'actions',
      ellipsis: true,
      render: (_: any, record: { id: string; status: string }) => (
        <Button onClick={() => setEditingId(record.id)}>
          {record.status === 'COMPLETED' ? 'Chi tiết' : 'Chỉnh sửa'}
        </Button>
      ),
      onCell: () => ({ style: { width: '15%' } }),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: onPageChange,
        }}
      />

      {editingReceipt && (
        <ImportReceiptEditModal
          open={!!editingId}
          onClose={() => setEditingId(null)}
          isLoading={isEditingLoading}
          receipt={editingReceipt}
          refetchList={refetchList}
        />
      )}
    </>
  )
}

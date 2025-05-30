'use client'

import { Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useSupplierList, useSupplierSearch } from '@/hooks/supplier'

import { EditSupplierModal } from './EditSupplierModal'

export const SupplierTable = ({
  searchKeyword,
  page,
  onPageChange,
}: {
  searchKeyword: string
  page: number
  onPageChange: (page: number) => void
}) => {
  const limit = 10

  const { data: allSuppliers, isLoading: isLoadingAll } = useSupplierList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useSupplierSearch(searchKeyword, page, limit)

  const data = searchKeyword ? searchResults : allSuppliers
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const [editingSupplier, setEditingSupplier] = useState<any | null>(null)

  const columns = [
    {
      title: 'Tên nhà cung cấp',
      dataIndex: 'name',
      render: (text: string) => <Text>{text}</Text>,
      ellipsis: true,
      onCell: () => ({ style: { width: '30%' } }),
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      ellipsis: true,
      onCell: () => ({ style: { width: '30%' } }),
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'taxCode',
      ellipsis: true,
      onCell: () => ({ style: { width: '15%' } }),
    },
    {
      title: 'Nhóm nhà cung cấp',
      dataIndex: 'group',
      ellipsis: true,
      onCell: () => ({ style: { width: '10%' } }),
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
          onClick: () => setEditingSupplier(record),
          style: { cursor: 'pointer' },
        })}
      />
      {editingSupplier && (
        <EditSupplierModal
          supplier={editingSupplier}
          open={!!editingSupplier}
          onClose={() => setEditingSupplier(null)}
        />
      )}
    </>
  )
}

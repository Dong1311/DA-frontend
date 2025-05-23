'use client'

import { Table } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { useSupplierList } from '@/hooks/supplier'

import { EditSupplierModal } from './EditSupplierModal'

export const SupplierTable = () => {
  const { data, isLoading } = useSupplierList()
  const [editingSupplier, setEditingSupplier] = useState<any | null>(null)

  const columns = [
    {
      title: 'Tên nhà cung cấp',
      dataIndex: 'name',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'taxCode',
    },
    {
      title: 'Nhóm nhà cung cấp',
      dataIndex: 'group',
    },
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
          onClick: () => setEditingSupplier(record),
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

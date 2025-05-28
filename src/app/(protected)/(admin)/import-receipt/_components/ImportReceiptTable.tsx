'use client'

import { Table } from 'antd'

import { Text } from '@/components'
import { useImportReceiptList, useImportReceiptSearch } from '@/hooks/import-receipt'

// import { EditImportReceiptModal } from './EditImportReceiptModal'

export const ImportReceiptTable = ({ searchKeyword }: { searchKeyword: string }) => {
  const { data: allReceipts, isLoading: isLoadingAll } = useImportReceiptList()

  const { data: searchResults, isLoading: isLoadingSearch } = useImportReceiptSearch(searchKeyword)

  const data = searchKeyword ? (searchResults ?? []) : (allReceipts ?? [])

  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  // const [editingReceipt, setEditingReceipt] = useState<any | null>(null)

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
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
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      onCell: () => ({ style: { width: '15%' } }),
    },
    // {
    //   title: '',
    //   key: 'actions',
    //   onCell: () => ({ style: { width: '15%' } }),
    //   render: (_: any, record: any) => (
    //     <div style={{ display: 'flex', gap: 8 }}>
    //       <Button type="link" onClick={() => setEditingReceipt(record)}>
    //         Sửa
    //       </Button>
    //     </div>
    //   ),
    // },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="id" pagination={{ pageSize: 10 }} />
      {/* {editingReceipt && (
        <EditImportReceiptModal
          importReceipt={editingReceipt}
          open={!!editingReceipt}
          onClose={() => setEditingReceipt(null)}
        />
      )} */}
    </>
  )
}

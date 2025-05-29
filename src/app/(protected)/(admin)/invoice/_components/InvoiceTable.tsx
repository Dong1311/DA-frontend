'use client'

import { message, Table } from 'antd'
import { useState } from 'react'

import { type InvoiceResponseDto } from '@/api-sdk'
import { SalesService } from '@/api-sdk/services/SalesService'
import { Text } from '@/components'
import { useInvoiceList, useInvoiceSearch } from '@/hooks/invoice'

import { InvoiceDetailModal } from './InvoiceDetailModal'

export const InvoiceTable = ({
  searchKeyword,
  fromDate,
  toDate,
}: {
  searchKeyword: string
  fromDate?: string
  toDate?: string
}) => {
  const { data: allInvoices, isLoading: isLoadingAll } = useInvoiceList()

  const { data: searchResults, isLoading: isLoadingSearch } = useInvoiceSearch({
    keyword: searchKeyword,
    fromDate,
    toDate,
  })
  const data = searchKeyword ? searchResults : allInvoices
  const isLoading = searchKeyword ? isLoadingSearch : isLoadingAll

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceResponseDto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const fetchInvoiceDetail = async (id: string) => {
    try {
      setLoadingDetail(true)
      setModalOpen(true)
      const detail = await SalesService.salesControllerGetInvoice({ id })
      setSelectedInvoice(detail)
    } catch (_error) {
      message.error('Lỗi khi lấy chi tiết hóa đơn')
    } finally {
      setLoadingDetail(false)
    }
  }

  const columns = [
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      ellipsis: true,
      onCell: () => ({ style: { width: '25%' } }),
      render: (date: string) => <Text>{new Date(date).toLocaleString()}</Text>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      ellipsis: true,
      onCell: () => ({ style: { width: '12%' } }),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      ellipsis: true,
      onCell: () => ({ style: { width: '12%' } }),
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      ellipsis: true,
      render: (text: string) => <Text>{text === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>,
      onCell: () => ({ style: { width: '8%' } }),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus',
      ellipsis: true,
      onCell: () => ({ style: { width: '8%' } }),
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      ellipsis: true,
      render: (customer: { name?: string }) => <Text>{customer?.name ?? ''}</Text>,
      onCell: () => ({ style: { width: '8%' } }),
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
          onClick: () => fetchInvoiceDetail(record.id),
          style: { cursor: 'pointer' },
        })}
      />

      <InvoiceDetailModal
        open={modalOpen}
        loading={loadingDetail}
        invoice={selectedInvoice}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

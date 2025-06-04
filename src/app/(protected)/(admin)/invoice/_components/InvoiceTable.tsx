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
  page,
  onPageChange,
}: {
  searchKeyword: string
  fromDate?: string
  toDate?: string
  page: number
  onPageChange: (page: number) => void
}) => {
  const limit = 10

  const { data: allInvoices, isLoading: isLoadingAll } = useInvoiceList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useInvoiceSearch({
    keyword: searchKeyword,
    fromDate,
    toDate,
    page,
    limit,
  })

  const data = searchKeyword || fromDate || toDate ? searchResults : allInvoices
  const isLoading = searchKeyword || fromDate || toDate ? isLoadingSearch : isLoadingAll

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceResponseDto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const fetchInvoiceDetail = async (id: string) => {
    try {
      setLoadingDetail(true)
      setModalOpen(true)
      const detail = await SalesService.salesControllerGetInvoice({ id })
      setSelectedInvoice(detail)
    } catch {
      message.error('Lỗi khi lấy chi tiết hóa đơn')
    } finally {
      setLoadingDetail(false)
    }
  }

  const columns = [
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (date: string) => <Text>{new Date(date).toLocaleString()}</Text>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      render: (text: string) => <Text>{text === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      render: (customer: { name?: string }) => <Text>{customer?.name ?? 'Khách lẻ'}</Text>,
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

'use client'

import { message, Table } from 'antd'
import { useState } from 'react'

import { type DisposalReceiptResponseDto } from '@/api-sdk'
import { DisposalReceiptsService } from '@/api-sdk'
import { Text } from '@/components'
import { useDisposalReceiptList, useDisposalReceiptSearch } from '@/hooks/disposal-receipt'

import { DisposalReceiptDetailModal } from './DisposalReceiptDetailModal'

export const DisposalReceiptTable = ({
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

  const { data: allData, isLoading: isLoadingAll } = useDisposalReceiptList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useDisposalReceiptSearch({
    keyword: searchKeyword,
    fromDate,
    toDate,
    page,
    limit,
  })

  const data = searchKeyword || fromDate || toDate ? searchResults : allData
  const isLoading = searchKeyword || fromDate || toDate ? isLoadingSearch : isLoadingAll

  const [selectedItem, setSelectedItem] = useState<DisposalReceiptResponseDto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const fetchDetail = async (id: string) => {
    try {
      setLoadingDetail(true)
      setModalOpen(true)
      const detail = await DisposalReceiptsService.disposalReceiptControllerFindOne({ id })
      setSelectedItem(detail)
    } catch {
      message.error('Lỗi khi lấy chi tiết phiếu hủy')
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
      title: 'Ghi chú',
      dataIndex: 'note',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => (
        <Text type={status === 'DRAFT' ? 'warning' : 'success'}>{status === 'DRAFT' ? 'Lưu nháp' : 'Đã lưu'}</Text>
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
        scroll={{ x: 'max-content' }}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: onPageChange,
        }}
        onRow={(record: DisposalReceiptResponseDto) => ({
          onClick: () => fetchDetail(record.id),
          style: { cursor: 'pointer' },
        })}
      />
      <DisposalReceiptDetailModal
        open={modalOpen}
        loading={loadingDetail}
        disposalReceipt={selectedItem}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

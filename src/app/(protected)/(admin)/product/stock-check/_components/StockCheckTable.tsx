'use client'

import { message, Table } from 'antd'
import { useState } from 'react'

import { type StockCheckResponseDto } from '@/api-sdk'
import { StockCheckService } from '@/api-sdk/services/StockCheckService'
import { Text } from '@/components'
import { useStockCheckList, useStockCheckSearch } from '@/hooks/stock-check'

import { StockCheckDetailModal } from './StockCheckDetailModal'
export const StockCheckTable = ({
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

  const { data: allData, isLoading: isLoadingAll } = useStockCheckList(page, limit)
  const { data: searchResults, isLoading: isLoadingSearch } = useStockCheckSearch({
    keyword: searchKeyword,
    fromDate,
    toDate,
    page,
    limit,
  })

  const data = searchKeyword || fromDate || toDate ? searchResults : allData
  const isLoading = searchKeyword || fromDate || toDate ? isLoadingSearch : isLoadingAll

  const [selectedItem, setSelectedItem] = useState<StockCheckResponseDto | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  const fetchDetail = async (id: string) => {
    try {
      setLoadingDetail(true)
      setModalOpen(true)
      const detail = await StockCheckService.stockCheckControllerGetOne({ id })
      setSelectedItem(detail)
    } catch {
      message.error('Lỗi khi lấy chi tiết kiểm kho')
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
      title: 'Tổng thực tế',
      dataIndex: 'totalActual',
    },
    {
      title: 'Chênh lệch',
      dataIndex: 'totalDifference',
    },
    {
      title: 'Tăng',
      dataIndex: 'incDifference',
    },
    {
      title: 'Giảm',
      dataIndex: 'decDifference',
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
        onRow={(record) => ({
          onClick: () => fetchDetail(record.id),
          style: { cursor: 'pointer' },
        })}
      />
      <StockCheckDetailModal
        open={modalOpen}
        loading={loadingDetail}
        stockCheck={selectedItem}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

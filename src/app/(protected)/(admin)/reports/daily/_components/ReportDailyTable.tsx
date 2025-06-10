'use client'

import { Table } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Text } from '@/components'
import { useReportDailyList } from '@/hooks/report'

const DEFAULT_LIMIT = 10

export const ReportDailyTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const now = new Date()
  now.setDate(now.getDate() - 5)
  const defaultDate = now.toISOString().split('T')[0]

  const initialDate = searchParams.get('date') || defaultDate

  // const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0]

  const [page, setPage] = useState(initialPage)
  const [limit] = useState(DEFAULT_LIMIT)

  const { data, isLoading } = useReportDailyList({ date: initialDate, page, limit })

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unitName',
      key: 'unitName',
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
    },
    {
      title: 'Đơn giá TB',
      dataIndex: 'averageUnitPrice',
      key: 'averageUnitPrice',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
    },
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.replace(`?${params.toString()}`)
  }

  return (
    <Table
      columns={columns}
      dataSource={data?.items || []}
      loading={isLoading}
      rowKey={(record) => `${record.productName}-${record.unitName}`}
      pagination={{
        current: page,
        pageSize: limit,
        total: data?.total || 0,
        onChange: handlePageChange,
      }}
      scroll={{ x: 'max-content' }}
    />
  )
}

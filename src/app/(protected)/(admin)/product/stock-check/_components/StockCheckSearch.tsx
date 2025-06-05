'use client'

import { Button, Col, DatePicker, Input, Row } from 'antd'
import type { Moment } from 'moment'
import moment from 'moment'
import { useState } from 'react'

export const StockCheckSearch = ({
  onSearch,
  defaultValue = '',
  defaultFromDate,
  defaultToDate,
}: {
  onSearch: (params: { keyword: string; fromDate?: string; toDate?: string }) => void
  defaultValue?: string
  defaultFromDate?: string
  defaultToDate?: string
}) => {
  const [keyword, setKeyword] = useState(defaultValue)
  const [fromDate, setFromDate] = useState<Moment | null>(
    defaultFromDate ? moment(defaultFromDate, 'YYYY-MM-DD') : null
  )
  const [toDate, setToDate] = useState<Moment | null>(defaultToDate ? moment(defaultToDate, 'YYYY-MM-DD') : null)

  const formatDate = (date: Moment | null): string | undefined => date?.format('YYYY-MM-DD')

  const handleSearch = () => {
    onSearch({
      keyword,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    })
  }

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Input
          placeholder="Tìm theo mã sản phẩm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          allowClear
          style={{ maxWidth: 250 }}
        />
      </Col>
      <Col span={6}>
        <DatePicker placeholder="Từ ngày" value={fromDate} onChange={(date) => setFromDate(date)} allowClear />
      </Col>
      <Col span={6}>
        <DatePicker placeholder="Đến ngày" value={toDate} onChange={(date) => setToDate(date)} allowClear />
      </Col>
      <Col span={2}>
        <Button type="primary" onClick={handleSearch}>
          Tìm
        </Button>
      </Col>
    </Row>
  )
}

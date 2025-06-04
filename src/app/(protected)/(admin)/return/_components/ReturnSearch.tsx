'use client'

import { Input } from 'antd'
import { useState } from 'react'

export const ReturnSearch = ({
  onSearch,
  defaultValue = '',
}: {
  onSearch: (keyword: string) => void
  defaultValue?: string
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Input.Search
      placeholder="Tìm phiếu trả theo tên hoặc số điện thoại"
      enterButton="Tìm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(val) => onSearch(val)}
      allowClear
      className="max-w-[380px]"
    />
  )
}

'use client'

import { Input } from 'antd'
import { useState } from 'react'

export const ImportReceiptSearch = ({
  onSearch,
  defaultValue = '',
}: {
  onSearch: (keyword: string) => void
  defaultValue?: string
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Input.Search
      placeholder="Tìm kiếm theo nhà cung cấp hoặc trạng thái"
      enterButton="Tìm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(val) => onSearch(val)}
      allowClear
      className="max-w-[300px]"
    />
  )
}

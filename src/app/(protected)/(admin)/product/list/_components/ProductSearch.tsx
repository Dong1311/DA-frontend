'use client'

import { Input } from 'antd'
import { useState } from 'react'

export const ProductSearch = ({
  onSearch,
  defaultValue = '',
}: {
  onSearch: (keyword: string) => void
  defaultValue?: string
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Input.Search
      placeholder="Tìm sản phẩm theo tên hoặc mã"
      enterButton="Tìm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(val) => onSearch(val)}
      allowClear
      className="max-w-[300px]"
    />
  )
}

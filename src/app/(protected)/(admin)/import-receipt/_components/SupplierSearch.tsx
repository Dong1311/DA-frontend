'use client'

import { Form, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSupplierList } from '@/hooks/supplier'

export const SupplierSearch = ({ disabled = false }: { disabled?: boolean }) => {
  const { setValue, watch } = useFormContext()
  const [searchText, setSearchText] = useState('')
  const supplierId = watch('supplierId')

  const { data, isLoading } = useSupplierList(1, 1000)
  const suppliers = useMemo(() => data?.items ?? [], [data])

  const filteredSuppliers = useMemo(() => {
    if (!searchText) return suppliers
    return suppliers.filter((s: any) => s.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, suppliers])

  useEffect(() => {
    if (!supplierId) {
      setSearchText('')
    }
  }, [supplierId])

  return (
    <Form.Item
      label="Nhà cung cấp"
      required
      validateStatus={supplierId ? undefined : 'error'}
      help={supplierId ? undefined : 'Vui lòng chọn nhà cung cấp'}
    >
      <Select
        disabled={disabled}
        showSearch
        allowClear
        placeholder="Chọn nhà cung cấp"
        filterOption={false}
        onSearch={(val) => setSearchText(val)}
        onClear={() => setSearchText('')}
        loading={isLoading}
        options={filteredSuppliers.map((s: any) => ({
          label: s.name,
          value: s.id,
        }))}
        value={supplierId || undefined}
        onChange={(val) => setValue('supplierId', val || '')}
        notFoundContent={isLoading ? 'Đang tải...' : 'Không tìm thấy'}
        style={{ width: '100%' }}
      />
    </Form.Item>
  )
}

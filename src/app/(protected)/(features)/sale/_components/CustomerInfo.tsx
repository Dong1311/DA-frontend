'use client'

import { Card, Empty, Input, List, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { type CustomerDto } from '@/api-sdk'
import { type SaleFormValues } from '@/features/invoice/types/sale-form.types'
import { useCustomerSearch } from '@/hooks/customer'

export const CustomerInfo = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null)
  const { setValue, watch } = useFormContext<SaleFormValues>()
  const customerId = watch('customerId')

  const { data, isLoading } = useCustomerSearch(keyword, 1, 1000)

  const customers = data?.items ?? []

  const handleSelectCustomer = (customer: CustomerDto) => {
    setValue('customerId', customer.id)
    setSelectedCustomer(customer)
    setKeyword('')
  }

  useEffect(() => {
    if (!customerId) {
      setSelectedCustomer(null)
    }
  }, [customerId])

  return (
    <Card title="Thông tin khách hàng">
      <Input.Search
        placeholder="Tìm khách hàng (F4)"
        enterButton="Tìm"
        size="large"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {isLoading && <Spin style={{ marginTop: 12 }} />}

      {!isLoading && keyword && (
        <>
          {customers.length > 0 ? (
            <List
              bordered
              style={{ marginTop: 12, maxHeight: 200, overflowY: 'auto' }}
              dataSource={customers}
              renderItem={(item) => {
                const customer = item as CustomerDto
                return (
                  <List.Item onClick={() => handleSelectCustomer(customer)} style={{ cursor: 'pointer' }}>
                    <div>
                      <strong>{customer.name}</strong>
                      {customer.phone && ` - ${customer.phone}`}
                      {customer.address && <div style={{ fontSize: 12, color: '#666' }}>{customer.address}</div>}
                    </div>
                  </List.Item>
                )
              }}
            />
          ) : (
            <Empty style={{ marginTop: 12 }} description="Không tìm thấy khách hàng nào" />
          )}
        </>
      )}

      {selectedCustomer && (
        <div style={{ marginTop: 12 }}>
          <strong>{selectedCustomer.name}</strong>
          {selectedCustomer.phone && ` - ${selectedCustomer.phone}`}
          {selectedCustomer.address && <div style={{ fontSize: 12 }}>{selectedCustomer.address}</div>}
        </div>
      )}
    </Card>
  )
}

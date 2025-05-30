'use client'

import { Card, Input, List, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
interface CustomerDto {
  id: string
  name: string
  phone?: string
}

import { useCustomerSearch } from '@/hooks/customer'

export const CustomerInfo = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const { setValue, watch } = useFormContext()
  const customerId = watch('customerId')

  const { data: customers, isLoading } = useCustomerSearch(keyword, 1, 1000)

  const handleSelectCustomer = (customer: any) => {
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
    <div>
      <Card title="Thông tin khách hàng">
        <Input.Search
          placeholder="Tìm khách hàng (F4)"
          enterButton="Tìm"
          size="large"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {isLoading ? (
          <Spin style={{ marginTop: 12 }} />
        ) : (
          keyword &&
          customers && (
            <List
              bordered
              style={{ marginTop: 12, maxHeight: 200, overflowY: 'auto' }}
              dataSource={customers as CustomerDto[]}
              renderItem={(item) => (
                <List.Item onClick={() => handleSelectCustomer(item)} style={{ cursor: 'pointer' }}>
                  <strong>{item.name}</strong> {item.phone && `- ${item.phone}`}
                </List.Item>
              )}
            />
          )
        )}

        {selectedCustomer && (
          <div style={{ marginTop: 12 }}>
            {selectedCustomer.name} {selectedCustomer.phone && `- ${selectedCustomer.phone}`}
          </div>
        )}
      </Card>
    </div>
  )
}

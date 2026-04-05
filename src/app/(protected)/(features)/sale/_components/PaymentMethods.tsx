'use client'

import { Card, Radio } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

import { CreateInvoiceDto } from '@/api-sdk/models/CreateInvoiceDto'
import { type SaleFormValues } from '@/features/invoice/types/sale-form.types'

const cash = CreateInvoiceDto.paymentMethod.CASH
const bankTransfer = CreateInvoiceDto.paymentMethod.BANKTRANSFER

export const PaymentMethods = () => {
  const { control } = useFormContext<SaleFormValues>()

  return (
    <Card title="Phương thức thanh toán">
      <Controller
        name="paymentMethod"
        control={control}
        defaultValue={cash}
        render={({ field }) => (
          <Radio.Group {...field} value={field.value}>
            <Radio.Button value={cash}>Tiền mặt</Radio.Button>
            <Radio.Button value={bankTransfer}>Chuyển khoản</Radio.Button>
          </Radio.Group>
        )}
      />
    </Card>
  )
}

'use client'

import { type ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CreateInvoiceDto } from '@/api-sdk/models/CreateInvoiceDto'
import { type SaleFormValues } from '@/features/invoice/types/sale-form.types'

export const SaleFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<SaleFormValues>({
    defaultValues: {
      products: [],
      paymentMethod: CreateInvoiceDto.paymentMethod.CASH,
      totalAmount: 0,
      discount: 0,
      amountPaid: 0,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

'use client'

import { type ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export type SaleFormValues = {
  customerId?: string
  storeId: string
  products: {
    id: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }[]
  discount: number
  amountPaid: number
}

export const SaleFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<SaleFormValues>({
    defaultValues: {
      storeId: 'store-1',
      products: [],
      discount: 0,
      amountPaid: 0,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

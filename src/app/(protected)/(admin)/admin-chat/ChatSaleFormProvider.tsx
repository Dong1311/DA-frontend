'use client'

import { type ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CreateInvoiceDto } from '@/api-sdk'

export type ChatSaleFormValues = {
  customerId?: string
  paymentMethod?: CreateInvoiceDto.paymentMethod
  products: {
    id: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }[]
  totalAmount: number
  discount: number
  amountPaid: number
}

export const ChatSaleFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<ChatSaleFormValues>({
    defaultValues: {
      products: [],
      paymentMethod: CreateInvoiceDto.paymentMethod.BANKTRANSFER,
      totalAmount: 0,
      discount: 0,
      amountPaid: 0,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

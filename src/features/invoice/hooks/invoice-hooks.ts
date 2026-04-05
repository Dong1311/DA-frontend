import { useMutation, useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/features/shared/query-keys'

import { invoiceApi, type InvoiceSearchParams } from '../api/invoice-api'
import type { CreateInvoiceRequestDto } from '../types/sale-form.types'

export const useInvoiceList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.invoices.list({ page, limit }),
    queryFn: () => invoiceApi.list({ page, limit }),
  })
}

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.invoices.byId(id),
    queryFn: () => invoiceApi.byId(id),
    enabled: Boolean(id),
  })
}

export const useInvoiceSearch = ({ keyword = '', fromDate, toDate, page, limit }: InvoiceSearchParams) => {
  return useQuery({
    queryKey: queryKeys.invoices.search({ keyword, fromDate, toDate, page, limit }),
    queryFn: () =>
      invoiceApi.search({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: Boolean(keyword) || Boolean(fromDate) || Boolean(toDate),
  })
}

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (payload: CreateInvoiceRequestDto) => invoiceApi.create(payload),
  })
}

import { useMutation, useQuery } from '@tanstack/react-query'

import { SalesService } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import type { CreateInvoiceRequestDto } from '../types/sale-form.types'

export interface InvoiceSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useInvoiceList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.invoices.list({ page, limit }),
    queryFn: () => SalesService.salesControllerGetAllInvoices({ page, limit }),
  })
}

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.invoices.byId(id),
    queryFn: () => SalesService.salesControllerGetInvoice({ id }),
    enabled: Boolean(id),
  })
}

export const useInvoiceSearch = ({ keyword = '', fromDate, toDate, page, limit }: InvoiceSearchParams) => {
  return useQuery({
    queryKey: queryKeys.invoices.search({ keyword, fromDate, toDate, page, limit }),
    queryFn: () =>
      SalesService.salesControllerSearchInvoices({
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
    mutationFn: (requestBody: CreateInvoiceRequestDto) => SalesService.salesControllerCreateInvoice({ requestBody }),
  })
}

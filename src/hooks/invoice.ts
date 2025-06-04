import {  useMutation,useQuery } from '@tanstack/react-query'

import { type CreateInvoiceDto, SalesService } from '@/api-sdk'

interface InvoiceSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useInvoiceList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['invoices', page, limit],
    queryFn: () => SalesService.salesControllerGetAllInvoices({ page, limit }),
  })
}

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ['invoices', id],
    queryFn: () => SalesService.salesControllerGetInvoice({ id: id }),
    enabled: !!id, 
  })
}

export const useInvoiceSearch = ({ keyword = '', fromDate, toDate, page, limit }: InvoiceSearchParams) => {
  return useQuery({
    queryKey: ['invoices', 'search', keyword, fromDate, toDate, page, limit],
    queryFn: () =>
      SalesService.salesControllerSearchInvoices({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: !!keyword || !!fromDate || !!toDate,
  })
}

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (payload: CreateInvoiceDto) =>
      SalesService.salesControllerCreateInvoice({ requestBody: payload }),
  })
}

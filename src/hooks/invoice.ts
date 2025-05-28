import {  useQuery } from '@tanstack/react-query'

import {  SalesService } from '@/api-sdk'

export const useInvoiceList = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: () => SalesService.salesControllerGetAllInvoices(),
    staleTime: 5 * 60 * 1000, 
  })
}

export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ['invoices', id],
    queryFn: () => SalesService.salesControllerGetInvoice({ id: id }),
    enabled: !!id, 
  })
}


interface InvoiceSearchParams {
  keyword: string
  fromDate?: string 
  toDate?: string   
}

export const useInvoiceSearch = ({ keyword, fromDate, toDate }: InvoiceSearchParams) => {
  return useQuery({
    queryKey: ['invoices', 'search', keyword, fromDate, toDate],
    queryFn: () =>
      SalesService.salesControllerSearchInvoices({
        keyword,
        fromDate: fromDate ?? '',
        toDate: toDate ?? '',
      }),
      // enabled: !!keyword && keyword.length > 0,
      staleTime: 5 * 60 * 1000,
  })
}


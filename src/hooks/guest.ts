import { useQuery } from '@tanstack/react-query'

import { RegisteredGuestService } from '@/api-sdk'

interface GuestInvoiceSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useRegisteredGuestInvoices = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['registered-guest-invoices', page, limit],
    queryFn: () => RegisteredGuestService.registeredGuestControllerGetInvoices({ page, limit }),
  })
}

export const useRegisteredGuestInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ['registered-guest-invoice', id],
    queryFn: () => RegisteredGuestService.registeredGuestControllerGetInvoice({ id }),
    enabled: !!id,
  })
}

export const useRegisteredGuestInvoiceSearch = ({
  keyword = '',
  fromDate,
  toDate,
  page,
  limit,
}: GuestInvoiceSearchParams) => {
  return useQuery({
    queryKey: ['registered-guest-invoices', 'search', keyword, fromDate, toDate, page, limit],
    queryFn: () =>
      RegisteredGuestService.registeredGuestControllerSearchInvoices({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: !!keyword || !!fromDate || !!toDate,
  })
}

import { type CreateInvoiceDto, type InvoiceResponseDto, type PaginatedInvoiceResponseDto, SalesService } from '@/api-sdk'

import type { CreateInvoiceRequestDto } from '../types/sale-form.types'

export interface InvoiceSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export interface InvoiceListParams {
  page: number
  limit: number
}

export const invoiceApi = {
  list: ({ page, limit }: InvoiceListParams): Promise<PaginatedInvoiceResponseDto> =>
    SalesService.salesControllerGetAllInvoices({ page, limit }),
  byId: (id: string): Promise<InvoiceResponseDto> => SalesService.salesControllerGetInvoice({ id }),
  search: ({ keyword, fromDate, toDate, page, limit }: InvoiceSearchParams): Promise<PaginatedInvoiceResponseDto> =>
    SalesService.salesControllerSearchInvoices({
      keyword,
      fromDate,
      toDate,
      page,
      limit,
    }),
  create: (payload: CreateInvoiceRequestDto): Promise<InvoiceResponseDto> =>
    SalesService.salesControllerCreateInvoice({
      requestBody: payload as CreateInvoiceDto,
    }),
}

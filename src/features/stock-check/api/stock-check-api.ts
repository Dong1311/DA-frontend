import {
  type CreateStockCheckDto,
  type PaginatedStockCheckResponseDto,
  type StockCheckResponseDto,
  StockCheckService,
  type UpdateStockCheckDto,
} from '@/api-sdk'

export interface StockCheckSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export interface StockCheckUpdateParams {
  id: string
  payload: UpdateStockCheckDto
}

export const stockCheckApi = {
  list: (page: number, limit: number): Promise<PaginatedStockCheckResponseDto> =>
    StockCheckService.stockCheckControllerGetAll({ page, limit }),
  detail: (id: string): Promise<StockCheckResponseDto> => StockCheckService.stockCheckControllerGetOne({ id }),
  search: ({ keyword, fromDate, toDate, page, limit }: StockCheckSearchParams): Promise<PaginatedStockCheckResponseDto> =>
    StockCheckService.stockCheckControllerSearch({
      keyword,
      fromDate,
      toDate,
      page,
      limit,
    }),
  create: (payload: CreateStockCheckDto): Promise<StockCheckResponseDto> =>
    StockCheckService.stockCheckControllerCreate({ requestBody: payload }),
  update: ({ id, payload }: StockCheckUpdateParams): Promise<StockCheckResponseDto> =>
    StockCheckService.stockCheckControllerUpdate({ id, requestBody: payload }),
}

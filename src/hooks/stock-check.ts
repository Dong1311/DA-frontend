import { useMutation, useQuery } from '@tanstack/react-query'

import { type CreateStockCheckDto, StockCheckService } from '@/api-sdk'

interface StockCheckSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useStockCheckList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['stock-checks', page, limit],
    queryFn: () =>
      StockCheckService.stockCheckControllerGetAll({
        page,
        limit,
      }),
  })
}

export const useStockCheckById = (id: string) => {
  return useQuery({
    queryKey: ['stock-checks', id],
    queryFn: () => StockCheckService.stockCheckControllerGetOne({ id }),
    enabled: !!id,
  })
}

export const useStockCheckSearch = ({
  keyword = '',
  fromDate,
  toDate,
  page,
  limit,
}: StockCheckSearchParams) => {
  return useQuery({
    queryKey: ['stock-checks', 'search', keyword, fromDate, toDate, page, limit],
    queryFn: () =>
      StockCheckService.stockCheckControllerSearch({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: !!keyword || !!fromDate || !!toDate,
  })
}

export const useCreateStockCheck = () => {
  return useMutation({
    mutationFn: (payload: CreateStockCheckDto) =>
      StockCheckService.stockCheckControllerCreate({ requestBody: payload }),
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateStockCheckDto, StockCheckService, type UpdateStockCheckDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

export interface StockCheckSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useStockCheckList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.list({ page, limit }),
    queryFn: () => StockCheckService.stockCheckControllerGetAll({ page, limit }),
  })
}

export const useStockCheckById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.detail(id),
    queryFn: () => StockCheckService.stockCheckControllerGetOne({ id }),
    enabled: Boolean(id),
  })
}

export const useStockCheckSearch = ({ keyword = '', fromDate, toDate, page, limit }: StockCheckSearchParams) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.search({ keyword, fromDate, toDate, page, limit }),
    queryFn: () =>
      StockCheckService.stockCheckControllerSearch({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: Boolean(keyword) || Boolean(fromDate) || Boolean(toDate),
  })
}

export const useCreateStockCheck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: CreateStockCheckDto) => StockCheckService.stockCheckControllerCreate({ requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stockChecks.all })
    },
  })
}

export const useUpdateStockCheck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStockCheckDto }) =>
      StockCheckService.stockCheckControllerUpdate({ id, requestBody: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stockChecks.all })
    },
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateStockCheckDto, type UpdateStockCheckDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { stockCheckApi, type StockCheckSearchParams } from '../api/stock-check-api'

export const useStockCheckList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.list({ page, limit }),
    queryFn: () => stockCheckApi.list(page, limit),
  })
}

export const useStockCheckById = (id: string) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.detail(id),
    queryFn: () => stockCheckApi.detail(id),
    enabled: Boolean(id),
  })
}

export const useStockCheckSearch = ({ keyword = '', fromDate, toDate, page, limit }: StockCheckSearchParams) => {
  return useQuery({
    queryKey: queryKeys.stockChecks.search({ keyword, fromDate, toDate, page, limit }),
    queryFn: () =>
      stockCheckApi.search({
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
    mutationFn: (payload: CreateStockCheckDto) => stockCheckApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stockChecks.all })
    },
  })
}

export const useUpdateStockCheck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStockCheckDto }) => stockCheckApi.update({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stockChecks.all })
    },
  })
}

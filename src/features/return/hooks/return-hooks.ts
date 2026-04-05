import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreateReturnDto, PaginatedReturnResponseDto, ReturnResponseDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { returnApi } from '../api/return-api'

export const useCreateReturn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateReturnDto) => returnApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.returns.all })
    },
  })
}

export const useReturnList = (page: number, limit: number) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: queryKeys.returns.list({ page, limit }),
    queryFn: () => returnApi.list({ page, limit }),
  })
}

export const useReturnSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: queryKeys.returns.search({ keyword, page, limit }),
    queryFn: () => returnApi.search({ keyword, page, limit }),
    enabled: keyword.length > 0,
  })
}

export const useReturnById = (id: string, enabled = true) => {
  return useQuery<ReturnResponseDto>({
    queryKey: queryKeys.returns.detail(id),
    queryFn: () => returnApi.byId(id),
    enabled: Boolean(id) && enabled,
  })
}

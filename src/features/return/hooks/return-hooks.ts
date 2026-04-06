import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateReturnDto, type PaginatedReturnResponseDto, type ReturnResponseDto, ReturnsService } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

export const useCreateReturn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: CreateReturnDto) => ReturnsService.returnControllerCreateReturn({ requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.returns.all })
    },
  })
}

export const useReturnList = (page: number, limit: number) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: queryKeys.returns.list({ page, limit }),
    queryFn: () => ReturnsService.returnControllerFindAll({ page, limit }),
  })
}

export const useReturnSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: queryKeys.returns.search({ keyword, page, limit }),
    queryFn: () => ReturnsService.returnControllerSearch({ keyword, page, limit }),
    enabled: keyword.length > 0,
  })
}

export const useReturnById = (id: string, enabled = true) => {
  return useQuery<ReturnResponseDto>({
    queryKey: queryKeys.returns.detail(id),
    queryFn: () => ReturnsService.returnControllerGetById({ id }),
    enabled: Boolean(id) && enabled,
  })
}

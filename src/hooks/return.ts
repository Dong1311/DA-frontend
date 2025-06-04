import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { PaginatedReturnResponseDto } from '@/api-sdk'
import type { CreateReturnDto } from '@/api-sdk'
import { type ReturnResponseDto, ReturnsService } from '@/api-sdk'

export const useCreateReturn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateReturnDto) =>
      ReturnsService.returnControllerCreateReturn({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] })
    },
  })
}

export const useReturnList = (page: number, limit: number) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: ['returns', page, limit],
    queryFn: () => ReturnsService.returnControllerFindAll({ page, limit }),
  })
}
export const useReturnSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedReturnResponseDto>({
    queryKey: ['returns', 'search', keyword, page, limit],
    queryFn: () => ReturnsService.returnControllerSearch({ keyword, page, limit }),
    enabled: keyword.length > 0,
  })
}

export const useReturnById = (id: string, enabled = true) => {
  return useQuery<ReturnResponseDto>({
    queryKey: ['return', id],
    queryFn: () => ReturnsService.returnControllerGetById({ id }),
    enabled: !!id && enabled,
  })
}
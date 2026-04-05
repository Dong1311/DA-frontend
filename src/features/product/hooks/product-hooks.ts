import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateProductDto, type PaginatedProductResponseDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { productApi } from '../api/product-api'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductDto) => productApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

export const useProductSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedProductResponseDto>({
    queryKey: queryKeys.products.search({ keyword, page, limit }),
    queryFn: () => productApi.search({ keyword, page, limit }),
    enabled: keyword.length > 0,
  })
}

export const useProductList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.products.list({ page, limit }),
    queryFn: () => productApi.list({ page, limit }),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

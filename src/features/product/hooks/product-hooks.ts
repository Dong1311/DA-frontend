import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateProductDto, type PaginatedProductResponseDto, ProductsService, type UpdateProductDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: CreateProductDto) => ProductsService.productControllerCreate({ requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

export const useProductSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedProductResponseDto>({
    queryKey: queryKeys.products.search({ keyword, page, limit }),
    queryFn: () => ProductsService.productControllerSearch({ keyword, page, limit }),
    enabled: keyword.length > 0,
  })
}

export const useProductList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.products.list({ page, limit }),
    queryFn: () => ProductsService.productControllerFindAll({ page, limit }),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, requestBody }: { id: string; requestBody: UpdateProductDto }) =>
      ProductsService.productControllerUpdate({ id, requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

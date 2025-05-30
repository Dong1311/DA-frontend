import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { type CreateProductDto, type PaginatedProductResponseDto,ProductsService } from '@/api-sdk'
import { type ProductFormValues } from '@/constants/schema'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductDto) => ProductsService.productControllerCreate({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useProductSearch = (keyword: string, page = 1, limit = 10) => {
  return useQuery<PaginatedProductResponseDto>({
    queryKey: ['products', 'search', keyword, page, limit],
    queryFn: () => ProductsService.productControllerSearch({ keyword, page, limit }),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export const useProductList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => ProductsService.productControllerFindAll({ page, limit }),
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: ProductFormValues }) =>
      ProductsService.productControllerUpdate({
        id: data.id,
        requestBody: data.requestBody,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

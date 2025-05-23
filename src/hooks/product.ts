import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { type CreateProductDto, ProductsService } from '@/api-sdk'
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

export const useProductSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['products', 'search', keyword],
    queryFn: () => ProductsService.productControllerSearch({ keyword }),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.productControllerFindAll(),
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

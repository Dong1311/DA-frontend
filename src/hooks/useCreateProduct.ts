import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ProductsService } from '@/api-sdk'
import { type CreateProductDto } from '@/api-sdk'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductDto) => ProductsService.productControllerCreate({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

import { useQuery } from '@tanstack/react-query'

import { ProductsService } from '@/api-sdk'

export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.productControllerFindAll(),
  })
}

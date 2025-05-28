import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { type CreateSupplierDto, SuppliersService } from '@/api-sdk'
import { type SupplierFormValues } from '@/constants/schema'

export const useCreateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSupplierDto) => SuppliersService.supplierControllerCreate({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })
}

export const useSupplierSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['products', 'search', keyword],
    queryFn: () => SuppliersService.supplierControllerSearch({ keyword }),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSupplierList = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: () => SuppliersService.supplierControllerFindAll(),
  })
}

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: SupplierFormValues }) =>
      SuppliersService.supplierControllerUpdate({
        id: data.id,
        requestBody: data.requestBody,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })
}

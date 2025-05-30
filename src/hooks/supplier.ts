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

export const useSupplierList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['suppliers', page],
    queryFn: () => SuppliersService.supplierControllerFindAll({ page, limit }),
  })
}

export const useSupplierSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ['suppliers', 'search', keyword, page],
    queryFn: () => SuppliersService.supplierControllerSearch({ keyword, page, limit }),
    enabled: !!keyword,
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

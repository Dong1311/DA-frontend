import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateSupplierDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { supplierApi } from '../api/supplier-api'

export const useCreateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSupplierDto) => supplierApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })
    },
  })
}

export const useSupplierList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.suppliers.list({ page, limit }),
    queryFn: () => supplierApi.list({ page, limit }),
  })
}

export const useSupplierSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.suppliers.search({ keyword, page, limit }),
    queryFn: () => supplierApi.search({ keyword, page, limit }),
    enabled: Boolean(keyword),
  })
}

export const useUpdateSupplier = <TPayload = unknown>() => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: TPayload }) => supplierApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })
    },
  })
}

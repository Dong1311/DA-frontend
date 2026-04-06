import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateCustomerDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { customerApi } from '../api/customer-api'

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => customerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })
    },
  })
}

export const useCustomerList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.customers.list({ page, limit }),
    queryFn: () => customerApi.list({ page, limit }),
  })
}

export const useCustomerSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.customers.search({ keyword, page, limit }),
    queryFn: () => customerApi.search({ keyword, page, limit }),
    enabled: Boolean(keyword),
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdateCustomer = <TPayload = unknown>() => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: TPayload }) => customerApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })
    },
  })
}

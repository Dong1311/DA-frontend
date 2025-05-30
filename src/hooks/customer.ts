import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { type CreateCustomerDto, CustomersService } from '@/api-sdk'
import { type CustomerFormValues } from '@/constants/schema'

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => CustomersService.customerControllerCreate({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}

export const useCustomerList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['customers', page],
    queryFn: () => CustomersService.customerControllerFindAll({ page, limit }),
  })
}

export const useCustomerSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ['customers', 'search', keyword, page],
    queryFn: () => CustomersService.customerControllerSearch({ keyword, page, limit }),
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000,
  })
}


export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: CustomerFormValues }) =>
      CustomersService.customerControllerUpdate({
        id: data.id,
        requestBody: data.requestBody,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}



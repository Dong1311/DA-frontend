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

export const useCustomerList = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => CustomersService.customerControllerFindAll(),
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
      // Sau khi cập nhật thành công, làm mới danh sách khách hàng
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}

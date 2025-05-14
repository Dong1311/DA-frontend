import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CustomersService } from '@/api-sdk'
import { type CreateCustomerDto } from '@/api-sdk'

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => CustomersService.customerControllerCreate({ requestBody: data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}

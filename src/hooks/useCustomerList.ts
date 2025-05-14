import { useQuery } from '@tanstack/react-query'

import { CustomersService } from '@/api-sdk'

export const useCustomerList = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => CustomersService.customerControllerFindAll(),
  })
}

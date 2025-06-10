import { useQuery } from '@tanstack/react-query'

import { AdminService, type UpdateStoreStatusDto } from '@/api-sdk'

export const usePendingStores = () => {
  return useQuery({
    queryKey: ['pendingStores'],
    queryFn: () => AdminService.adminControllerGetStores(),
  })
}

import { useMutation } from '@tanstack/react-query'


export const useUpdateStoreStatus = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ storeId, status }: { storeId: string; status: UpdateStoreStatusDto.status }) =>
      AdminService.adminControllerUpdateStoreStatus({
        id: storeId,
        requestBody: { status },
      }),
    onSuccess,
  })
}

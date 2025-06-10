import { useQuery } from '@tanstack/react-query'

import { ChatPublicService } from '@/api-sdk' 

export const useAvailableStores = () => {
  return useQuery({
    queryKey: ['availableStores'],
    queryFn: () => ChatPublicService.chatPublicControllerGetStores(),
  })
}

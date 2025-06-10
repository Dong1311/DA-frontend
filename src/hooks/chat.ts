
import { useQuery } from '@tanstack/react-query'

import { AdminChatService } from '@/api-sdk'

export const useAdminConversations = () => {
  return useQuery({
    queryKey: ['adminConversations'],
    queryFn: () => AdminChatService.adminChatControllerGetConversations(),
  })
}


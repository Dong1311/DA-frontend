'use client'

import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'
export const AdminChatBox = ({ conversationId, adminId }: { conversationId: string; adminId: string }) => {
  const { messages, sendMessage } = useChatSocket({
    conversationId,
    senderRole: 'ADMIN',
    senderId: adminId,
  })

  return <ChatBox messages={messages} sendMessage={sendMessage} role="ADMIN" />
}

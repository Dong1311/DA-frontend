'use client'

import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'
export const AdminChatBox = ({ conversationId, adminId }: { conversationId: string; adminId: string }) => {
  const { messages, sendMessage, loading } = useChatSocket({
    conversationId,
    senderRole: 'ADMIN',
    senderId: adminId,
  })
  if (loading) return <div>Đang tải tin nhắn...</div>

  return <ChatBox messages={messages} sendMessage={sendMessage} role="ADMIN" />
}

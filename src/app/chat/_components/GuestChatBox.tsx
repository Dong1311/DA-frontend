'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ChatPublicService } from '@/api-sdk'
import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'

export const GuestChatBox = () => {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')

  useEffect(() => {
    const initConversation = async () => {
      if (!storeId) return

      let guestSessionId = localStorage.getItem('guestSessionId')
      if (!guestSessionId) {
        guestSessionId = crypto.randomUUID()
        localStorage.setItem('guestSessionId', guestSessionId)
      }

      const response = await ChatPublicService.chatPublicControllerStartConversation({
        requestBody: {
          guestSessionId,
          storeId,
        },
      })

      setConversationId(response.conversationId)
    }

    initConversation()
  }, [storeId])

  const { messages, sendMessage } = useChatSocket({
    conversationId: conversationId || '',
    senderRole: 'GUEST',
  })

  if (!storeId) return <div className="text-red-500">Vui lòng chọn nhà thuốc để bắt đầu chat.</div>
  if (!conversationId) return <div>Đang khởi tạo cuộc trò chuyện...</div>

  return <ChatBox messages={messages} sendMessage={sendMessage} role="GUEST" />
}

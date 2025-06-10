'use client'

import { useEffect, useState } from 'react'

import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'
export const GuestChatBox = () => {
  const [conversationId, setConversationId] = useState<string>('')

  useEffect(() => {
    let stored = localStorage.getItem('guest_conversation_id')
    if (!stored) {
      stored = crypto.randomUUID()
      localStorage.setItem('guest_conversation_id', stored)
    }
    setConversationId(stored)
  }, [])

  const { messages, sendMessage } = useChatSocket({
    conversationId,
    senderRole: 'GUEST',
  })

  return <ChatBox messages={messages} sendMessage={sendMessage} role="GUEST" />
}

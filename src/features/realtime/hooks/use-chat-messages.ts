import { useEffect, useState } from 'react'

import { MessagesService } from '@/api-sdk'

import { type ChatApiMessage, type ChatMessage, toChatMessage } from '../socket/realtime-types'

export const useChatMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!conversationId) return

    const fetchMessages = async () => {
      setLoading(true)
      try {
        const response = (await MessagesService.messageControllerGetMessages({ id: conversationId })) as ChatApiMessage[]
        setMessages(response.map(toChatMessage))
      } catch (error) {
        console.error('Failed to load chat messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [conversationId])

  return { messages, loading, setMessages }
}

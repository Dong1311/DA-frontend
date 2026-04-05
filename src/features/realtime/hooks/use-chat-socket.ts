import { useEffect, useRef } from 'react'
import type { Socket } from 'socket.io-client'

import type { ChatMessage, SendImageMessagePayload, SendMessagePayload, UserRole } from '../socket/realtime-types'
import { createChatSocket } from '../socket/socket-client'
import { useChatMessages } from './use-chat-messages'

interface UseChatSocketParams {
  conversationId: string
  senderRole: UserRole
  senderId?: string
}

export const useChatSocket = ({ conversationId, senderRole, senderId }: UseChatSocketParams) => {
  const socketRef = useRef<Socket | null>(null)
  const { messages, loading, setMessages } = useChatMessages(conversationId)

  useEffect(() => {
    if (!conversationId || socketRef.current) return

    const socket = createChatSocket({ conversationId })
    socketRef.current = socket

    const handleChatMessage = (message: ChatMessage) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (currentMessage) =>
            currentMessage.id === message.id ||
            (currentMessage.content === message.content &&
              currentMessage.sender === message.sender &&
              !currentMessage.id &&
              !message.id)
        )

        return isDuplicate ? prev : [...prev, message]
      })
    }

    socket.on('chat_message', handleChatMessage)

    return () => {
      socket.off('chat_message', handleChatMessage)
      socket.disconnect()
      socketRef.current = null
    }
  }, [conversationId, setMessages])

  const sendMessage = (content: string) => {
    const socket = socketRef.current
    if (!socket) return

    const payload: SendMessagePayload = {
      conversationId,
      content,
      senderRole,
      senderId,
    }

    socket.emit('chat_message', payload)
  }

  const sendImageMessage = (imageUrl: string) => {
    const socket = socketRef.current
    if (!socket) return

    const payload: SendImageMessagePayload = {
      conversationId,
      imageUrls: [imageUrl],
      senderRole,
      senderId,
    }

    socket.emit('chat_message', payload)
  }

  return {
    messages,
    loading,
    sendMessage,
    sendImageMessage,
  }
}

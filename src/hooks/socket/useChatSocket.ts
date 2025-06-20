import { useEffect, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'

import { useChatMessages } from './useChatMessages'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || ''

export type UserRole = 'GUEST' | 'ADMIN'

export interface ChatMessage {
  id?: string
  content: string
  sender: 'guest' | 'admin'
  senderId?: string | null
  createdAt?: string
  attachments?: { imageUrl: string }[]
}

interface SendMessagePayload {
  conversationId: string
  content: string
  senderRole: UserRole
  senderId?: string
}

export const useChatSocket = ({
  conversationId,
  senderRole,
  senderId,
}: {
  conversationId: string
  senderRole: UserRole
  senderId?: string
}) => {
  const socketRef = useRef<Socket | null>(null)

  const {
    messages,
    loading,
    setMessages,
  } = useChatMessages(conversationId)

  useEffect(() => {
    if (!conversationId || socketRef.current) return

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      query: { conversationId },
      extraHeaders: {
        'x-app-client': 'web-chat',
      },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[ChatSocket] connected:', socket.id)
    })

    const handleChatMessage = (msg: ChatMessage) => {
      console.log('[ChatSocket] chat_message received:', msg)

      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) =>
            m.id === msg.id ||
            (m.content === msg.content &&
              m.sender === msg.sender &&
              !m.id &&
              !msg.id)
        )

        return isDuplicate ? prev : [...prev, msg]
      })
    }

    socket.on('chat_message', handleChatMessage)

    return () => {
      console.log('[ChatSocket] cleanup')
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

    socket.emit('chat_message', {
      conversationId,
      imageUrls: [imageUrl],
      senderRole,
      senderId,
    })
  }

  return {
    messages,
    sendMessage,
    loading,
    sendImageMessage,
  }
}

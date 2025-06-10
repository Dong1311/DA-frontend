import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || '';

export type UserRole = 'GUEST' | 'ADMIN'

export interface ChatMessage {
  id?: string
  content: string
  sender: 'guest' | 'admin'
  senderId?: string | null
  createdAt?: string
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
  const [messages, setMessages] = useState<ChatMessage[]>([])

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
      setMessages((prev) => [...prev, msg])
    }

    socket.on('chat_message', handleChatMessage)

    return () => {
      console.log('[ChatSocket] cleanup')
      socket.off('chat_message', handleChatMessage)
      socket.disconnect()
      socketRef.current = null
    }
  }, [conversationId])

  const sendMessage = (content: string) => {
    const socket = socketRef.current
    if (!socket) return

    const localMessage: ChatMessage = {
      content,
      sender: senderRole.toLowerCase() as 'guest' | 'admin',
      senderId: senderId || null,
    }

    setMessages((prev) => [...prev, localMessage])

    const payload: SendMessagePayload = {
      conversationId,
      content,
      senderRole,
      senderId,
    }

    socket.emit('chat_message', payload)
  }

  return {
    messages,
    sendMessage,
  }
}

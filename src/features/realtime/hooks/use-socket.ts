import { useEffect, useRef, useState } from 'react'
import type { Socket } from 'socket.io-client'

import type { ChatMessage, PaymentSuccessPayload, SendMessagePayload, UserRole } from '../socket/realtime-types'
import { createChatSocket } from '../socket/socket-client'

interface UseSocketParams {
  conversationId: string
  senderRole: UserRole
  senderId?: string
}

export const useSocket = ({ conversationId, senderRole, senderId }: UseSocketParams) => {
  const socketRef = useRef<Socket | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null)

  useEffect(() => {
    if (!conversationId || socketRef.current) return

    const socket = createChatSocket({ conversationId })
    socketRef.current = socket

    const handleChatMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    }

    const handlePaymentSuccess = (data: PaymentSuccessPayload) => {
      setPaymentSuccessData(data)
    }

    socket.on('chat_message', handleChatMessage)
    socket.on('payment_success', handlePaymentSuccess)

    return () => {
      socket.off('chat_message', handleChatMessage)
      socket.off('payment_success', handlePaymentSuccess)
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
      senderId: senderId ?? null,
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
    paymentSuccessData,
  }
}

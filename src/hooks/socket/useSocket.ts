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

interface PaymentSuccessPayload {
  invoiceId: string;
  paymentId: string;
  amountPaid: number;
  status: string;
}

interface SendMessagePayload {
  conversationId: string
  content: string
  senderRole: UserRole
  senderId?: string
}

export const useSocket = ({
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
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null)

  useEffect(() => {
    if (!conversationId) return
    if (socketRef.current) return

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      query: {
        conversationId,
      },
      extraHeaders: {
        'x-app-client': 'web-chat',
      },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[Socket] connected:', socket.id)
    })

    const handleChatMessage = (msg: ChatMessage) => {
      console.log('[Socket] chat_message received:', msg)
      setMessages((prev) => [...prev, msg])
    }

    const handlePaymentSuccess = (data: PaymentSuccessPayload) => {
      console.log('[Socket] payment_success received:', data);
      setPaymentSuccessData(data);
    };

    socket.on('chat_message', handleChatMessage)
    socket.on('payment_success', handlePaymentSuccess)

    return () => {
      console.log('[useSocket] cleanup socket')
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
    paymentSuccessData,
  }
}

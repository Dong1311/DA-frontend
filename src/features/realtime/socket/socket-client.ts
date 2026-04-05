import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface CreateChatSocketOptions {
  conversationId: string
}

export const createChatSocket = ({ conversationId }: CreateChatSocketOptions): Socket =>
  io(SOCKET_URL, {
    withCredentials: true,
    query: {
      conversationId,
    },
    extraHeaders: {
      'x-app-client': 'web-chat',
    },
  })

export const createPaymentSocket = (): Socket =>
  io(SOCKET_URL, {
    withCredentials: true,
    extraHeaders: {
      'x-app-client': 'web-payment',
    },
  })

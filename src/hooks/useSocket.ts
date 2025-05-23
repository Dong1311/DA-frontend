import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface PaymentSuccessPayload {
  invoiceId: string
  paymentId: string
  amountPaid: number
  status: string
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null)

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    })

    setSocket(socketIo)

    socketIo.on('connect', () => {
      console.log('Connected to websocket server')
    })

    socketIo.on('message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    socketIo.on('payment_success', (data: PaymentSuccessPayload) => {
      console.log('Received payment_success event:', data)
      setPaymentSuccessData(data)
    })

    return () => {
      socketIo.off('message')
      socketIo.off('payment_success')
      socketIo.disconnect()
    }
  }, [])

  const sendMessage = (msg: any) => {
    if (socket) socket.emit('message', msg)
  }

  return { messages, sendMessage, paymentSuccessData }
}

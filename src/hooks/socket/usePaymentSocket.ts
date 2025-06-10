import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface PaymentSuccessPayload {
  invoiceId: string
  paymentId: string
  amountPaid: number
  status: string
}

export const usePaymentSocket = () => {
  const socketRef = useRef<Socket | null>(null)
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null)

  useEffect(() => {
    if (socketRef.current) return

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        'x-app-client': 'web-payment',
      },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[PaymentSocket] connected:', socket.id)
    })

    const handlePaymentSuccess = (data: PaymentSuccessPayload) => {
      console.log('[PaymentSocket] payment_success received:', data)
      setPaymentSuccessData(data)
    }

    socket.on('payment_success', handlePaymentSuccess)

    return () => {
      console.log('[PaymentSocket] cleanup')
      socket.off('payment_success', handlePaymentSuccess)
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return {
    paymentSuccessData,
  }
}

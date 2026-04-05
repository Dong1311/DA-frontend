import { useEffect, useRef, useState } from 'react'
import type { Socket } from 'socket.io-client'

import type { PaymentSuccessPayload } from '../socket/realtime-types'
import { createPaymentSocket } from '../socket/socket-client'

export const usePaymentSocket = () => {
  const socketRef = useRef<Socket | null>(null)
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null)

  useEffect(() => {
    if (socketRef.current) return

    const socket = createPaymentSocket()
    socketRef.current = socket

    const handlePaymentSuccess = (data: PaymentSuccessPayload) => {
      setPaymentSuccessData(data)
    }

    socket.on('payment_success', handlePaymentSuccess)

    return () => {
      socket.off('payment_success', handlePaymentSuccess)
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return {
    paymentSuccessData,
  }
}

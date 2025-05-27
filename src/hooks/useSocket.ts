import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ChatMessage {
  sender: 'user' | 'assistant';
  content: string;
}

interface PaymentSuccessPayload {
  invoiceId: string;
  paymentId: string;
  amountPaid: number;
  status: string;
}

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [paymentSuccessData, setPaymentSuccessData] = useState<PaymentSuccessPayload | null>(null);

  useEffect(() => {
    console.log('[Hook mount] useSocket initialized');

    if (socketRef.current) return;

    console.log('[useSocket] creating socket...');
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Socket] connected:', socket.id);
    });

    const handleChatMessage = (msg: ChatMessage) => {
      console.log('[Socket] chat_message received:', msg);
      setMessages((prev) => [...prev, msg]);
    };

    const handlePaymentSuccess = (data: PaymentSuccessPayload) => {
      console.log('[Socket] payment_success received:', data);
      setPaymentSuccessData(data);
    };

    socket.on('chat_message', handleChatMessage);
    socket.on('payment_success', handlePaymentSuccess);

    return () => {
      console.log('[useSocket] cleanup socket');
      socket.off('chat_message', handleChatMessage);
      socket.off('payment_success', handlePaymentSuccess);
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = (content: string) => {
    const socket = socketRef.current;
    if (!socket) return;

    const userMessage: ChatMessage = { sender: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    socket.emit('chat_message', content);
  };

  return {
    messages,
    sendMessage,
    paymentSuccessData,
  };
};

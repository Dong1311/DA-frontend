import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('Connected to websocket server');
    });

    socketIo.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    if (socket) socket.emit('message', msg);
  };

  return { messages, sendMessage };
}

import { useEffect, useState } from 'react'

import { MessagesService } from '@/api-sdk'

export const useChatMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!conversationId) return

    const fetchMessages = async () => {
      setLoading(true)
      try {
        const res = await MessagesService.messageControllerGetMessages({ id: conversationId })

        setMessages(
          res.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            sender: msg.senderRole.toLowerCase() as 'guest' | 'admin',
            senderId: msg.senderId ?? null,
            createdAt: msg.createdAt,
            attachments: msg.attachments ?? [],
          }))
        )
      } catch (err) {
        console.error('Lỗi khi load tin nhắn:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [conversationId])

  return { messages, loading, setMessages }
}

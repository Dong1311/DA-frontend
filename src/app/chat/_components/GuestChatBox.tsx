'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ChatPublicService } from '@/api-sdk'
import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'

import { ModalCheckoutGuest } from './ModalCheckoutGuest'

export const GuestChatBox = () => {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')
  const [checkoutInvoiceId, setCheckoutInvoiceId] = useState<string | null>(null)

  const handleClickMessage = (content: string) => {
    const match = content.match(/\/guest\/checkout\/([a-z0-9-]+)/)
    if (match) setCheckoutInvoiceId(match[1])
  }

  useEffect(() => {
    const initConversation = async () => {
      if (!storeId) return

      let guestSessionId = localStorage.getItem('guestSessionId')
      if (!guestSessionId) {
        guestSessionId = crypto.randomUUID()
        localStorage.setItem('guestSessionId', guestSessionId)
      }

      const response = await ChatPublicService.chatPublicControllerStartConversation({
        requestBody: {
          guestSessionId,
          storeId,
        },
      })

      setConversationId(response.conversationId)
    }

    initConversation()
  }, [storeId])

  const { messages, sendMessage } = useChatSocket({
    conversationId: conversationId || '',
    senderRole: 'GUEST',
  })

  if (!storeId) return <div className="text-red-500">Vui lòng chọn nhà thuốc để bắt đầu chat.</div>
  if (!conversationId) return <div>Đang khởi tạo cuộc trò chuyện...</div>

  return (
    <>
      <ChatBox messages={messages} sendMessage={sendMessage} role="GUEST" onClickMessage={handleClickMessage} />
      {checkoutInvoiceId && (
        <ModalCheckoutGuest
          open={!!checkoutInvoiceId}
          invoiceId={checkoutInvoiceId}
          onClose={() => setCheckoutInvoiceId(null)}
        />
      )}
    </>
  )
}

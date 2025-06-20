'use client'

import { Button } from 'antd'
import { useState } from 'react'

import { ChatBox } from '@/components/ChatBox'
import { useChatSocket } from '@/hooks/socket/useChatSocket'

import { ChatSaleForm } from './ChatSaleForm'

export const AdminChatBox = ({ conversationId, adminId }: { conversationId: string; adminId: string }) => {
  const { messages, sendMessage, loading, sendImageMessage } = useChatSocket({
    conversationId,
    senderRole: 'ADMIN',
    senderId: adminId,
  })

  const [showForm, setShowForm] = useState(false)
  const handleSendInvoiceToGuest = (invoiceId: string) => {
    const paymentLink = `${window.location.origin}/guest/checkout/${invoiceId}`
    sendMessage(`[HỆ THỐNG] Đơn hàng mới: ${paymentLink}`)
  }

  if (loading) return <div>Đang tải tin nhắn...</div>

  return (
    <div className="w-full flex-1 space-y-6">
      <div className="text-right">
        <Button type="primary" onClick={() => setShowForm(true)}>
          Tạo đơn hàng
        </Button>
      </div>
      <ChatBox messages={messages} sendMessage={sendMessage} sendImageMessage={sendImageMessage} role="ADMIN" />

      <ChatSaleForm
        conversationId={conversationId}
        onInvoiceCreated={handleSendInvoiceToGuest}
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  )
}

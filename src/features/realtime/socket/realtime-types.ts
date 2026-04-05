export type UserRole = 'GUEST' | 'ADMIN'

export interface ChatAttachment {
  id?: string
  imageUrl: string
}

export interface ChatMessage {
  id?: string
  content: string
  sender: 'guest' | 'admin'
  senderId?: string | null
  createdAt?: string
  attachments?: ChatAttachment[]
}

export interface ChatApiMessage {
  id: string
  content: string
  senderRole: UserRole
  senderId?: string | null
  createdAt?: string
  attachments?: ChatAttachment[]
}

export interface PaymentSuccessPayload {
  invoiceId: string
  paymentId: string
  amountPaid: number
  status: string
}

export interface SendMessagePayload {
  conversationId: string
  content: string
  senderRole: UserRole
  senderId?: string
}

export interface SendImageMessagePayload {
  conversationId: string
  imageUrls: string[]
  senderRole: UserRole
  senderId?: string
}

export const toChatMessage = (message: ChatApiMessage): ChatMessage => ({
  id: message.id,
  content: message.content,
  sender: message.senderRole.toLowerCase() as 'guest' | 'admin',
  senderId: message.senderId ?? null,
  createdAt: message.createdAt,
  attachments: message.attachments ?? [],
})

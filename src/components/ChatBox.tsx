'use client'

import { Flex } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useUploadImage } from '@/hooks/image'

import { ChatImageUploader } from './ChatImageUploader'
export interface ChatMessage {
  sender: 'guest' | 'admin'
  content: string
  createdAt?: string
  attachments?: { imageUrl: string }[]
}

interface ChatBoxProps {
  messages: ChatMessage[]
  sendMessage: (content: string) => void
  sendImageMessage: (imageUrl: string) => void
  role: 'GUEST' | 'ADMIN'
  onClickMessage?: (content: string) => void
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, sendMessage, role, onClickMessage, sendImageMessage }) => {
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement | null>(null)
  const { uploadToS3 } = useUploadImage()
  const [pendingImages, setPendingImages] = useState<string[]>([])

  const MAX_LENGTH = 500

  const handleSend = () => {
    if (!input.trim() && pendingImages.length === 0) return

    if (input.trim()) {
      sendMessage(input.trim())
    }

    if (pendingImages.length > 0) {
      pendingImages.forEach((url) => sendImageMessage(url))
      setPendingImages([])
    }

    setInput('')
  }

  console.log(messages)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="w-full space-y-4 rounded border bg-white p-4 shadow-md">
      <div ref={chatRef} className="h-[420px] space-y-2 overflow-y-auto rounded border bg-gray-50 p-3">
        {messages.map((msg, index) => {
          const isSender = (role === 'GUEST' && msg.sender === 'guest') || (role === 'ADMIN' && msg.sender === 'admin')
          const hasText = !!msg.content?.trim()

          return (
            <div key={index} className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[80%] whitespace-pre-line break-words rounded-lg py-2 text-sm shadow-sm ${
                  isSender
                    ? hasText
                      ? 'bg-blue-600 px-3 text-white'
                      : 'text-white'
                    : hasText
                      ? 'bg-gray-200 px-3 text-black'
                      : 'text-black'
                }`}
              >
                <div
                  onClick={() => onClickMessage?.(msg.content)}
                  className={onClickMessage ? 'cursor-pointer hover:underline' : ''}
                >
                  {msg.content}
                </div>
                {msg.attachments?.map((att, i) => (
                  <img key={i} src={att.imageUrl} alt="Ảnh đính kèm" className="mt-2 max-w-[200px] rounded" />
                ))}
              </div>

              {msg.createdAt && (
                <div className="mt-1 text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="relative flex flex-col gap-1">
        {pendingImages.length > 0 && (
          <div className="flex flex-wrap gap-2 py-2">
            {pendingImages.map((url, idx) => (
              <img key={idx} src={url} alt="Ảnh sắp gửi" className="size-20 rounded border object-cover" />
            ))}
          </div>
        )}

        <input
          type="text"
          value={input}
          maxLength={MAX_LENGTH}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 rounded border px-3 py-2 pr-16 text-sm"
          placeholder="Nhập tin nhắn..."
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-xs text-gray-400">
          {input.length}/{MAX_LENGTH}
        </div>
      </div>
      <Flex justify="space-between">
        <ChatImageUploader
          uploadToS3={uploadToS3}
          onUploaded={(url) => {
            setPendingImages((prev) => [...prev, url])
          }}
        />

        <button
          onClick={handleSend}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          disabled={!input.trim() && pendingImages.length === 0}
        >
          Gửi
        </button>
      </Flex>
    </div>
  )
}

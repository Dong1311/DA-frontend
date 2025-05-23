'use client'
import React, { useState } from 'react'

import { useSocket } from '@/hooks/useSocket'

export default function ChatClient() {
  const { messages, sendMessage } = useSocket()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim())
      setInput('')
    }
  }

  return (
    <div>
      <h2>Chat WebSocket Test</h2>
      <div
        style={{
          height: 200,
          overflowY: 'scroll',
          border: '1px solid gray',
          padding: 8,
          marginBottom: 12,
        }}
      >
        {messages.map((msg: string, idx: number) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        style={{ padding: 8, width: '70%', marginRight: 8, boxSizing: 'border-box' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
      />
      <button style={{ padding: '8px 16px' }} onClick={handleSend}>
        Send
      </button>
    </div>
  )
}

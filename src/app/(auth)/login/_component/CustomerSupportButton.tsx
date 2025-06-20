'use client'

import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

export function CustomerSupportButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="animate-bounce-slow fixed bottom-6 right-6 z-50">
      <Button
        type="primary"
        size="large"
        icon={<MessageOutlined />}
        className="rounded-full p-5 text-base shadow-lg transition-all duration-300 hover:scale-105 md:px-7 md:py-6 md:text-lg"
        onClick={() => window.open('/chat', '_blank')}
      >
        Tư vấn ngay
      </Button>
    </div>
  )
}

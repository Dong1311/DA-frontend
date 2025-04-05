'use client'

import { Card as AntdCard, type CardProps, ConfigProvider } from 'antd'
import { type ComponentToken } from 'antd/es/card/style'

import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

const token: AntdConfig<ComponentToken> = {
  lineWidth: 0,
}

export const Card = ({
  allowHoverStyle,
  ...props
}: CardProps & {
  allowHoverStyle?: boolean
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: token,
        },
      }}
    >
      <AntdCard
        styles={{
          body: {
            padding: props.size === 'small' ? 24 : 40,
            borderRadius: props.size === 'small' ? 8 : 10,
          },
        }}
        {...props}
        className={cn(
          {
            'hover:bg-main-m1 hover:shadow-none': allowHoverStyle,
            'shadow-3xl': props.size === 'small',
            'shadow-lg': props.size === 'default',
          },
          props.className
        )}
      />
    </ConfigProvider>
  )
}

Card.displayName = 'Card'

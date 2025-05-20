'use client'

import { Typography } from 'antd'
import { type ParagraphProps as AntdParagraphProps } from 'antd/es/typography/Paragraph'
import { type TextProps } from 'antd/es/typography/Text'
import { createStyles } from 'antd-style'
import { type CSSProperties, forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib'

const { Paragraph: AntdParagraph, Text: AntdText, Title } = Typography

const useStyles = createStyles(({ css }) => ({
  text: css`
    strong {
      font-weight: 700;
    }
  `,
}))

type ParagraphProps = AntdParagraphProps & {}

const Paragraph = forwardRef<HTMLElement, ParagraphProps>(({ className, ...props }, ref) => {
  return <AntdParagraph className={cn('mb-0', className)} {...props} ref={ref} />
})
Paragraph.displayName = 'Paragraph'

const Text = forwardRef<HTMLElement, TextProps>(({ className, ...props }, ref) => {
  const { styles } = useStyles()
  return <AntdText className={cn('mb-0', className, styles.text)} {...props} ref={ref} />
})
Paragraph.displayName = 'Paragraph'

export const TableTHead = ({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) => (
  <Paragraph
    {...(style ? { style } : {})}
    className={cn('truncate font-medium', className)}
    title={typeof children === 'string' || typeof children === 'number' ? `${children}` : ''}
  >
    {children}
  </Paragraph>
)
export { Paragraph, Text, Title, Typography }

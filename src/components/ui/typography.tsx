'use client'

import { Typography } from 'antd'
// import { type LinkProps as AntdLinkProps } from 'antd/es/typography/Link'
import { type ParagraphProps as AntdParagraphProps } from 'antd/es/typography/Paragraph'
import { type TextProps } from 'antd/es/typography/Text'
import { createStyles } from 'antd-style'
// import { type Url } from 'next/dist/shared/lib/router/router'
import { type CSSProperties, forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib'

// const { Paragraph: AntdParagraph, Text: AntdText, Title, Link: AntdLink } = Typography
const { Paragraph: AntdParagraph, Text: AntdText, Title } = Typography

// type LinkProps = Omit<AntdLinkProps, 'href'> & {
//   href?: Url
//   useNextLink?: boolean
//   textLink?: boolean
// }

const useStyles = createStyles(({ css }) => ({
  text: css`
    strong {
      font-weight: 700;
    }
  `,
}))

// const Link = forwardRef<HTMLAnchorElement, LinkProps>(
//   ({ className, textLink, useNextLink = true, href, ...props }, ref) => {
//     const Comp = useNextLink ? NextLink : AntdLink
//     const classNames = cn(
//       'text-main-blue hover:text-secondary-blue2 whitespace-nowrap text-sm',
//       {
//         'text-gray-300 pointer-events-none cursor-not-allowed': props.disabled,
//       },
//       className
//     )

//     if (!href)
//       return (
//         <a className={cn({ 'cursor-text': textLink }, classNames)} {...props}>
//           {props.children}
//         </a>
//       )

//     if (useNextLink) return <NextLink className={classNames} {...props} ref={ref} href={href} />

//     if (typeof href === 'string') return <Comp className={classNames} {...props} ref={ref} href={href} />
//   }
// )
// Link.displayName = 'Link'

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
// export { Link, Paragraph, Text, Title, Typography }
export { Paragraph, Text, Title, Typography }

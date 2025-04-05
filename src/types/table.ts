import { type ReactNode } from 'react'
export type ColFullType = {
  value?: ReactNode
  isDarkCell?: boolean
  isDarkRightBorder?: boolean
} & React.HTMLAttributes<any> &
  React.TdHTMLAttributes<any>

export type ColType = ColFullType | ReactNode

export type DataType = { [key: number]: ColType } & { key: string }

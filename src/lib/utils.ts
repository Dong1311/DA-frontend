import { type ClassValue, clsx } from 'clsx'
import Color from 'color'
import { twMerge } from 'tailwind-merge'

import { REM } from '@/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toRGBNoSpace = (color: string) => Color(color).array().join(',')

export const pxToRem = (px: number) => `${px / REM}rem`

export const isNil = (value: any) => value === undefined || value === null

export function padNumber(num: number | undefined, padNum: number) {
  if (!num) {
    return ''
  }

  const str = num.toString()
  return str.length > padNum ? `(${str})` : `(${str.padStart(padNum, '0')})`
}

'use client'

import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { formatNumberWithCommas } from '@/utils/formatNumberWithCommas'
type FormattedCurrencyInputProps = {
  name: string
  max?: number
  min?: number
  width?: number
}

export const FormattedCurrencyInput = ({ name, max = Infinity, min = 0, width = 100 }: FormattedCurrencyInputProps) => {
  const { watch, setValue } = useFormContext()
  const rawValue = watch(name) ?? 0
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(rawValue))
  }, [rawValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const numericVal = Number(val.replace(/,/g, ''))
    if (!isNaN(numericVal)) {
      const limitedVal = Math.min(Math.max(numericVal, min), max)
      setValue(name, limitedVal)
      setDisplayValue(formatNumberWithCommas(limitedVal))
    } else if (val === '') {
      setValue(name, 0)
      setDisplayValue('')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Input
        value={displayValue}
        onChange={handleChange}
        style={{
          border: 'none',
          borderBottom: '1px solid #d9d9d9',
          borderRadius: 0,
          outline: 'none',
          boxShadow: 'none',
          width,
          textAlign: 'right',
          paddingRight: 0,
        }}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <span style={{ fontSize: 14 }}>VND</span>
    </div>
  )
}

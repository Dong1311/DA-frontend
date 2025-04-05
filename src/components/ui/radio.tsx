'use client'

import { type CheckboxRef, Radio as AntdRadio, type RadioProps } from 'antd'
import { forwardRef } from 'react'

export const Radio = forwardRef<CheckboxRef, RadioProps>((props, ref) => {
  return <AntdRadio {...props} ref={ref} />
})

Radio.displayName = 'Radio'

const { Group: RadioGroup } = AntdRadio

export { RadioGroup }

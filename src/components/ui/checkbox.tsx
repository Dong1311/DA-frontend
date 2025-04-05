'use client'

import { Checkbox as AntdCheckbox, type CheckboxProps, type CheckboxRef } from 'antd'
import { forwardRef } from 'react'

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  return <AntdCheckbox {...props} ref={ref} checked={props.value} />
})

Checkbox.displayName = 'Checkbox'

const { Group: CheckboxGroup } = AntdCheckbox

export { CheckboxGroup }

'use client'

import { Form, InputNumber } from 'antd'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

interface ControlledNumberInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  errorMessage?: string
}

export const ControlledNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  errorMessage,
}: ControlledNumberInputProps<T>) => {
  return (
    <Form.Item label={label} validateStatus={errorMessage ? 'error' : ''} help={errorMessage}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <InputNumber {...field} style={{ width: '100%' }} />}
      />
    </Form.Item>
  )
}

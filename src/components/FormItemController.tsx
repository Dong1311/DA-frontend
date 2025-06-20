'use client'

import { Form } from 'antd'
import type { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

interface FormItemControllerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  label: string
  required?: boolean
  render: (field: ControllerRenderProps<TFieldValues, any>) => React.ReactNode
}

export function FormItemController<TFieldValues extends FieldValues>({
  name,
  label,
  render,
  required,
}: FormItemControllerProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>()

  const fieldError = errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={fieldError ? 'error' : ''}
          help={fieldError?.message as string}
        >
          {render(field)}
        </Form.Item>
      )}
    />
  )
}

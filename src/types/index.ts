import { type ModalProps } from 'antd'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

export * from './antd'
export * from './locale'
export * from './table'
export interface PageProps {
  children: React.ReactNode
  params: { locale: string }
}

export type ModalSearchProps<T> = ModalProps & {
  onChoose: (item: T) => void
  selectedItem?: T | undefined
}

export type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export enum Redirect {
  LIST = 'list',
  SLIP_CARD = 'SLIP_CARD',
}

export interface CommonFormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  setValueKey?: Path<T>
  autoComplete?: string
}
export interface FormInputProps<T extends FieldValues> extends CommonFormInputProps<T> {}

export type OrderType = '+' | '-' | undefined

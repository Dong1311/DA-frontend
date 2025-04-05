'use client'

import { Slot } from '@radix-ui/react-slot'
import {
  cloneElement,
  type ComponentPropsWithoutRef,
  createContext,
  type ElementRef,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type LabelHTMLAttributes,
  type ReactElement,
  useContext,
  useId,
} from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider as HookFormProvider,
  type FormProviderProps,
  useFormContext,
} from 'react-hook-form'

import { cn } from '@/lib'

import { Label } from './label'

type FormContext = {
  disableField?: boolean
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormContext = createContext<FormContext>({} as FormContext)

const Form = ({
  children,
  disableField,
  ...rest
}: FormProviderProps<any> & {
  children: React.ReactNode
} & FormContext) => {
  return (
    <HookFormProvider {...rest}>
      <FormContext.Provider value={{ disableField }}>{children}</FormContext.Provider>
    </HookFormProvider>
  )
}

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { flexRow?: boolean }>(
  ({ className, flexRow, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(
            'flex w-full flex-col gap-y-[0.1875rem]',
            { 'flex-row whitespace-nowrap no-wrap items-center gap-x-2 gap-y-0 w-auto': flexRow },
            className
          )}
          {...props}
        />
      </FormItemContext.Provider>
    )
  }
)
FormItem.displayName = 'FormItem'

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()

  return <Label ref={ref} className={cn(className)} htmlFor={formItemId} {...props} />
})
FormLabel.displayName = 'FormLabel'

const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
  ({ children, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    const { disableField } = useContext(FormContext)

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...(error ? { status: 'error' } : {})}
        {...props}
      >
        {isValidElement(children)
          ? cloneElement(children as ReactElement, { disabled: disableField || children.props.disabled })
          : children}
      </Slot>
    )
  }
)
FormControl.displayName = 'FormControl'

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('!mt-2 w-full text-sm text-error', className)} {...props}>
        {body}
      </p>
    )
  }
)
FormMessage.displayName = 'FormMessage'

const UncontrolledFormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> & {
    message?: string
  }
>(({ className, children, message, ...props }, ref) => {
  const { formMessageId } = useFormField()
  const body = message ? String(message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('mt-2  text-sm text-error', className)} {...props}>
      {body}
    </p>
  )
})
UncontrolledFormMessage.displayName = 'UncontrolledFormMessage'

export const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return <p ref={ref} id={formDescriptionId} className={cn('!mt-2 text-sm text-typo-medium', className)} {...props} />
  }
)
FormDescription.displayName = 'FormDescription'

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, UncontrolledFormMessage, useFormField }

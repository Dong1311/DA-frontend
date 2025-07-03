'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { type ProfileFormValues, profileSchema } from '@/constants/schema'
import { useFullProfile, useMyStore } from '@/hooks/user'

import { ProfileForm } from './ProfileForm'

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: ProfileFormValues) => void
  isPending: boolean
}

export const ProfileModal = ({ open, onClose, onSubmit, isPending }: Props) => {
  const { data: profile } = useFullProfile()
  const { data: store } = useMyStore()

  const initialValues: ProfileFormValues = {
    name: profile?.name ?? '',
    email: profile?.email ?? '',
    password: '',
    confirmPassword: '',
    storeName: store?.name ?? '',
    storeAddress: store?.address ?? '',
    storePhone: store?.phone ?? '',
    licenseNumber: store?.licenseNumber ?? '',
  }

  const methods = useForm<ProfileFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (open) {
      methods.reset(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, profile, store])

  const handleFinish = methods.handleSubmit(onSubmit)

  return (
    <Modal open={open} onCancel={onClose} title="Thông tin người dùng" footer={null}>
      <FormProvider {...methods}>
        <ProfileForm />
        <Button onClick={handleFinish} type="primary" block disabled={isPending}>
          Lưu thay đổi
        </Button>
      </FormProvider>
    </Modal>
  )
}

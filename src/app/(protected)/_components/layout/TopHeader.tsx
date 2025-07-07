'use client'

import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, message, Tooltip } from 'antd'
import { useState } from 'react'

import { Text } from '@/components'
import { type ProfileFormValues } from '@/constants/schema'
import { useLogout } from '@/hooks/auth'
import { useFullProfile, useMyStore, useUpdateProfile } from '@/hooks/user'

import { ProfileModal } from '../ProfileModal'

export const TopHeader = () => {
  const { logout } = useLogout()
  const { data: store } = useMyStore()
  const { data: profile, isLoading: isProfileLoading } = useFullProfile()
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()
  const [profileOpen, setProfileOpen] = useState(false)

  const handleUpdateProfile = async (data: ProfileFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = data
      await updateProfile(payload)
      message.success('Cập nhật hồ sơ thành công')
      setProfileOpen(false)
    } catch (err) {
      console.error(err)
      message.error('Cập nhật thất bại')
    }
  }

  return (
    <>
      <Flex align="center" justify="space-between" className="h-[60px] bg-white px-6 shadow-sm">
        <div className="ms-3 gap-2">
          {/* <img src="/images/kiotviet_logo.png" alt="logo" className="h-6" style={{ width: '40px', height: '40px' }} />
        <Text className="text-[20px] font-bold text-black">KiotViet</Text> */}
        </div>

        <Flex align="center" gap={24}>
          <Text className="font-semibold">{store?.phone ?? ''}</Text>

          <Flex align="center" gap={8}>
            <Avatar icon={<UserOutlined />} size="small" />
            <Text className="text-sm font-semibold">{isProfileLoading ? '...' : (profile?.name ?? 'Không rõ')}</Text>
          </Flex>

          <Tooltip title="Đăng xuất">
            <LogoutOutlined className="cursor-pointer text-xl text-red-500" onClick={logout} />
          </Tooltip>

          <Tooltip title="Chỉnh sửa thông tin">
            <SettingOutlined className="cursor-pointer text-xl" onClick={() => setProfileOpen(true)} />
          </Tooltip>
        </Flex>
      </Flex>

      <ProfileModal
        isPending={isPending}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSubmit={handleUpdateProfile}
      />
    </>
  )
}

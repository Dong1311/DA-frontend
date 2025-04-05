'use client'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, type MenuProps, Space, Tooltip } from 'antd'
import { type FC } from 'react'

import { DropdownItem } from '@/components'
import { Split } from '@/components'
import { Text } from '@/components'
import { ArrowDown, Logout, Notification, Package, QuestionMark, User } from '#/icons'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <DropdownItem icon={<User />} label="Tài khoản của bạn" href="/profile" />,
  },
  {
    key: '2',
    label: <DropdownItem icon={<Package />} label="Thông tin gói dịch vụ" href="/profile" />,
  },
  {
    key: '3',
    label: <DropdownItem icon={<Logout />} label="Đăng xuất" href="/profile" />,
  },
  {
    key: '4',
    label: <Split />,
  },
  {
    key: '5',
    label: <DropdownItem label="Điều khoản dịch vụ" href="/profile" />,
  },
  {
    key: '5',
    label: <DropdownItem label="Chính sách bảo mật" href="/profile" />,
  },
]

const HeaderMenu: FC = () => {
  return (
    <Flex className="me-3 justify-end">
      <Tooltip title="Notifications" className="me-4">
        <Button type="text" icon={<QuestionMark />} />
      </Tooltip>
      <Tooltip title="Settings" className="me-4">
        <Button type="text" icon={<Notification />} />
      </Tooltip>

      <Dropdown menu={{ items }} trigger={['click']} overlayStyle={{ marginTop: 25, width: 200 }}>
        <Space className="cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <Flex className="justify-center">
            <Text className="ms-3 hidden text-base font-medium sm:inline">Nguyễn Minh Hải</Text>
          </Flex>
          <ArrowDown />
        </Space>
      </Dropdown>
    </Flex>
  )
}

export default HeaderMenu

'use client'

import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Card, Flex, Modal } from 'antd'

import { UpdateStoreStatusDto } from '@/api-sdk'
import { Text } from '@/components'

interface StoreCardProps {
  store: any
  onSubmit: (storeId: string, status: UpdateStoreStatusDto.status) => void
  loading: boolean
}

export const StoreCard = ({ store, onSubmit, loading }: StoreCardProps) => {
  const showConfirm = (status: UpdateStoreStatusDto.status, actionText: string) => {
    Modal.confirm({
      title: `Xác nhận ${actionText.toLowerCase()} cửa hàng?`,
      icon: <ExclamationCircleFilled />,
      content: `Bạn có chắc chắn muốn ${actionText.toLowerCase()} cửa hàng này không?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk: () => onSubmit(store.id, status),
    })
  }

  return (
    <Card key={store.id} title={store.name} className="w-full max-w-2xl">
      <Flex vertical gap={12}>
        <Text>ID: {store.id}</Text>
        <Text>Địa chỉ: {store.address || 'Chưa có'}</Text>

        <Flex gap={4}>
          <Text strong>Chủ cửa hàng:</Text>
          {store.users?.length > 0 ? (
            store.users.map((user: any) => (
              <Text key={user.id}>
                {user.name} ({user.email})
              </Text>
            ))
          ) : (
            <Text italic>Không có người dùng</Text>
          )}
        </Flex>

        <Flex gap={8}>
          {store.status === 'PENDING' ? (
            <>
              <Button
                type="primary"
                onClick={() => showConfirm(UpdateStoreStatusDto.status.ACTIVE, 'Duyệt')}
                loading={loading}
              >
                Duyệt
              </Button>
              <Button
                danger
                onClick={() => showConfirm(UpdateStoreStatusDto.status.REJECTED, 'Từ chối')}
                loading={loading}
              >
                Từ chối
              </Button>
            </>
          ) : (
            <Text type="secondary">Trạng thái: {store.status}</Text>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

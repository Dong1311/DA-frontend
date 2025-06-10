'use client'

import { Flex, Spin } from 'antd'

import { Text } from '@/components'
import { usePendingStores } from '@/hooks/admin'
import { useUpdateStoreStatus } from '@/hooks/admin'

import { SuperAdminHeader } from './Header'
import { StoreCard } from './StoreCard'

export const StoreApprovalLayout = () => {
  const { data, isLoading, refetch } = usePendingStores()
  const mutation = useUpdateStoreStatus(refetch)

  if (isLoading) return <Spin />

  return (
    <Flex vertical gap={16} className="w-full p-4">
      <SuperAdminHeader />
      <Text>Duyệt cửa hàng đang chờ</Text>

      {data?.map((store: any) => (
        <StoreCard
          key={store.id}
          store={store}
          onSubmit={(storeId, status) => mutation.mutate({ storeId, status })}
          loading={mutation.isPending && mutation.variables?.storeId === store.id}
        />
      ))}
    </Flex>
  )
}

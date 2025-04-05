'use client'

import { ConfigProvider, Spin } from 'antd'
import { type ReactNode, useEffect, useState } from 'react'

export const Loading = ({ children, spinning }: { children?: ReactNode; spinning?: boolean }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <>
      {isHydrated ? (
        <ConfigProvider
          theme={{
            components: {
              Spin: {
                colorBgContainer: 'transparent',
              },
            },
          }}
        >
          <Spin spinning={!!spinning}>{children ?? null}</Spin>
        </ConfigProvider>
      ) : null}
    </>
  )
}

'use client'

import 'nprogress/nprogress.css'

import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect, useTransition } from 'react'

export const useNProgress = () => {
  const pathname = usePathname()
  const [isPending] = useTransition()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    if (isPending) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [pathname, isPending])
}

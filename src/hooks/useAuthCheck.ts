import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthService } from '@/api-sdk'
import { useAuthStore } from '@/stores/authStore'

export const useAuthCheck = () => {
  const { user, setUser } = useAuthStore()
  const [isChecking, setIsChecking] = useState(!user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      AuthService.authControllerGetProfile()
        .then(setUser)
        .catch(() => router.replace('/login'))
        .finally(() => setIsChecking(false))
    } else {
      setIsChecking(false)
    }
  }, [user, setUser, router])

  return { isChecking, user }
}

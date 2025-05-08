import { Suspense } from 'react'

import { LoginClientHandler } from './_component/LoginClientHandler'
import LoginForm from './_component/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <LoginClientHandler />
      </Suspense>
      <LoginForm />
    </>
  )
}

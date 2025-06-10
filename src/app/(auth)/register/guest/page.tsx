import { RegisterDto } from '@/api-sdk'

import RegisterForm from '../_components/RegisterForm'
export default function RegisterGuestPage() {
  return <RegisterForm role={RegisterDto.role.GUEST} />
}

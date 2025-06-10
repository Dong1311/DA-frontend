import { RegisterDto } from '@/api-sdk'

import RegisterForm from '../_components/RegisterForm'

export default function RegisterAdminPage() {
  return <RegisterForm role={RegisterDto.role.ADMIN} />
}

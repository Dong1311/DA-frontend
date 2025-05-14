import { z } from 'zod'

export const genderEnum = z.enum(['MALE', 'FEMALE'])
export const typeEnum = z.enum(['INDIVIDUAL', 'COMPANY'])

export const customerSchema = z.object({
  name: z.string().min(1, 'Tên khách hàng là bắt buộc'),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: genderEnum.optional(),
  address: z.string().optional(),
  type: typeEnum.optional(),
  totalPurchase: z.coerce.number().optional(),
  netPurchase: z.coerce.number().optional(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>

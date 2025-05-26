import { z } from 'zod'

export const supplierTypeEnum = z.enum(['INDIVIDUAL', 'COMPANY'])

export const supplierSchema = z.object({
  name: z.string().min(1, 'Tên nhà cung cấp là bắt buộc'),
  phone: z.string().optional(),
  address: z.string().optional(),
  taxCode: z.string().optional(),
  group: z.string().optional(),
})

export type SupplierFormValues = z.infer<typeof supplierSchema>

export const productSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm là bắt buộc'),
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  shortName: z.string().optional(),
  salePrice: z.coerce.number().min(0),
  costPrice: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  images: z.array(z.string()).optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

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

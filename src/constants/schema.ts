import { z } from 'zod'

import { RegisterDto } from '@/api-sdk'


export const supplierTypeEnum = z.enum(['INDIVIDUAL', 'COMPANY'])

export const supplierSchema = z.object({
  name: z.string().min(1, 'Tên nhà cung cấp là bắt buộc'),
  phone: z.string().optional(),
  address: z.string().optional(),
  taxCode: z.string().optional(),
  group: z.string().optional(),
})

export type SupplierFormValues = z.infer<typeof supplierSchema>

const productUnitSchema = z.object({
  unitName: z.string().min(1, 'Tên đơn vị là bắt buộc'),
  conversionFactor: z.number().min(0.0001, 'Tỉ lệ quy đổi phải lớn hơn 0'),
  isBaseUnit: z.boolean().optional(),
})

export const productSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm là bắt buộc'),
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  shortName: z.string().optional(),
  salePrice: z.coerce.number().min(0, 'Giá bán phải lớn hơn hoặc bằng 0'),
  costPrice: z.coerce.number().min(0, 'Giá nhập phải lớn hơn hoặc bằng 0'),
  stock: z.coerce.number().min(0, 'Tồn kho phải lớn hơn hoặc bằng 0'),
  images: z.array(z.string().url()).optional(),
  productUnits: z
    .array(productUnitSchema)
    .min(1, 'Phải có ít nhất 1 đơn vị sản phẩm')
    .refine(
      (productUnits) => productUnits.filter((u) => u.isBaseUnit === true).length === 1,
      'Phải có đúng 1 đơn vị cơ bản'
    )
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

export const importReceiptItemSchema = z
  .object({
    productId: z.string().uuid('productId phải là UUID'),
    quantity: z.coerce.number().int().min(1, 'Số lượng phải lớn hơn 0'),
    unitPrice: z.coerce.number().min(0, 'Đơn giá phải lớn hơn hoặc bằng 0'),
    unitId: z.string().min(1, 'Vui lòng chọn đơn vị'), 
  })
  .strict()

export const createImportReceiptSchema = z.object({
  supplierId: z.string().uuid('supplierId phải là UUID'),
  code: z.string().optional(),
  name: z.string().min(1, 'Tên đơn nhập là bắt buộc'),
  items: z.array(importReceiptItemSchema).min(1, 'Phải có ít nhất một sản phẩm nhập'),
}).strict()

export const stockCheckItemSchema = z.object({
  productId: z.string().uuid('Vui lòng chọn sản phẩm'),
  unitId: z.string().uuid('Vui lòng chọn đơn vị'),
  quantityInStock: z.coerce.number().min(0, 'Tồn kho phải >= 0'),
  quantityActual: z.coerce.number().min(0, 'Thực tế phải >= 0'),
})

export const stockCheckSchema = z.object({
  balancedAt: z.string().optional(), 
  details: z.array(stockCheckItemSchema).min(1, 'Phải có ít nhất 1 sản phẩm kiểm'),
})

export type StockCheckFormValues = z.infer<typeof stockCheckSchema>

export const disposalReceiptItemSchema = z.object({
  productId: z.string().uuid('Vui lòng chọn sản phẩm'),
  unitId: z.string().uuid('Vui lòng chọn đơn vị'),
  quantity: z.coerce.number().int().min(1, 'Số lượng phải lớn hơn 0'),
  unitPrice: z.coerce.number().min(0, 'Đơn giá phải >= 0'),
})

export const disposalReceiptSchema = z.object({
  note: z.string().min(1, 'Vui lòng nhập ghi chú'),
  items: z.array(disposalReceiptItemSchema).min(1, 'Phải có ít nhất 1 sản phẩm'),
})

export type DisposalReceiptFormValues = z.infer<typeof disposalReceiptSchema>

export const RegisterFormSchema = z
  .object({
    name: z.string().nonempty('Vui lòng nhập tên'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().nonempty('Vui lòng nhập mật khẩu'),
    confirmPassword: z.string().nonempty('Vui lòng xác nhận mật khẩu'),
    role: z.nativeEnum(RegisterDto.role),
    storeName: z.string().optional(),
    storeAddress: z.string().optional(),
    storePhone: z.string().optional(),
    licenseNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu không khớp',
  })
  .superRefine((data, ctx) => {
    if (data.role === RegisterDto.role.ADMIN) {
      if (!data.storeName?.trim()) {
        ctx.addIssue({
          path: ['storeName'],
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập tên cửa hàng',
        })
      }

      if (!data.storeAddress?.trim()) {
        ctx.addIssue({
          path: ['storeAddress'],
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập địa chỉ cửa hàng',
        })
      }

      if (!data.storePhone?.trim()) {
        ctx.addIssue({
          path: ['storePhone'],
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập số điện thoại',
        })
      }

      if (!data.licenseNumber?.trim()) {
        ctx.addIssue({
          path: ['licenseNumber'],
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập mã số giấy phép',
        })
      }
    }
  })


export type RegisterFormValues = z.infer<typeof RegisterFormSchema>

export const profileSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ'),
  password: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || val.length >= 6, {
      message: 'Mật khẩu phải ít nhất 6 ký tự',
    })
    .optional(),

  confirmPassword: z.string().optional(),

  storeName: z.string().optional(),
  storeAddress: z.string().optional(),
  storePhone: z.string().optional(),
  licenseNumber: z.string().optional(),
})
 .refine((data) => !data.password || data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  })
export type ProfileFormValues = z.infer<typeof profileSchema>

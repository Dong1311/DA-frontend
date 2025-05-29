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

const newProductSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm là bắt buộc'),
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  shortName: z.string().optional(),
  salePrice: z.coerce.number().min(0),
  costPrice: z.coerce.number().min(0),
})

export const importReceiptItemSchema = z
  .object({
    productId: z.string().uuid('productId phải là UUID').optional(),
    newProduct: newProductSchema.optional(),
    quantity: z.coerce.number().int().min(1, 'Số lượng phải lớn hơn 0'),
    unitPrice: z.coerce.number().min(0, 'Đơn giá phải lớn hơn hoặc bằng 0'),
  })
  .strict()

export type CreateImportReceiptItemDto = z.infer<typeof importReceiptItemSchema>

export const createImportReceiptSchema = z.object({
  supplierId: z.string().uuid('supplierId phải là UUID'),
  code: z.string().optional(),
  name: z.string().min(1, 'Tên đơn nhập là bắt buộc'),
  items: z.array(importReceiptItemSchema).min(1, 'Phải có ít nhất một sản phẩm nhập'),
}).strict()

export type CreateImportReceiptDto = z.infer<typeof createImportReceiptSchema>

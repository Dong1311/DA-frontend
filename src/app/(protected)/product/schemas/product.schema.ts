import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  shortName: z.string().optional(),
  salePrice: z.coerce.number().min(0),
  costPrice: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  reserved: z.coerce.number().min(0),
  images: z.array(z.string()).optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

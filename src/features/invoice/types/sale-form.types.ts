import { type CreateInvoiceDto, type ProductSaleDto, type ProductUnitDto } from '@/api-sdk'

export type CreateInvoiceRequestDto = CreateInvoiceDto & {
  conversationId?: string
}

export type SaleProductFormItem = ProductSaleDto & {
  name: string
  stock: number
  productUnits: ProductUnitDto[]
  images: { url: string }[]
}

export interface SaleFormValues {
  customerId?: string
  paymentMethod?: CreateInvoiceDto.paymentMethod
  products: SaleProductFormItem[]
  totalAmount: number
  discount: number
  amountPaid: number
}

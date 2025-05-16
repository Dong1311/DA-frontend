/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductSaleDto } from './ProductSaleDto';
export type CreateInvoiceDto = {
  customerId?: string;
  storeId: string;
  products: ProductSaleDto;
  totalAmount: number;
  discount: number;
  amountPaid: number;
};


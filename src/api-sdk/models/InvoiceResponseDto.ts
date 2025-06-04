/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from './CustomerDto';
import type { InvoiceItemDto } from './InvoiceItemDto';
import type { ProductUnitDto } from './ProductUnitDto';
export type InvoiceResponseDto = {
  id: string;
  returnId: string | null;
  customerId: string | null;
  paymentId: string;
  customer: CustomerDto | null;
  storeId: string;
  paymentUrl: string;
  paymentStatus: string;
  totalAmount: number;
  discount: number;
  amountPaid: number;
  createdAt: string;
  paymentMethod: string;
  invoiceItems: Array<InvoiceItemDto>;
  unit: ProductUnitDto;
};


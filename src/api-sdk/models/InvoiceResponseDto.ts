/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceItemDto } from './InvoiceItemDto';
export type InvoiceResponseDto = {
  id: string;
  returnId: string | null;
  customerId: string | null;
  paymentId: string;
  storeId: string;
  paymentUrl: string;
  paymentStatus: string;
  totalAmount: number;
  discount: number;
  amountPaid: number;
  createdAt: string;
  paymentMethod: string;
  invoiceItems: Array<InvoiceItemDto>;
};


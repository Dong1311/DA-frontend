/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from './CustomerDto';
import type { InvoiceResponseDto } from './InvoiceResponseDto';
export type InvoiceDto = {
  id: string;
  createdAt: string;
  returnId: string | null;
  customerId: string | null;
  totalAmount: number;
  discount: number;
  amountPaid: number;
  storeId: string;
  paymentMethod: InvoiceDto.paymentMethod;
  paymentId: string | null;
  paymentStatus: InvoiceDto.paymentStatus;
  invoiceItems: Array<InvoiceResponseDto>;
  customer: CustomerDto | null;
};
export namespace InvoiceDto {
  export enum paymentMethod {
    CASH = 'CASH',
    BANKTRANSFER = 'BANKTRANSFER',
  }
  export enum paymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
  }
}


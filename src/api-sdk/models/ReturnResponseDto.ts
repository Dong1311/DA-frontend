/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerDto } from './CustomerDto';
import type { InvoiceDto } from './InvoiceDto';
import type { ReturnItemDto } from './ReturnItemDto';
export type ReturnResponseDto = {
  id: string;
  employeeId: string | null;
  customerId: string;
  refundAmount: number;
  status: string;
  storeId: string;
  invoiceId: string;
  returnItems: Array<ReturnItemDto>;
  invoice: InvoiceDto;
  customer: CustomerDto;
  createdAt: string;
};


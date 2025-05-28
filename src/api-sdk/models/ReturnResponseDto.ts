/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
  createdAt: string;
};


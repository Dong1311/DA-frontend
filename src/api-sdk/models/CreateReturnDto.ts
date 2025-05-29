/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReturnProductDto } from './ReturnProductDto';
export type CreateReturnDto = {
  invoiceId: string;
  employeeId?: string;
  customerId: string;
  refundAmount: number;
  status?: string;
  storeId: string;
  products: Array<ReturnProductDto>;
};


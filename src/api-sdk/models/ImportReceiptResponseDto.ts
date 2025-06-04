/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImportReceiptItemResponseDto } from './ImportReceiptItemResponseDto';
export type ImportReceiptResponseDto = {
  id: string;
  code: string;
  createdAt: string;
  name: string;
  supplierId: string;
  amountDue: number;
  status: string;
  importReceiptItems: Array<ImportReceiptItemResponseDto>;
};


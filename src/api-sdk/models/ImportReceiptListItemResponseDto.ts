/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImportReceiptItemResponseDto } from './ImportReceiptItemResponseDto';
import type { ImportReceiptSupplierSummaryDto } from './ImportReceiptSupplierSummaryDto';
export type ImportReceiptListItemResponseDto = {
  id: string;
  code: string;
  createdAt: string;
  name: string;
  supplierId: string;
  amountDue: number;
  status: ImportReceiptListItemResponseDto.status;
  importReceiptItems: Array<ImportReceiptItemResponseDto>;
  supplier?: ImportReceiptSupplierSummaryDto | null;
};
export namespace ImportReceiptListItemResponseDto {
  export enum status {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
}


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DisposalReceiptItemResponseDto } from './DisposalReceiptItemResponseDto';
export type DisposalReceiptResponseDto = {
  id: string;
  note: string;
  totalAmount: number;
  createdAt: string;
  storeId: string;
  disposalReceiptItems: Array<DisposalReceiptItemResponseDto>;
};


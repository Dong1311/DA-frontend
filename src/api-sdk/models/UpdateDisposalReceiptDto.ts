/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDisposalReceiptItemDto } from './CreateDisposalReceiptItemDto';
export type UpdateDisposalReceiptDto = {
  /**
   * Ghi chú
   */
  note?: string;
  /**
   * Danh sách sản phẩm trong phiếu hủy
   */
  items?: Array<CreateDisposalReceiptItemDto>;
  status?: UpdateDisposalReceiptDto.status;
};
export namespace UpdateDisposalReceiptDto {
  export enum status {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
}


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDisposalReceiptItemDto } from './CreateDisposalReceiptItemDto';
export type CreateDisposalReceiptDto = {
  /**
   * Ghi chú
   */
  note: string;
  /**
   * Danh sách sản phẩm trong phiếu hủy
   */
  items: Array<CreateDisposalReceiptItemDto>;
  status?: CreateDisposalReceiptDto.status;
};
export namespace CreateDisposalReceiptDto {
  export enum status {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
}


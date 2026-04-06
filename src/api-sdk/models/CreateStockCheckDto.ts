/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStockCheckDetailDto } from './CreateStockCheckDetailDto';
export type CreateStockCheckDto = {
  /**
   * Chi tiết kiểm kho (danh sách sản phẩm kiểm)
   */
  details: Array<CreateStockCheckDetailDto>;
  /**
   * Thời điểm cân bằng (nếu có)
   */
  balancedAt?: string;
  status?: CreateStockCheckDto.status;
};
export namespace CreateStockCheckDto {
  export enum status {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
}


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateImportReceiptItemDto } from './CreateImportReceiptItemDto';
export type CreateImportReceiptDto = {
  /**
   * ID nhà cung cấp
   */
  supplierId: string;
  /**
   * Tổng tiền đơn nhập
   */
  amountDue: number;
  /**
   * Trạng thái đơn nhập
   */
  status: string;
  /**
   * Danh sách các sản phẩm trong đơn nhập
   */
  items: Array<CreateImportReceiptItemDto>;
};


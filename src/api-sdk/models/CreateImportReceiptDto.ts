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
   * Tên đơn nhập
   */
  name: string;
  /**
   * Danh sách các sản phẩm trong đơn nhập
   */
  items: Array<CreateImportReceiptItemDto>;
};


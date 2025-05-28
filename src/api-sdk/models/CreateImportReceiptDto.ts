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
   * Mã đơn nhập
   */
  code?: string;
  /**
   * Tên đơn nhập
   */
  name: string;
  /**
   * Danh sách các sản phẩm trong đơn nhập
   */
  items: Array<CreateImportReceiptItemDto>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewProductDto } from './CreateNewProductDto';
export type CreateImportReceiptItemDto = {
  /**
   * ID sản phẩm đã có (không cần nếu tạo sản phẩm mới)
   */
  productId?: string;
  /**
   * Thông tin sản phẩm mới nếu tạo mới
   */
  newProduct?: CreateNewProductDto;
  /**
   * Số lượng nhập
   */
  quantity: number;
  /**
   * Đơn giá nhập
   */
  unitPrice: number;
};


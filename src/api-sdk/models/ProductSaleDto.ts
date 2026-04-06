/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductSaleDto = {
  /**
   * ID của sản phẩm
   */
  id: string;
  /**
   * Mã sản phẩm
   */
  code: string;
  /**
   * Số lượng mua
   */
  quantity: number;
  /**
   * Đơn giá (theo đơn vị đã chọn)
   */
  unitPrice: number;
  /**
   * Tổng tiền = quantity * unitPrice
   */
  totalPrice: number;
  /**
   * ID của đơn vị được chọn để bán (ProductUnit.id)
   */
  unitId: string;
};


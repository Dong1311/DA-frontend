/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductSaleDto } from './ProductSaleDto';
export type CreateInvoiceDto = {
  /**
   * ID khách hàng (nếu có)
   */
  customerId?: string;
  /**
   * Phương thức thanh toán
   */
  paymentMethod?: CreateInvoiceDto.paymentMethod;
  /**
   * Danh sách sản phẩm bán kèm theo đơn vị, số lượng, giá,...
   */
  products: Array<ProductSaleDto>;
  /**
   * Tổng tiền hóa đơn sau chiết khấu
   */
  totalAmount: number;
  /**
   * Chiết khấu tổng cộng
   */
  discount: number;
  /**
   * Số tiền khách đã trả (có thể < tổng)
   */
  amountPaid: number;
};
export namespace CreateInvoiceDto {
  /**
   * Phương thức thanh toán
   */
  export enum paymentMethod {
    CASH = 'CASH',
    BANKTRANSFER = 'BANKTRANSFER',
  }
}


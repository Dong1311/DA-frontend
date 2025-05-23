/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductSaleDto } from './ProductSaleDto';
export type CreateInvoiceDto = {
  customerId?: string;
  paymentMethod?: CreateInvoiceDto.paymentMethod;
  products: Array<ProductSaleDto>;
  totalAmount: number;
  discount: number;
  amountPaid: number;
};
export namespace CreateInvoiceDto {
  export enum paymentMethod {
    CASH = 'CASH',
    BANKTRANSFER = 'BANKTRANSFER',
  }
}


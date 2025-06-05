/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDto } from './ProductDto';
import type { ProductUnitDto } from './ProductUnitDto';
export type DisposalReceiptItemResponseDto = {
  id: string;
  productId: string;
  unitId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: ProductDto;
  unit: ProductUnitDto;
};


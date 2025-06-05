/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDto } from './ProductDto';
import type { ProductUnitDto } from './ProductUnitDto';
export type StockCheckDetailResponseDto = {
  id: string;
  productId: string;
  unitId: string;
  quantityInStock: number;
  quantityActual: number;
  quantityDiff: number;
  valueDiff: number;
  product: ProductDto;
  unit: ProductUnitDto;
};


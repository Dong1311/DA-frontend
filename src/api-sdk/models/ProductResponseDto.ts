/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductImageDto } from './ProductImageDto';
import type { ProductUnitDto } from './ProductUnitDto';
export type ProductResponseDto = {
  id: string;
  name: string;
  code: string;
  shortName?: string;
  salePrice: number;
  costPrice: number;
  stock: number;
  reserved: number;
  createdAt: string;
  storeId: string;
  images: Array<ProductImageDto>;
  productUnits: Array<ProductUnitDto>;
};


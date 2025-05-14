/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductImageDto } from './ProductImageDto';
export type ProductResponseDto = {
  id: string;
  name: string;
  shortName?: string;
  salePrice: number;
  costPrice: number;
  stock: number;
  reserved: number;
  createdAt: string;
  storeId: string;
  images: Array<ProductImageDto>;
};


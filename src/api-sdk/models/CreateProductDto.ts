/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductUnitDto } from './ProductUnitDto';
export type CreateProductDto = {
  code: string;
  name: string;
  shortName?: string;
  salePrice: number;
  costPrice: number;
  stock: number;
  unitId?: string;
  reserved?: number;
  images?: Array<string>;
  productUnits?: Array<ProductUnitDto>;
};


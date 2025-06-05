/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StockCheckDetailResponseDto } from './StockCheckDetailResponseDto';
export type StockCheckResponseDto = {
  id: string;
  status: StockCheckResponseDto.status;
  createdAt: string;
  balancedAt: string | null;
  actualQuantity: number;
  totalActual: number;
  totalDifference: number;
  incDifference: number;
  decDifference: number;
  details: Array<StockCheckDetailResponseDto>;
};
export namespace StockCheckResponseDto {
  export enum status {
    DRAFT = 'DRAFT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
}


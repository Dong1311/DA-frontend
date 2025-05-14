/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerResponseDto = {
  id: string;
  name: string;
  phone?: string;
  dob?: string;
  gender?: CustomerResponseDto.gender;
  address?: string;
  type?: CustomerResponseDto.type;
  totalPurchase?: number;
  netPurchase?: number;
  storeId: string;
};
export namespace CustomerResponseDto {
  export enum gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }
  export enum type {
    INDIVIDUAL = 'INDIVIDUAL',
    COMPANY = 'COMPANY',
  }
}


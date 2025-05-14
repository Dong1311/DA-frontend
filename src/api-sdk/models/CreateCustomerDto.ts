/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCustomerDto = {
  name: string;
  phone?: string;
  dob?: string;
  gender?: CreateCustomerDto.gender;
  address?: string;
  type?: CreateCustomerDto.type;
  totalPurchase?: number;
  netPurchase?: number;
};
export namespace CreateCustomerDto {
  export enum gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }
  export enum type {
    INDIVIDUAL = 'INDIVIDUAL',
    COMPANY = 'COMPANY',
  }
}


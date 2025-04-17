/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateProductDto = {
  properties: {
    name: {
      type: 'string',
      isRequired: true,
    },
    shortName: {
      type: 'string',
    },
    salePrice: {
      type: 'number',
      isRequired: true,
    },
    costPrice: {
      type: 'number',
      isRequired: true,
    },
    stock: {
      type: 'number',
      isRequired: true,
    },
    reserved: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

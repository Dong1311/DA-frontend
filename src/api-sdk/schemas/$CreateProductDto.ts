/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateProductDto = {
  properties: {
    code: {
      type: 'string',
      isRequired: true,
    },
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
    unitId: {
      type: 'string',
    },
    reserved: {
      type: 'number',
    },
    images: {
      type: 'array',
      contains: {
        type: 'string',
      },
    },
  },
} as const;

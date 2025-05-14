/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductResponseDto = {
  properties: {
    id: {
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
    reserved: {
      type: 'number',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    images: {
      type: 'array',
      contains: {
        type: 'ProductImageDto',
      },
      isRequired: true,
    },
  },
} as const;

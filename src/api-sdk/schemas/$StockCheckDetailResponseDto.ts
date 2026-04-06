/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StockCheckDetailResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    productId: {
      type: 'string',
      isRequired: true,
    },
    unitId: {
      type: 'string',
      isRequired: true,
    },
    quantityInStock: {
      type: 'number',
      isRequired: true,
    },
    quantityActual: {
      type: 'number',
      isRequired: true,
    },
    quantityDiff: {
      type: 'number',
      isRequired: true,
    },
    valueDiff: {
      type: 'number',
      isRequired: true,
    },
    product: {
      type: 'ProductDto',
      isRequired: true,
    },
    unit: {
      type: 'ProductUnitDto',
      isRequired: true,
    },
  },
} as const;

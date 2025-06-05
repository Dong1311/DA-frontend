/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StockCheckResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    status: {
      type: 'Enum',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
    },
    balancedAt: {
      type: 'string',
      isRequired: true,
      isNullable: true,
    },
    actualQuantity: {
      type: 'number',
      isRequired: true,
    },
    totalActual: {
      type: 'number',
      isRequired: true,
    },
    totalDifference: {
      type: 'number',
      isRequired: true,
    },
    incDifference: {
      type: 'number',
      isRequired: true,
    },
    decDifference: {
      type: 'number',
      isRequired: true,
    },
    details: {
      type: 'array',
      contains: {
        type: 'StockCheckDetailResponseDto',
      },
      isRequired: true,
    },
  },
} as const;

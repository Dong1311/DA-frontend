/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedStockCheckResponseDto = {
  properties: {
    items: {
      type: 'array',
      contains: {
        type: 'StockCheckResponseDto',
      },
      isRequired: true,
    },
    page: {
      type: 'number',
      isRequired: true,
    },
    limit: {
      type: 'number',
      isRequired: true,
    },
    total: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

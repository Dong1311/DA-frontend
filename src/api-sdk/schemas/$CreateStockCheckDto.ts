/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateStockCheckDto = {
  properties: {
    details: {
      type: 'array',
      contains: {
        type: 'CreateStockCheckDetailDto',
      },
      isRequired: true,
    },
    balancedAt: {
      type: 'string',
      description: `Thời điểm cân bằng (nếu có)`,
      format: 'date-time',
    },
    status: {
      type: 'Enum',
    },
  },
} as const;

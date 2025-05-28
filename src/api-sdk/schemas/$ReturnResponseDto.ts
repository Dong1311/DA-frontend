/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ReturnResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    employeeId: {
      type: 'string',
      isRequired: true,
      isNullable: true,
    },
    customerId: {
      type: 'string',
      isRequired: true,
    },
    refundAmount: {
      type: 'number',
      isRequired: true,
    },
    status: {
      type: 'string',
      isRequired: true,
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    invoiceId: {
      type: 'string',
      isRequired: true,
    },
    returnItems: {
      type: 'array',
      contains: {
        type: 'ReturnItemDto',
      },
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

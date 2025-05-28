/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateReturnDto = {
  properties: {
    invoiceId: {
      type: 'string',
      isRequired: true,
    },
    employeeId: {
      type: 'string',
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
    products: {
      type: 'array',
      contains: {
        type: 'ReturnProductDto',
      },
      isRequired: true,
    },
  },
} as const;

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InvoiceResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    customerId: {
      type: 'string',
      isRequired: true,
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    totalAmount: {
      type: 'number',
      isRequired: true,
    },
    discount: {
      type: 'number',
      isRequired: true,
    },
    amountPaid: {
      type: 'number',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

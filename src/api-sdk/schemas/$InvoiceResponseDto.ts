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
    returnId: {
      type: 'string',
      isRequired: true,
      isNullable: true,
    },
    customerId: {
      type: 'string',
      isRequired: true,
      isNullable: true,
    },
    paymentId: {
      type: 'string',
      isRequired: true,
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    paymentUrl: {
      type: 'string',
      isRequired: true,
    },
    paymentStatus: {
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
    paymentMethod: {
      type: 'string',
      isRequired: true,
    },
    invoiceItems: {
      type: 'array',
      contains: {
        type: 'InvoiceItemDto',
      },
      isRequired: true,
    },
  },
} as const;

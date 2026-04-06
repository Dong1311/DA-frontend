/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InvoiceDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    createdAt: {
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
    storeId: {
      type: 'string',
      isRequired: true,
    },
    paymentMethod: {
      type: 'Enum',
      isRequired: true,
    },
    paymentId: {
      type: 'string',
      isRequired: true,
      isNullable: true,
    },
    paymentStatus: {
      type: 'Enum',
      isRequired: true,
    },
    invoiceItems: {
      type: 'array',
      contains: {
        type: 'InvoiceResponseDto',
      },
      isRequired: true,
    },
    customer: {
      type: 'all-of',
      contains: [{
        type: 'CustomerDto',
      }],
      isRequired: true,
      isNullable: true,
    },
  },
} as const;

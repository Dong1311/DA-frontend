/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InvoiceItemDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    invoiceId: {
      type: 'string',
      isRequired: true,
    },
    productId: {
      type: 'string',
      isRequired: true,
    },
    quantity: {
      type: 'number',
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
      isRequired: true,
    },
    totalPrice: {
      type: 'number',
      isRequired: true,
    },
    product: {
      type: 'ProductDto',
      isRequired: true,
    },
  },
} as const;

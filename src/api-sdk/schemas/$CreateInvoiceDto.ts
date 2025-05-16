/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateInvoiceDto = {
  properties: {
    customerId: {
      type: 'string',
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    products: {
      type: 'ProductSaleDto',
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
  },
} as const;

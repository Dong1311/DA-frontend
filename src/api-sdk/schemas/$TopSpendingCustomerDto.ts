/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TopSpendingCustomerDto = {
  properties: {
    customerId: {
      type: 'string',
      isNullable: true,
    },
    customerName: {
      type: 'string',
      isRequired: true,
    },
    phone: {
      type: 'string',
      isRequired: true,
    },
    netSpending: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

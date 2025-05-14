/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CustomerResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    name: {
      type: 'string',
      isRequired: true,
    },
    phone: {
      type: 'string',
    },
    dob: {
      type: 'string',
    },
    gender: {
      type: 'Enum',
    },
    address: {
      type: 'string',
    },
    type: {
      type: 'Enum',
    },
    totalPurchase: {
      type: 'number',
    },
    netPurchase: {
      type: 'number',
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

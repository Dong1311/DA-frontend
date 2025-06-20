/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegisterDto = {
  properties: {
    name: {
      type: 'string',
      isRequired: true,
    },
    email: {
      type: 'string',
      isRequired: true,
    },
    password: {
      type: 'string',
      isRequired: true,
    },
    role: {
      type: 'Enum',
      isRequired: true,
    },
    storeName: {
      type: 'string',
    },
    storeAddress: {
      type: 'string',
    },
    storePhone: {
      type: 'string',
    },
    licenseNumber: {
      type: 'string',
    },
  },
} as const;

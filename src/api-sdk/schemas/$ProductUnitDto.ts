/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductUnitDto = {
  properties: {
    id: {
      type: 'string',
    },
    unitName: {
      type: 'string',
      isRequired: true,
    },
    conversionFactor: {
      type: 'number',
      isRequired: true,
    },
    isBaseUnit: {
      type: 'boolean',
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
    },
  },
} as const;

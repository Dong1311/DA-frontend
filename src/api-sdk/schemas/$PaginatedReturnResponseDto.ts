/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedReturnResponseDto = {
  properties: {
    items: {
      type: 'array',
      contains: {
        type: 'ReturnDto',
      },
      isRequired: true,
    },
    total: {
      type: 'number',
      isRequired: true,
    },
    page: {
      type: 'number',
      isRequired: true,
    },
    limit: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

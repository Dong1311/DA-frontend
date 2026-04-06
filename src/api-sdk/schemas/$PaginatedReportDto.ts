/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedReportDto = {
  properties: {
    items: {
      type: 'array',
      contains: {
        type: 'ReportItemDto',
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

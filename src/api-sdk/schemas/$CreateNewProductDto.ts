/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateNewProductDto = {
  properties: {
    code: {
      type: 'string',
      description: `Mã sản phẩm mới`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `Tên sản phẩm mới`,
      isRequired: true,
    },
    salePrice: {
      type: 'number',
      description: `Giá bán sản phẩm mới`,
      isRequired: true,
    },
    costPrice: {
      type: 'number',
      description: `Giá vốn sản phẩm mới`,
      isRequired: true,
    },
    shortName: {
      type: 'string',
      description: `Tên ngắn sản phẩm`,
    },
  },
} as const;

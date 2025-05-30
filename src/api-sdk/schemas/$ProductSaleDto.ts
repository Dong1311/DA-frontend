/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductSaleDto = {
  properties: {
    id: {
      type: 'string',
      description: `ID của sản phẩm`,
      isRequired: true,
    },
    code: {
      type: 'string',
      description: `Mã sản phẩm`,
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `Số lượng mua`,
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
      description: `Đơn giá (theo đơn vị đã chọn)`,
      isRequired: true,
    },
    totalPrice: {
      type: 'number',
      description: `Tổng tiền = quantity * unitPrice`,
      isRequired: true,
    },
    unitId: {
      type: 'string',
      description: `ID của đơn vị được chọn để bán (ProductUnit.id)`,
      isRequired: true,
    },
  },
} as const;

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateInvoiceDto = {
  properties: {
    customerId: {
      type: 'string',
      description: `ID khách hàng (nếu có)`,
    },
    paymentMethod: {
      type: 'Enum',
    },
    products: {
      type: 'array',
      contains: {
        type: 'ProductSaleDto',
      },
      isRequired: true,
    },
    totalAmount: {
      type: 'number',
      description: `Tổng tiền hóa đơn sau chiết khấu`,
      isRequired: true,
    },
    discount: {
      type: 'number',
      description: `Chiết khấu tổng cộng`,
      isRequired: true,
    },
    amountPaid: {
      type: 'number',
      description: `Số tiền khách đã trả (có thể < tổng)`,
      isRequired: true,
    },
  },
} as const;

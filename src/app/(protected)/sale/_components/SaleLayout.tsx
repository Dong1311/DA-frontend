'use client'

import { Col, Layout, Row } from 'antd'

import { CustomerInfo } from './CustomerInfo'
import { OrderSummary } from './OrderSummary'
import { PaymentMethods } from './PaymentMethods'
import { ProductList } from './ProductList'
import { SearchProduct } from './SearchProduct'
const { Content } = Layout

export const SaleLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0 20px' }}>
        <Content>
          <Row>
            <SearchProduct />
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <ProductList />
            </Col>
            <Col span={8}>
              <CustomerInfo />
              <OrderSummary />
              <PaymentMethods />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

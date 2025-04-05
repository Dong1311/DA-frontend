'use client'

import { Flex } from 'antd'
import { Col, Row } from 'antd'

import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
const Header = () => {
  return (
    <Flex className=" w-full items-center justify-between border-b bg-white px-4 py-2 shadow-sm">
      <Row className=" w-full">
        <Col span={12}>
          <SearchBar />
        </Col>

        <Col span={12}>
          <HeaderMenu />
        </Col>
      </Row>
    </Flex>
  )
}

export default Header

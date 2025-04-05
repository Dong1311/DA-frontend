'use client'

import { Flex, Input } from 'antd'
import { type FC } from 'react'

import { SearchIcon } from '#/icons'

const SearchBar: FC = () => {
  return (
    <Flex
      className="relative ms-8 flex h-9 w-full cursor-pointer items-center
                 rounded-md text-gray-500 transition-colors hover:bg-gray-100"
    >
      <Flex className="absolute left-2 text-lg text-gray-400">
        <SearchIcon />
      </Flex>

      <Input
        placeholder="Tìm kiếm"
        variant="borderless"
        className="w-full cursor-pointer bg-transparent py-1 pl-8 pr-4 text-sm text-gray-700
                   placeholder:text-gray-400 focus:bg-transparent focus:shadow-none focus:outline-none"
      />
    </Flex>
  )
}

export default SearchBar

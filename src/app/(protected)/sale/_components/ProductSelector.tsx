'use client'

import { AutoComplete } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { type ProductResponseDto, ProductsService } from '@/api-sdk'

export const ProductSelector = () => {
  const [searchResults, setSearchResults] = useState<ProductResponseDto[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const { getValues, setValue } = useFormContext()

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value) return setSearchResults([])
        try {
          const result = await ProductsService.productControllerSearch({ keyword: value })
          setSearchResults(result)
        } catch (error) {
          console.error(error)
        }
      }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSearch = (value: string) => {
    debouncedSearch(value)
  }

  const handleSelect = (productId: string) => {
    const product = searchResults.find((p) => p.id === productId)
    if (!product) return

    const current = getValues('products') as ProductResponseDto[]
    const exists = current.find((p) => p.id === product.id)
    if (!exists) {
      setValue('products', [
        ...current,
        {
          id: product.id,
          code: product.code,
          quantity: 1,
          unitPrice: product.salePrice,
          totalPrice: product.salePrice,
        },
      ])
    }

    setSearchValue('')
    setSearchResults([])
  }

  return (
    <AutoComplete
      style={{ width: '100%' }}
      value={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      onSelect={handleSelect}
    >
      {searchResults.map((product) => (
        <AutoComplete.Option key={product.id} value={product.id}>
          {product.name} - {product.code}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  )
}

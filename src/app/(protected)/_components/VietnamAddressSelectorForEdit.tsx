'use client'

import { Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface Province {
  code: string
  name: string
}
interface District {
  code: string
  name: string
}
interface Ward {
  code: string
  name: string
}

interface Props {
  initialAddress?: string
}

const normalize = (str?: string) =>
  str
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') ?? ''

export const VietnamAddressSelectorForEdit = ({ initialAddress }: Props) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])

  const [selectedProvince, setSelectedProvince] = useState<string>()
  const [selectedDistrict, setSelectedDistrict] = useState<string>()
  const [selectedWard, setSelectedWard] = useState<string>()
  const [streetAddress, setStreetAddress] = useState<string>('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (!initialAddress) return

      const parts = initialAddress.split(',').map((s) => s.trim())

      // Giải nén từ cuối mảng về đầu để tăng độ bền
      const provinceName = parts.at(-1) // phần cuối
      const districtName = parts.length > 2 ? parts.at(-2) : undefined
      const wardName = parts.length > 3 ? parts.at(-3) : undefined
      const street = parts.length > 1 ? parts.slice(0, parts.length - 3).join(', ') : (parts[0] ?? '')

      setStreetAddress(street)

      // Load provinces
      const provinceRes = await fetch('https://provinces.open-api.vn/api/?depth=1')
      const provinces: Province[] = await provinceRes.json()
      setProvinces(provinces)

      const province = provinces.find((p) => normalize(p.name) === normalize(provinceName))
      if (!province) return
      setSelectedProvince(province.code)

      // Load districts
      const districtRes = await fetch(`https://provinces.open-api.vn/api/p/${province.code}?depth=2`)
      const districtData = await districtRes.json()
      setDistricts(districtData.districts)

      const district = districtName
        ? districtData.districts.find((d: District) => normalize(d.name) === normalize(districtName))
        : undefined

      if (!district) return
      setSelectedDistrict(district.code)

      // Load wards nếu có
      const wardRes = await fetch(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`)
      const wardData = await wardRes.json()
      setWards(wardData.wards)

      const ward = wardName ? wardData.wards.find((w: Ward) => normalize(w.name) === normalize(wardName)) : undefined

      if (ward) setSelectedWard(ward.code)
    }

    init()
  }, [initialAddress])

  useEffect(() => {
    const provinceName = provinces.find((p) => p.code === selectedProvince)?.name
    const districtName = districts.find((d) => d.code === selectedDistrict)?.name
    const wardName = wards.find((w) => w.code === selectedWard)?.name
    const fullAddress = [streetAddress, wardName, districtName, provinceName].filter(Boolean).join(', ')
    setValue('storeAddress', fullAddress)
  }, [selectedProvince, selectedDistrict, selectedWard, streetAddress, provinces, districts, wards, setValue])

  return (
    <>
      <Form.Item label="Tỉnh/Thành phố" required>
        <Select
          showSearch
          placeholder="Chọn tỉnh/thành"
          options={provinces.map((p) => ({ value: p.code, label: p.name }))}
          value={selectedProvince}
          onChange={async (code) => {
            setSelectedProvince(code)
            setLoading(true)
            const res = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
            const data = await res.json()
            setDistricts(data.districts)
            setWards([])
            setSelectedDistrict(undefined)
            setSelectedWard(undefined)
            setLoading(false)
          }}
          loading={loading}
        />
      </Form.Item>

      <Form.Item label="Quận/Huyện" required>
        <Select
          showSearch
          placeholder="Chọn quận/huyện"
          options={districts.map((d) => ({ value: d.code, label: d.name }))}
          value={selectedDistrict}
          onChange={async (code) => {
            setSelectedDistrict(code)
            setLoading(true)
            const res = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
            const data = await res.json()
            setWards(data.wards)
            setSelectedWard(undefined)
            setLoading(false)
          }}
          disabled={!selectedProvince}
          loading={loading}
        />
      </Form.Item>

      <Form.Item label="Phường/Xã" required>
        <Select
          showSearch
          placeholder="Chọn phường/xã"
          options={wards.map((w) => ({ value: w.code, label: w.name }))}
          value={selectedWard}
          onChange={setSelectedWard}
          disabled={!selectedDistrict}
          loading={loading}
        />
      </Form.Item>

      <Form.Item
        label="Số nhà / tên đường"
        required
        validateStatus={errors.storeAddress && 'error'}
        help={errors.storeAddress?.message?.toString()}
      >
        <Input
          placeholder="Nhập số nhà, tên đường..."
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </Form.Item>

      <Controller name="storeAddress" control={control} render={({ field }) => <input type="hidden" {...field} />} />
    </>
  )
}

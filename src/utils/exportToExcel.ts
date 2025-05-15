import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const exportProductsToExcel = (products: any[]) => {
  const worksheetData = products.map((item) => ({
    'Mã hàng': item.code || '',
    'Tên hàng': item.name || '',
    'Giá bán': item.salePrice,
    'Giá vốn': item.costPrice,
    'Tồn kho': item.stock,
    'Ngày tạo': new Date(item.createdAt).toLocaleString(),
  }))

  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sản phẩm')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, `Danh_sach_san_pham_${Date.now()}.xlsx`)
}

export const exportSuppliersToExcel = (suppliers: any[]) => {
  const worksheetData = suppliers.map((item) => ({
    'Mã nhà cung cấp': item.code || '',
    'Tên nhà cung cấp': item.name || '',
    'Số điện thoại': item.phone || '',
    Email: item.email || '',
    'Mã số thuế': item.taxId || '',
    'Loại nhà cung cấp': item.type === 'INDIVIDUAL' ? 'Cá nhân' : 'Công ty',
    'Ngày tạo': new Date(item.createdAt).toLocaleString(),
    'Ngày cập nhật': new Date(item.updatedAt).toLocaleString(),
  }))

  const worksheet = XLSX.utils.json_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Nhà cung cấp')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, `Danh_sach_nha_cung_cap_${Date.now()}.xlsx`)
}

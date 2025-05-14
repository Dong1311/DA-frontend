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

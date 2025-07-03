import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

import { type  StockCheckResponseDto } from '@/api-sdk'
import { type DisposalReceiptResponseDto } from '@/api-sdk'
import { type InvoiceResponseDto } from '@/api-sdk'

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

export const exportStockChecksWithDetailsToExcel = (stockChecks: StockCheckResponseDto[]) => {
  if (!stockChecks.length) return

  const summarySheet = XLSX.utils.json_to_sheet(
    stockChecks.map((sc) => ({
      'Mã phiếu': sc.id,
      'Ngày tạo': new Date(sc.createdAt).toLocaleString(),
      'Ngày cân bằng': sc.balancedAt ? new Date(sc.balancedAt).toLocaleString() : '',
      'Tổng thực tế': sc.totalActual,
      'Tổng chênh lệch': sc.totalDifference,
      'Tăng': sc.incDifference,
      'Giảm': sc.decDifference,
      'Trạng thái': sc.status === 'DRAFT' ? 'Lưu nháp' : 'Đã lưu',
    }))
  )

  const allDetails = stockChecks.flatMap((sc) =>
    sc.details.map((d) => ({
      'Mã phiếu': sc.id,
      'Ngày phiếu': new Date(sc.createdAt).toLocaleString(),
      'Mã sản phẩm': d.product?.code || '(đã xóa)',
      'Tên sản phẩm': d.product?.name || '(đã xóa)',
      'Đơn vị': d.unit?.unitName || '(đã xóa)',
      'Tồn kho': d.quantityInStock,
      'Thực tế': d.quantityActual,
      'Chênh lệch': d.quantityDiff,
      'Giá trị chênh lệch': d.valueDiff,
    }))
  )

  const detailSheet = XLSX.utils.json_to_sheet(allDetails)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Danh sách phiếu')
  XLSX.utils.book_append_sheet(workbook, detailSheet, 'Chi tiết phiếu')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, `Phieu_kiem_kho_${Date.now()}.xlsx`)
}

export const exportInvoicesToExcel = (invoices: InvoiceResponseDto[]) => {
  if (!invoices.length) return

  const worksheet = XLSX.utils.json_to_sheet(
    invoices.map((invoice) => ({
      'Mã hóa đơn': invoice.id,
      'Ngày tạo': new Date(invoice.createdAt).toLocaleString(),
      'Khách hàng': invoice.customer?.name || 'Khách lẻ',
      'Tổng tiền': invoice.totalAmount,
      'Giảm giá': invoice.discount,
      'Thanh toán': invoice.amountPaid,
      'Phương thức': invoice.paymentMethod === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt',
      'Trạng thái': invoice.paymentStatus,
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hóa đơn')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  saveAs(blob, `Hoa_don_${Date.now()}.xlsx`)
}

export const exportReturnsToExcel = (returns: any) => {
  if (!returns.length) return

  const worksheet = XLSX.utils.json_to_sheet(
    returns.map((r:any) => ({
      'Mã phiếu': r.id,
      'Ngày tạo': new Date(r.createdAt).toLocaleString(),
      'Khách hàng': r.customer?.name || 'Khách lẻ',
      'Hóa đơn gốc': r.invoiceId,
      'Phương thức': r.invoice?.paymentMethod === 'BANKTRANSFER' ? 'Chuyển khoản' : 'Tiền mặt',
      'Tổng tiền hoàn': r.refundAmount,
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Phiếu trả hàng')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  saveAs(blob, `Phieu_tra_hang_${Date.now()}.xlsx`)
}

export const exportImportReceiptsToExcel = (receipts: any) => {
  if (!receipts.length) return

  const worksheet = XLSX.utils.json_to_sheet(
    receipts.map((r:any) => ({
      'Mã đơn': r.code,
      'Tên đơn nhập': r.name,
      'Ngày tạo': new Date(r.createdAt).toLocaleString(),
      'Nhà cung cấp': r.supplier?.name || '',
      'Tổng tiền': r.amountDue,
      'Trạng thái': r.status === 'COMPLETED' ? 'Đã nhập hàng' : 'Bản nháp',
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Phiếu nhập hàng')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  saveAs(blob, `Phieu_nhap_hang_${Date.now()}.xlsx`)
}


export const exportDisposalReceiptsToExcel = (receipts: DisposalReceiptResponseDto[]) => {
  if (!receipts.length) return

  const worksheet = XLSX.utils.json_to_sheet(
    receipts.map((r) => ({
      'Mã phiếu': r.id,
      'Ngày tạo': new Date(r.createdAt).toLocaleString(),
      'Tổng tiền': r.totalAmount,
      'Ghi chú': r.note || '',
      'Trạng thái': r.status === 'DRAFT' ? 'Lưu nháp' : 'Đã lưu',
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Phiếu hủy hàng')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  saveAs(blob, `Phieu_huy_hang_${Date.now()}.xlsx`)
}

interface CustomerExportRow {
  name: string
  phone?: string
  address?: string
  type: string
  netSpending: number
}

export const exportCustomersToExcel = (customers: any[]) => {
  if (!customers.length) return

  const rows: CustomerExportRow[] = customers.map((c) => ({
    name: c.name,
    phone: c.phone || '',
    address: c.address || '',
    type: c.type === 'COMPANY' ? 'Công ty' : 'Cá nhân',
    netSpending: c.netSpending || 0,
  }))

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ['name', 'phone', 'address', 'type', 'netSpending'],
  })

  const headers = ['Tên khách hàng', 'Số điện thoại', 'Địa chỉ', 'Loại khách hàng', 'Tổng mua hàng']
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' })

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Khách hàng')

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  saveAs(blob, `Danh_sach_khach_hang_${Date.now()}.xlsx`)
}

interface SupplierExportRow {
  name: string
  phone?: string
  address?: string
  taxCode?: string
  group?: string
}

export const exportSuppliersToExcel = (suppliers: any[]) => {
  const rows: SupplierExportRow[] = suppliers.map((supplier) => ({
    name: supplier.name || '',
    phone: supplier.phone || '',
    address: supplier.address || '',
    taxCode: supplier.taxCode || '',
    group: supplier.group || '',
  }))

  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Nha_cung_cap')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, `Danh_sach_nha_cung_cap_${Date.now()}.xlsx`)
}

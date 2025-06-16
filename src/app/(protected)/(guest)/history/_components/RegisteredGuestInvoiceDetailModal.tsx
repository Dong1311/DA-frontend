import { Modal, Spin } from 'antd'

import { type InvoiceResponseDto } from '@/api-sdk'

import { RegisteredGuestInvoiceInfo } from './RegisteredGuestInvoiceInfo'
import { RegisteredGuestInvoiceItemsTable } from './RegisteredGuestInvoiceItemsTable'

export const InvoiceDetailModal = ({
  open,
  loading,
  invoice,
  onClose,
}: {
  open: boolean
  loading: boolean
  invoice: InvoiceResponseDto | null
  onClose: () => void
}) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={800}>
      {loading || !invoice ? (
        <Spin style={{ display: 'block', margin: '40px auto' }} size="large" />
      ) : (
        <>
          <RegisteredGuestInvoiceInfo invoice={invoice} />
          <RegisteredGuestInvoiceItemsTable items={invoice.invoiceItems} />
        </>
      )}
    </Modal>
  )
}

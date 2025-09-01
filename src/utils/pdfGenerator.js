import jsPDF from 'jspdf'

export const generatePaymentReceipt = (payment) => {
  const pdf = new jsPDF()
  
  // Header
  pdf.setFontSize(20)
  pdf.text('Payment Receipt', 20, 30)
  
  // Receipt details
  pdf.setFontSize(12)
  pdf.text(`Receipt ID: ${payment.id.slice(0, 8)}`, 20, 50)
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60)
  
  // Payment details
  pdf.setFontSize(14)
  pdf.text('Payment Details:', 20, 80)
  
  pdf.setFontSize(12)
  pdf.text(`Title: ${payment.title}`, 20, 95)
  pdf.text(`Amount: $${payment.amount}`, 20, 105)
  pdf.text(`Due Date: ${new Date(payment.due_date).toLocaleDateString()}`, 20, 115)
  pdf.text(`Status: ${payment.status}`, 20, 125)
  
  if (payment.notes) {
    pdf.text(`Notes: ${payment.notes}`, 20, 135)
  }
  
  // Footer
  pdf.setFontSize(10)
  pdf.text('Thank you for your payment!', 20, 250)
  
  return pdf
}

export const exportPaymentsToCSV = (payments) => {
  const headers = ['Title', 'Amount', 'Due Date', 'Status', 'Notes', 'Created At']
  const csvContent = [
    headers.join(','),
    ...payments.map(payment => [
      `"${payment.title}"`,
      payment.amount,
      payment.due_date,
      payment.status,
      `"${payment.notes || ''}"`,
      new Date(payment.created_at).toLocaleDateString()
    ].join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `payments-export-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}
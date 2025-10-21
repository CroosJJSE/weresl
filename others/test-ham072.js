import { parseRFLoans, calculateTotalPayments, RF_LOAN_FIELD } from './migrate-csv-data.js'

console.log('🧪 Testing HAM072 specific case...')

try {
  // HAM072 data from CSV
  const rfLoanStr = "Fish stall and Trishaw (1120000) [04-03-2025] + Trishaw Repair (25000) [04-07-2025]"
  const rfCurPrjStr = "Fish stall and Trishaw (920000) + Trishaw Repair (25000)"
  const comPrjsStr = ""
  const rfPaidHistoryStr = "110000 [04-03-2025] + 20000 [01-04-2025] + 15000 [06-05-2025] + 35000 [03-07-2025] + 20000 [29-07-2025]"
  
  console.log('📥 RF_Loan:', rfLoanStr)
  console.log('📥 RF_Cur_Prj:', rfCurPrjStr)
  console.log('📥 Com_prjs:', comPrjsStr)
  console.log('📥 RF_Paid_History:', rfPaidHistoryStr)
  
  const loans = parseRFLoans(rfLoanStr, rfCurPrjStr, comPrjsStr, rfPaidHistoryStr)
  
  console.log('\n📋 Parsed Loans:')
  loans.forEach((loan, index) => {
    console.log(`\n  Loan ${index + 1}:`)
    console.log(`    Purpose: ${loan[RF_LOAN_FIELD.PURPOSE]}`)
    console.log(`    Amount: ${loan[RF_LOAN_FIELD.AMOUNT].toLocaleString()}`)
    console.log(`    Status: ${loan[RF_LOAN_FIELD.STATUS]}`)
    console.log(`    Current Balance: ${loan[RF_LOAN_FIELD.CURRENT_BALANCE].toLocaleString()}`)
    console.log(`    Payment Integrity: ${loan[RF_LOAN_FIELD.PAYMENT_INTEGRITY]}`)
    
    // Debug payment calculation
    const totalPayments = calculateTotalPayments(rfPaidHistoryStr, loan[RF_LOAN_FIELD.PURPOSE])
    console.log(`    Total Payments for this purpose: ${totalPayments.toLocaleString()}`)
    console.log(`    Calculated Original Amount: ${(loan[RF_LOAN_FIELD.CURRENT_BALANCE] + totalPayments).toLocaleString()}`)
  })
  
  console.log('\n✅ Expected Results:')
  console.log('  - Fish stall and Trishaw: active, balance = 920000, amount = 1120000')
  console.log('  - Trishaw Repair: active, balance = 25000, amount = 25000')
} catch (error) {
  console.error('❌ Error in testHAM072Case:', error)
}

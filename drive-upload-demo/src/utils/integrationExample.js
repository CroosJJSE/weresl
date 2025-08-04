/**
 * GAS Integration Examples
 * Shows how to integrate GAS functionality into existing forms
 */

import { 
  sendNewLoanApprovalNotification,
  addLoanInitiationRecord,
  updateMainTabRow,
  logActivity
} from './gasUtils.js'
import { 
  sendPaymentApprovalNotification,
  addRFReturnRecord
} from './gasUtils.js'

/**
 * Example: Integrate GAS functionality into LoanInitForm.vue
 * Add this to the submitForm function in LoanInitForm.vue
 */
export const integrateGASIntoLoanInitForm = async (formData, profile, loanData) => {
  try {
    // 1. Send email notification for new loan approval
    await sendNewLoanApprovalNotification(loanData, profile)
    
    // 2. Add loan initiation record to sheet
    await addLoanInitiationRecord(loanData, profile)
    
    // 3. Update main tab with profile data
    await updateMainTabRow(profile)
    
    // 4. Log the activity
    await logActivity('New loan initiated', {
      regId: profile.Reg_ID,
      loanType: loanData.type,
      amount: loanData.amount,
      timestamp: new Date().toISOString()
    })
    
    console.log('✅ GAS integration completed successfully')
    return { success: true }
    
  } catch (error) {
    console.error('❌ GAS integration failed:', error)
    // Don't fail the main form submission if GAS fails
    return { success: false, error: error.message }
  }
}

/**
 * Example: Integrate GAS functionality into RFGIFReturnForm.vue
 * Add this to the submitRFRepayment function in RFGIFReturnForm.vue
 */
export const integrateGASIntoRFGIFReturnForm = async (returnRecord, profile, paymentData) => {
  try {
    // 1. Send email notification for payment approval
    await sendPaymentApprovalNotification(paymentData, profile)
    
    // 2. Add RF return record to sheet
    await addRFReturnRecord(returnRecord, profile)
    
    // 3. Log the activity
    await logActivity('RF repayment submitted', {
      regId: profile.Reg_ID,
      amount: paymentData.amount,
      receiver: paymentData.receiver,
      timestamp: new Date().toISOString()
    })
    
    console.log('✅ GAS integration completed successfully')
    return { success: true }
    
  } catch (error) {
    console.error('❌ GAS integration failed:', error)
    // Don't fail the main form submission if GAS fails
    return { success: false, error: error.message }
  }
}

/**
 * Example: How to modify LoanInitForm.vue submitForm function
 */
export const exampleLoanInitFormIntegration = `
// In LoanInitForm.vue, modify the submitForm function:

const submitForm = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    // ... existing form submission logic ...
    
    // After successful form submission, integrate GAS
    const gasResult = await integrateGASIntoLoanInitForm(
      formData, 
      profileData, 
      {
        type: formData.loanType,
        amount: formData.initialAmount,
        purpose: formData.purpose,
        source: formData.source
      }
    )
    
    if (gasResult.success) {
      showMessage('Loan initiated and notifications sent successfully!', 'success')
    } else {
      showMessage('Loan initiated but notifications failed. Please contact admin.', 'warning')
    }
    
    setTimeout(() => {
      resetForm()
    }, 3000)
    
  } catch (error) {
    showMessage('Error submitting application: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}
`

/**
 * Example: How to modify RFGIFReturnForm.vue submitRFRepayment function
 */
export const exampleRFGIFReturnFormIntegration = `
// In RFGIFReturnForm.vue, modify the submitRFRepayment function:

const submitRFRepayment = async () => {
  // ... existing validation logic ...
  
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // ... existing repayment submission logic ...
    
    // After successful repayment submission, integrate GAS
    const gasResult = await integrateGASIntoRFGIFReturnForm(
      repaymentRequest,
      currentProfile.value,
      {
        paymentType: 'RF Repayment',
        amount: rfData.amount,
        receiver: rfData.receiver
      }
    )
    
    if (gasResult.success) {
      successMessage.value = 'Repayment submitted and notifications sent successfully!'
    } else {
      successMessage.value = 'Repayment submitted but notifications failed. Please contact admin.'
    }
    
    // Reset form
    rfData.amount = ''
    rfData.receiver = ''
    rfData.billFile = null
    rfData.billUrl = ''
    billPreview.value = null
    returnType.value = ''
    
  } catch (error) {
    errorMessage.value = 'Error submitting repayment request: ' + error.message
  } finally {
    loading.value = false
  }
}
`

/**
 * Example: Error handling wrapper
 */
export const gasIntegrationWrapper = async (gasFunction, ...args) => {
  try {
    const result = await gasFunction(...args)
    return { success: true, result }
  } catch (error) {
    console.error('GAS integration error:', error)
    // Log error but don't fail the main operation
    return { success: false, error: error.message }
  }
}

/**
 * Example: Batch GAS operations
 */
export const batchGASOperations = async (operations) => {
  const results = []
  
  for (const operation of operations) {
    try {
      const result = await operation.function(...operation.args)
      results.push({
        name: operation.name,
        success: true,
        result
      })
    } catch (error) {
      results.push({
        name: operation.name,
        success: false,
        error: error.message
      })
    }
  }
  
  return results
}

/**
 * Example: Conditional GAS integration
 */
export const conditionalGASIntegration = async (condition, gasFunction, ...args) => {
  if (!condition) {
    console.log('GAS integration skipped due to condition')
    return { success: true, skipped: true }
  }
  
  return await gasIntegrationWrapper(gasFunction, ...args)
}

export default {
  integrateGASIntoLoanInitForm,
  integrateGASIntoRFGIFReturnForm,
  exampleLoanInitFormIntegration,
  exampleRFGIFReturnFormIntegration,
  gasIntegrationWrapper,
  batchGASOperations,
  conditionalGASIntegration
} 
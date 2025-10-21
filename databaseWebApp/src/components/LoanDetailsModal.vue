<template>
  <div v-if="isVisible" class="loan-modal" @click="closeModal">
    <div class="loan-modal-content" @click.stop>
      <div class="close-button" @click="closeModal">&times;</div>
      
      <!-- Loading State -->
      <div v-if="!isLoanReady" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading loan details...</p>
      </div>
      
      <!-- Loan Content (only show when ready) -->
      <div v-if="isLoanReady">
      
      <!-- Payment Integrity Indicator - REMOVED as requested -->
      <!-- <div class="payment-integrity-indicator" :class="{ 'integrity-true': getPaymentIntegrity(), 'integrity-false': !getPaymentIntegrity() }">
        <span v-if="getPaymentIntegrity()" class="integrity-tick">✓</span>
        <span v-else class="integrity-x">✗</span>
      </div> -->

      <div class="loan-modal-header">
        <h3>{{ getLoanTypeName(loan.type) }} Loan Details</h3>
        <div class="loan-status" :class="`status-${loan[getLoanField(loan.type).STATUS]}`">
          {{ getLoanStatusName(loan[getLoanField(loan.type).STATUS]) }}
        </div>
      </div>

      <div class="loan-modal-body">
        <!-- Basic Loan Information -->
        <div class="loan-info-section">
          <div class="info-grid">
                         <div class="info-row">
               <div class="info-label">Purpose:</div>
               <div class="info-value">{{ loan[getLoanField(loan.type).PURPOSE] || 'N/A' }}</div>
             </div>
             <div class="info-row">
               <div class="info-label">Amount:</div>
               <div class="info-value amount">{{ formatAmountCompact(loan[getLoanField(loan.type).AMOUNT] || loan[getLoanField(loan.type).APPROVED_AMOUNT]) }}</div>
             </div>
              <div class="info-row" v-if="loan.type === 'RF'">
                <div class="info-label">Current Balance:</div>
                <div class="info-value balance" :class="{ 'paid': (loan[RF_LOAN_FIELD.CURRENT_BALANCE] || loan.currentBalance || 0) === 0 }">
                  {{ formatAmountCompact(loan[RF_LOAN_FIELD.CURRENT_BALANCE] || loan.currentBalance || 0) }}
                </div>
              </div>
             <div class="info-row">
               <div class="info-label">Approved Date:</div>
               <div class="info-value">{{ formatDateCompact(loan[getLoanField(loan.type).APPROVED_AT]) }}</div>
             </div>
              <div class="info-row" v-if="loan[RF_LOAN_FIELD.ARMS] && loan[RF_LOAN_FIELD.ARMS].trim() !== ''">
                <div class="info-label">ARMS:</div>
                <div class="info-value">{{ loan[RF_LOAN_FIELD.ARMS] }}</div>
              </div>
             <div class="info-row" v-if="loan[getLoanField(loan.type).SOURCE]">
               <div class="info-label">Source:</div>
               <div class="info-value">{{ loan[getLoanField(loan.type).SOURCE] }}</div>
             </div>
          </div>
        </div>

                 <!-- Loan Settlement History -->
         <div v-if="hasValidLoanHistory" class="loan-history-section">
           <h4>Loan Settlement History</h4>
                       <div class="history-timeline">
              <!-- Timeline items -->
                             <div v-for="(payment, index) in getLoanHistoryArray" :key="`timeline-${index}`" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-row">
                    <div class="payment-date">{{ formatDateCompact(payment.date) }}</div>
                    <div class="payment-amount">{{ formatAmountCompact(payment.amount) }}</div>
                    <div v-if="payment.receipt_link_ID" class="receipt-link">
                      <a :href="getReceiptUrl(payment.receipt_link_ID)" target="_blank" class="receipt-icon" title="View Receipt">
                        📄
                      </a>
                    </div>
                  </div>
                </div>
              </div>
           </div>
         </div>

        

        
      </div>
      
      <!-- End of Loan Content -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { RF_LOAN_FIELD, GRANT_FIELD } from '@/enums/db.js'
import { formatAmount, formatDate } from '@/utils/formatUtils.ts'
import { convertGoogleDriveUrl } from '@/utils/driveUtils.js'

export default {
  name: 'LoanDetailsModal',
  props: {
    loan: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const getLoanTypeName = (type) => {
      return type === 'RF' ? 'Revolving Fund' : 'Grant'
    }

    const getLoanField = (type) => {
      if (!type) return RF_LOAN_FIELD // Default to RF if type is undefined
      return type === 'RF' ? RF_LOAN_FIELD : GRANT_FIELD
    }

    // Safe getter for loan fields
    const getLoanValue = (field) => {
      if (!props.loan || !props.loan.type) return null
      const loanField = getLoanField(props.loan.type)
      return props.loan[loanField[field]]
    }

    // Get payment integrity with fallback to direct field access
    const getPaymentIntegrity = () => {
      if (!props.loan) return false
      
      // Try enum field first
      const loanField = getLoanField(props.loan.type)
      if (props.loan[loanField.PAYMENT_INTEGRITY] !== undefined) {
        return props.loan[loanField.PAYMENT_INTEGRITY]
      }
      
      // Fallback to direct field access (camelCase)
      if (props.loan.paymentIntegrity !== undefined) {
        return props.loan.paymentIntegrity
      }
      
      // Default to false if not found
      return false
    }

    const getLoanStatusName = (status) => {
      const statusMap = {
        'active': 'Active',
        'completed': 'Completed',
        'pending': 'Pending',
        'approved': 'Approved',
        'rejected': 'Rejected'
      }
      return statusMap[status] || status || 'Unknown'
    }

    const getReceiptUrl = (fileId) => {
      // Use direct Drive viewer for full quality instead of thumbnail
      return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
    }

    const formatDateCompact = (date) => {
      if (!date) return 'N/A'
      
      try {
        let dateObj
        
        // Handle Firebase Timestamp objects
        if (date.toDate) {
          dateObj = date.toDate()
        } else if (typeof date === 'string') {
          // Handle DD-MM-YYYY format (common in our database)
          if (date.includes('-') && date.split('-').length === 3) {
            const parts = date.split('-')
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              // DD-MM-YYYY format
              dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
            } else {
              // Try as regular date string
              dateObj = new Date(date)
            }
          } else {
            // Try as regular date string
            dateObj = new Date(date)
          }
        } else {
          // Handle Date objects or other formats
          dateObj = new Date(date)
        }
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
          return 'Invalid Date'
        }
        
        // Return compact format without time
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      } catch (error) {
        return 'Invalid Date'
      }
    }

    const formatAmountCompact = (amount) => {
      if (!amount && amount !== 0) return 'N/A'
      
      try {
        const numAmount = parseFloat(amount)
        if (isNaN(numAmount)) return 'N/A'
        
        // Format as integer without decimal places
        return numAmount.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      } catch (error) {
        return 'N/A'
      }
    }

    const getDownloadUrl = (fileId) => {
      return `https://drive.google.com/uc?export=download&id=${fileId}`
    }

    const getLoanHistoryArray = computed(() => {
      if (!props.loan) return []
      
      // Try multiple possible field names for loan history
      const possibleFields = ['loanHistory', 'LOAN_HISTORY', 'loan_history']
      let loanHistory = null
      
      for (const field of possibleFields) {
        if (props.loan[field] && Array.isArray(props.loan[field])) {
          loanHistory = props.loan[field]
          break
        }
      }
      
      // Also try using the enum field
      if (!loanHistory && props.loan.type) {
        const loanField = getLoanField(props.loan.type)
        if (props.loan[loanField.LOAN_HISTORY]) {
          loanHistory = props.loan[loanField.LOAN_HISTORY]
        }
      }
      
      return Array.isArray(loanHistory) ? loanHistory : []
    })

    const hasValidLoanHistory = computed(() => {
      const loanHistory = getLoanHistoryArray.value
      
      if (loanHistory.length === 0) {
        return false
      }
      
      return loanHistory.some(payment => 
        payment && 
        typeof payment === 'object' && 
        payment.date && 
        payment.amount
      )
    })



    const isLoanReady = computed(() => {
      return props.loan && props.loan.type && props.loan.id
    })

    const closeModal = () => {
      emit('close')
    }

         return {
       RF_LOAN_FIELD,
       GRANT_FIELD,
       formatAmount,
       formatDate,
       formatDateCompact,
       formatAmountCompact,
       getLoanTypeName,
       getLoanField,
       getLoanValue,
       getPaymentIntegrity,
       getLoanStatusName,
       getReceiptUrl,
       getDownloadUrl,
       getLoanHistoryArray,
       hasValidLoanHistory,
       isLoanReady,
       closeModal
     }
  }
}
</script>

<style scoped>
.loan-modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 10px;
}

.loan-modal-content {
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  color: #333;
  z-index: 10;
}

.close-button:hover {
  background-color: #e0e0e0;
}

/* Loading State Styles */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1565c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-state p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.payment-integrity-indicator {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;
}

.integrity-true {
  background-color: #4caf50;
  color: white;
}

.integrity-false {
  background-color: #f44336;
  color: white;
}

.integrity-tick {
  color: white;
}

.integrity-x {
  color: white;
}

.loan-modal-header {
  margin: 15px 0 15px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.loan-modal-header h3 {
  margin: 0;
  color: #1565c0;
  font-size: 20px;
}

.loan-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #1565c0;
}

.status-completed {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.status-pending {
  background-color: #fff3e0;
  color: #f57c00;
  border: 1px solid #f57c00;
}

.status-approved {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.status-rejected {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
}

.loan-modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

 .loan-info-section {
   background-color: #f8f9fa;
   padding: 8px;
   border-radius: 8px;
   border-left: 4px solid #1565c0;
 }

 .info-grid {
   display: flex;
   flex-direction: column;
   gap: 4px;
 }

 .info-row {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 4px 0;
   border-bottom: 1px solid #e0e0e0;
 }

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #1565c0;
  min-width: 120px;
  font-size: 14px;
}

.info-value {
  text-align: right;
  font-size: 14px;
  color: #333;
}

.info-value.amount {
  font-weight: 600;
  color: #2e7d32;
}

.info-value.balance {
  font-weight: 600;
  color: #d32f2f;
}

.info-value.balance.paid {
  color: #2e7d32;
}

.info-value.description {
  font-style: italic;
  color: #666;
  text-align: left;
  max-width: 200px;
  word-wrap: break-word;
}

 .loan-history-section {
   background-color: #f8f9fa;
   padding: 8px;
   border-radius: 8px;
   border-left: 4px solid #ff9800;
 }

 .loan-history-section h4 {
   margin: 0 0 10px 0;
   color: #ff9800;
   font-size: 16px;
   font-weight: 600;
 }

.history-timeline {
  position: relative;
}

.history-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ff9800;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 40px;
}

.timeline-marker {
  position: absolute;
  left: 8px;
  top: 5px;
  width: 16px;
  height: 16px;
  background-color: #ff9800;
  border-radius: 50%;
  border: 3px solid white;
}

 .timeline-content {
   background-color: white;
   padding: 12px;
   border-radius: 8px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }

 .timeline-row {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 12px;
 }

 .payment-date {
   font-weight: 600;
   color: #333;
   font-size: 14px;
   min-width: 80px;
 }

 .payment-amount {
   color: #2e7d32;
   font-weight: 600;
   font-size: 16px;
   flex: 1;
   text-align: center;
 }

 .receipt-link {
   min-width: 30px;
   text-align: right;
 }

 .receipt-icon {
   display: inline-block;
   padding: 8px;
   background-color: #1565c0;
   color: white;
   text-decoration: none;
   border-radius: 6px;
   font-size: 16px;
   transition: background-color 0.2s;
   line-height: 1;
 }

 .receipt-icon:hover {
   background-color: #0d47a1;
 }





/* Mobile optimizations */
@media (max-width: 768px) {
  .loan-modal {
    padding: 5px;
  }
  
  .loan-modal-content {
    padding: 15px;
    border-radius: 10px;
    max-height: 95vh;
  }
  
  .loan-modal-header {
    margin: 15px 0 15px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .loan-modal-header h3 {
    font-size: 18px;
  }
  
  .loan-status {
    padding: 4px 10px;
    font-size: 11px;
  }
  
  .info-label {
    min-width: 100px;
    font-size: 13px;
  }
  
  .info-value {
    font-size: 13px;
  }
  
  .timeline-item {
    padding-left: 35px;
  }
  
  .timeline-marker {
    left: 6px;
    width: 14px;
    height: 14px;
  }
  
  .timeline-content {
    padding: 10px;
  }
  
  .payment-date {
    font-size: 13px;
  }
  
  .payment-amount {
    font-size: 15px;
  }
  
  .receipt-button {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .receipts-section {
    padding: 10px;
  }
  
  .receipts-section h4 {
    font-size: 14px;
  }
  
  .receipt-item {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .receipt-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .receipt-view-btn,
  .receipt-download-btn {
    padding: 5px 10px;
    font-size: 11px;
    flex: 1;
    text-align: center;
  }
}

/* Landscape orientation adjustments */
@media (max-width: 768px) and (orientation: landscape) {
  .loan-modal-content {
    max-height: 98vh;
    max-width: 90vw;
  }
  
  .loan-modal-header {
    margin: 10px 0 10px 0;
  }
  
  .loan-modal-header h3 {
    font-size: 16px;
  }
  
  .loan-modal-body {
    gap: 15px;
  }
  
  .info-grid {
    gap: 6px;
  }
  
  .info-row {
    padding: 6px 0;
  }
  
  .info-label {
    min-width: 90px;
    font-size: 12px;
  }
  
  .info-value {
    font-size: 12px;
  }
  
  .receipts-section {
    padding: 8px;
  }
  
  .receipts-section h4 {
    font-size: 13px;
  }
  
  .receipt-item {
    padding: 8px;
    gap: 6px;
  }
  
  .receipt-date {
    font-size: 12px;
  }
  
  .receipt-amount {
    font-size: 11px;
  }
  
  .receipt-view-btn,
  .receipt-download-btn {
    padding: 4px 8px;
    font-size: 10px;
  }
}
</style>

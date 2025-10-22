<template>
  <div class="bank-accounts-page">
    <!-- Header -->
    <div class="page-header">
      <button @click="goBack" class="back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <h1>Bank Account Management</h1>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
      <button @click="clearSuccessMessage" class="close-message">&times;</button>
    </div>

    <!-- wereSL Account Balance Update -->
    <div class="section">
      <h3>Update Budget Balance</h3>
      <div class="wereSL-balance-form">
        <div v-if="!editingWereSL" class="balance-display" @click="startEditWereSL">
          <span class="balance-amount">{{ formatAmountInMillions(wereSLBalance) }}</span>
          <span class="edit-tag">edit</span>
        </div>
        <div v-else class="balance-edit-form">
          <input
            v-model="newWereSLBalance"
            type="number"
            class="form-control"
            min="0"
            step="0.01"
            placeholder="Enter new balance"
            @keyup.enter="updateWereSLBalance"
          />
          <div class="edit-actions">
            <button @click="updateWereSLBalance" class="btn btn-primary" :disabled="updatingWereSL">
              <span v-if="updatingWereSL" class="loader"></span>
              {{ updatingWereSL ? 'Saving...' : 'Save' }}
            </button>
            <button @click="cancelEditWereSL" class="btn btn-secondary">Cancel</button>
          </div>
          <div v-if="editingWereSL" class="balance-change">
            {{ formatAmountInMillions(wereSLBalance) }} → {{ formatAmountInMillions(newWereSLBalance) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Money Transfer Section -->
    <div class="section">
      <h3>Transfer Money</h3>
      <div class="transfer-form">
        <select v-model="transferFromAccount" class="form-control" @change="updateTransferValidation">
          <option value="">Source</option>
          <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
            {{ account.name }}
          </option>
        </select>
        <select v-model="transferToAccount" class="form-control" @change="updateTransferValidation">
          <option value="">Destination</option>
          <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
            {{ account.name }}
          </option>
        </select>
        <input
          type="number"
          v-model="transferAmount"
          class="form-control"
          min="0"
          step="0.01"
          placeholder="Amount"
          @input="updateTransferValidation"
        />
        <button
          @click="transferMoney"
          class="btn btn-success w-full"
          :disabled="transferring || !canTransfer"
        >
          <span v-if="transferring" class="loader"></span>
          {{ transferring ? 'Transferring...' : 'Transfer' }}
        </button>
        <small class="form-help" v-if="transferValidationMessage" :class="{ 'error': transferValidationError }">
          {{ transferValidationMessage }}
        </small>
      </div>
    </div>

    <!-- Account Balances Overview -->
    <div class="section">
      <div class="section-header" @click="toggleAccountBalances">
        <h3>Account Balances</h3>
        <div class="expand-icon" :class="{ expanded: showAccountBalances }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </div>
      <div v-if="showAccountBalances" class="section-content">
        <div class="account-balances-grid">
          <div v-for="account in bankAccounts" :key="account.name" class="account-balance-tile">
            <div class="account-name">{{ getAccountFirstName(account.name) }}</div>
            <div class="account-balance">{{ formatAmountInMillions(account.currentBankBalance || account.balance || 0) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="section">
      <div class="section-header" @click="toggleTransactionHistory">
        <h3>Transaction History</h3>
        <div class="expand-icon" :class="{ expanded: showTransactionHistory }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </div>
      <div v-if="showTransactionHistory" class="section-content">
        <!-- Transaction Filters -->
        <div class="transaction-filters">
          <div class="filter-row">
            <select v-model="transactionFilter.account" class="form-control filter-select" @change="filterTransactions">
              <option value="">All Accounts</option>
              <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
                {{ account.name }}
              </option>
            </select>
            <select v-model="transactionFilter.type" class="form-control filter-select" @change="filterTransactions">
              <option value="">All Types</option>
              <option value="transfer">Internal Transfer</option>
              <option value="loan_approval">Loan Approval</option>
              <option value="payment_approval">Payment Approval</option>
              <option value="balance_update">Balance Update</option>
            </select>
          </div>
          <div class="filter-row">
            <div class="date-input-group">
              <label>From:</label>
              <input
                v-model="dateRange.from"
                type="month"
                class="form-control filter-select"
                @change="filterTransactionsByDate"
              />
            </div>
            <div class="date-input-group">
              <label>To:</label>
              <input
                v-model="dateRange.to"
                type="month"
                class="form-control filter-select"
                @change="filterTransactionsByDate"
              />
            </div>
          </div>
        </div>

        <!-- Transaction List -->
        <div class="transaction-history">
          <div v-if="filteredTransactions.length === 0" class="no-transactions">
            <p>No transactions found for the selected filters.</p>
            <p v-if="transactionHistory.length === 0" class="text-sm text-gray-500">
              No transaction history available.
            </p>
            <p v-else class="text-sm text-gray-500">
              Showing {{ filteredTransactions.length }} of {{ transactionHistory.length }} total transactions.
            </p>
          </div>
          <div v-else>
            <p class="text-sm text-gray-500 mb-2">
              Showing {{ filteredTransactions.length }} of {{ transactionHistory.length }} total transactions.
            </p>
            <div v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item" @click="openTransactionModal(transaction)">
              <div class="transaction-main">
                <div class="transaction-line">
                  <span class="transaction-type-tag" :class="getTransactionTypeClass(transaction.type)">
                    {{ getTransactionTypeLabel(transaction.type) === 'Internal Transfer' ? 'INT' : 
                      getTransactionTypeLabel(transaction.type) === 'Loan Approval' ? 'LOAN' : 
                      getTransactionTypeLabel(transaction.type) === 'Payment Approval' ? 'PAY' : 
                      getTransactionTypeLabel(transaction.type) === 'Balance Update' ? 'UPDATE' : 
                      transaction.type ? transaction.type.toUpperCase().substring(0, 3) : 'UNK' }}
                  </span>
                  <span class="transaction-date">{{ formatDate(transaction.timestamp) }}</span>
                  <span class="transaction-accounts">
                    {{ getTransactionSender(transaction) }} → {{ getTransactionReceiver(transaction) }}
                  </span>
                  <span class="transaction-amount">{{ formatAmountWithCommas(transaction.amount) }}</span>
                  <span v-if="transaction.loanId" class="transaction-regid">{{ transaction.loanId }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="showTransactionModal" class="modal-overlay" @click="closeTransactionModal">
      <div class="modal-content transaction-modal" @click.stop>
        <div class="modal-header">
          <h3>Transaction Details</h3>
          <button class="modal-close" @click="closeTransactionModal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div v-if="selectedTransaction" class="modal-body">
          <!-- Transaction Type Badge -->
          <div class="transaction-type-section">
            <div class="type-badge" :class="getTransactionTypeClass(selectedTransaction.type)">
              {{ getTransactionTypeLabel(selectedTransaction.type) }}
            </div>
            <div class="transaction-id">ID: {{ selectedTransaction.id }}</div>
          </div>

          <!-- Money Flow Visualization -->
          <div class="money-flow-section">
            <div class="flow-container">
              <div class="account-box sender">
                <div class="account-name">{{ getTransactionSender(selectedTransaction) }}</div>
                <div class="account-label">Sender</div>
              </div>
              
              <div class="flow-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-head"></div>
                <div class="amount-badge">Rs. {{ formatAmountWithCommas(selectedTransaction.amount) }}</div>
              </div>
              
              <div class="account-box receiver">
                <div class="account-name">{{ getTransactionReceiver(selectedTransaction) }}</div>
                <div class="account-label">Receiver</div>
              </div>
            </div>
          </div>

          <!-- Transaction Details Grid -->
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Date & Time</div>
              <div class="detail-value">{{ formatDateTime(selectedTransaction.timestamp) }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Amount</div>
              <div class="detail-value amount-value">Rs. {{ formatAmountWithCommas(selectedTransaction.amount) }}</div>
            </div>
            
            <div v-if="selectedTransaction.regId" class="detail-item">
              <div class="detail-label">Registration ID</div>
              <div class="detail-value">{{ selectedTransaction.regId }}</div>
            </div>
            
            <div v-if="selectedTransaction.loanId" class="detail-item">
              <div class="detail-label">Loan ID</div>
              <div class="detail-value">{{ selectedTransaction.loanId }}</div>
            </div>
            
            <div v-if="selectedTransaction.paymentId" class="detail-item">
              <div class="detail-label">Payment ID</div>
              <div class="detail-value">{{ selectedTransaction.paymentId }}</div>
            </div>
            
            <div v-if="selectedTransaction.description" class="detail-item full-width">
              <div class="detail-label">Description</div>
              <div class="detail-value">{{ selectedTransaction.description }}</div>
            </div>
          </div>

          <!-- Balance Changes (if available) -->
          <div v-if="selectedTransaction.sourceAccountPreviousBalance !== undefined || selectedTransaction.receiverAccountPreviousBalance !== undefined" class="balance-changes">
            <h4>Balance Changes</h4>
            <div class="balance-grid">
              <div v-if="selectedTransaction.sourceAccountPreviousBalance !== undefined" class="balance-item">
                <div class="balance-label">{{ getTransactionSender(selectedTransaction) }}</div>
                <div class="balance-change">
                  <span class="previous-balance">Rs. {{ formatAmountWithCommas(selectedTransaction.sourceAccountPreviousBalance) }}</span>
                  <span class="balance-arrow">→</span>
                  <span class="new-balance">Rs. {{ formatAmountWithCommas(selectedTransaction.sourceAccountNewBalance) }}</span>
                </div>
              </div>
              
              <div v-if="selectedTransaction.receiverAccountPreviousBalance !== undefined" class="balance-item">
                <div class="balance-label">{{ getTransactionReceiver(selectedTransaction) }}</div>
                <div class="balance-change">
                  <span class="previous-balance">Rs. {{ formatAmountWithCommas(selectedTransaction.receiverAccountPreviousBalance) }}</span>
                  <span class="balance-arrow">→</span>
                  <span class="new-balance">Rs. {{ formatAmountWithCommas(selectedTransaction.receiverAccountNewBalance) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { adminDbService } from '../services/dbService.js'
import { BANK_ACCOUNT_FIELD } from '../enums/db.js'

export default {
  name: 'BankAccountsPage',
  setup() {
    const router = useRouter()
    
    // Bank Account Management
    const bankAccounts = ref([])
    const wereSLBalance = ref(0)
    const editingWereSL = ref(false)
    const newWereSLBalance = ref('')
    const updatingWereSL = ref(false)
    const transferFromAccount = ref('')
    const transferToAccount = ref('')
    const transferAmount = ref('')
    const transferring = ref(false)
    const transferValidationMessage = ref('')
    const transferValidationError = ref(false)
    const canTransfer = ref(false)

    // Expandable sections
    const showAccountBalances = ref(false)
    const showTransactionHistory = ref(false)
    
    // Transaction history
    const transactionHistory = ref([])
    const loadingTransactions = ref(false)
    
    // Transaction filters
    const transactionFilter = ref({
      account: '',
      type: ''
    })

    // Transaction details modal
    const showTransactionModal = ref(false)
    const selectedTransaction = ref(null)

    // Date range filter
    const dateRange = ref({
      from: '',
      to: ''
    })

    // Success message
    const successMessage = ref('')

    // Computed Properties
    const totalBankBalance = computed(() => {
      return bankAccounts.value.reduce((sum, account) => sum + (account.currentBankBalance || 0), 0)
    })

    const filteredTransactions = computed(() => {
      let filtered = transactionHistory.value;
      
      console.log('🔍 Starting with', filtered.length, 'transactions')
      
      // Filter by account
      if (transactionFilter.value.account) {
        console.log('🔍 Filtering by account:', transactionFilter.value.account)
        filtered = filtered.filter(t => {
          const fromAccount = getTransactionSender(t);
          const toAccount = getTransactionReceiver(t);
          const matches = fromAccount === transactionFilter.value.account || toAccount === transactionFilter.value.account;
          console.log(`   Transaction ${t.id}: ${fromAccount} → ${toAccount}, matches: ${matches}`);
          return matches;
        });
        console.log('🔍 After account filter:', filtered.length, 'transactions');
      }
      
      // Filter by type
      if (transactionFilter.value.type) {
        console.log('🔍 Filtering by type:', transactionFilter.value.type)
        filtered = filtered.filter(t => {
          const matches = t.type === transactionFilter.value.type;
          console.log(`   Transaction ${t.id}: type=${t.type}, matches: ${matches}`);
          return matches;
        });
        console.log('🔍 After type filter:', filtered.length, 'transactions');
      }
      
      // Filter by date range
      if (dateRange.value.from || dateRange.value.to) {
        console.log('🔍 Filtering by date range:', dateRange.value.from, 'to', dateRange.value.to)
        filtered = filtered.filter(t => {
          let transactionDate;
          
          // Handle different timestamp formats
          if (t.timestamp && typeof t.timestamp.toDate === 'function') {
            transactionDate = t.timestamp.toDate();
          } else if (t.timestamp && t.timestamp.seconds) {
            transactionDate = new Date(t.timestamp.seconds * 1000);
          } else if (t.timestamp) {
            transactionDate = new Date(t.timestamp);
          } else {
            console.log(`⚠️ Transaction ${t.id} has no valid timestamp:`, t.timestamp);
            return false; // Skip if no valid timestamp
          }
          
          const fromDate = dateRange.value.from ? new Date(dateRange.value.from + '-01') : null;
          const toDate = dateRange.value.to ? new Date(dateRange.value.to + '-01') : null;
          
          if (fromDate && transactionDate < fromDate) return false;
          if (toDate && transactionDate > toDate) return false;
          return true;
        });
        console.log('🔍 After date filter:', filtered.length, 'transactions');
      }
      
      // Only show transactions with valid sender/receiver and amount > 0
      // But be more permissive - show transactions even if some fields are missing
      filtered = filtered.filter(t => {
        const sender = getTransactionSender(t);
        const receiver = getTransactionReceiver(t);
        const hasAmount = t.amount && t.amount > 0;
        
        // Log what we're checking
        console.log(`🔍 Transaction ${t.id}: sender=${sender}, receiver=${receiver}, amount=${t.amount}, hasAmount=${hasAmount}`);
        
        // Be more permissive - only require amount
        if (!hasAmount) {
          console.log(`⚠️ Skipping transaction ${t.id}: no valid amount`);
          return false;
        }
        
        // If sender or receiver is unknown, still show it but log it
        if (sender === 'Unknown' || receiver === 'Unknown') {
          console.log(`⚠️ Transaction ${t.id} has unknown sender/receiver but showing anyway`);
        }
        
        return true;
      });
      
      console.log(`📊 Final filtered transactions: ${filtered.length}/${transactionHistory.value.length}`);
      return filtered;
    })

    // Methods
    const goBack = () => {
      router.push('/')
    }

    const showSuccessMessage = (message, type = 'success') => {
      successMessage.value = message
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    }

    const clearSuccessMessage = () => {
      successMessage.value = ''
    }

    const loadBankAccounts = async () => {
      try {
        const result = await adminDbService.getAllBankAccounts()
        
        if (result.success) {
          bankAccounts.value = result.data
          
          // Find wereSL account and set balance
          const wereSLAccount = result.data.find(account => account.name === 'wereSL')
          if (wereSLAccount) {
            wereSLBalance.value = wereSLAccount.currentBankBalance || wereSLAccount.balance || 0
          }
        } else {
          console.error('Failed to load bank accounts:', result.message)
          bankAccounts.value = []
        }
      } catch (error) {
        console.error('Error loading bank accounts:', error)
      }
    }

    const loadTransactionHistory = async () => {
      try {
        loadingTransactions.value = true
        const transactions = await adminDbService.getWereSLTransactionHistory()
        
        if (Array.isArray(transactions)) {
          transactionHistory.value = transactions
        } else {
          transactionHistory.value = []
        }
      } catch (error) {
        console.error('Error loading transaction history:', error)
        transactionHistory.value = []
      } finally {
        loadingTransactions.value = false
      }
    }

    const startEditWereSL = () => {
      editingWereSL.value = true
      newWereSLBalance.value = wereSLBalance.value
    }

    const cancelEditWereSL = () => {
      editingWereSL.value = false
      newWereSLBalance.value = ''
    }

    const updateWereSLBalance = async () => {
      try {
        updatingWereSL.value = true
        await adminDbService.updateBankBalance('wereSL', parseFloat(newWereSLBalance.value))
        wereSLBalance.value = parseFloat(newWereSLBalance.value)
        editingWereSL.value = false
        showSuccessMessage('Budget balance updated successfully!')
        
        // Reload bank accounts to refresh the data
        await loadBankAccounts()
      } catch (error) {
        showSuccessMessage('Error updating budget balance. Please try again.', 'error')
      } finally {
        updatingWereSL.value = false
      }
    }

    const updateTransferValidation = () => {
      if (!transferFromAccount.value || !transferToAccount.value || !transferAmount.value) {
        canTransfer.value = false
        transferValidationMessage.value = ''
        return
      }

      if (transferFromAccount.value === transferToAccount.value) {
        canTransfer.value = false
        transferValidationMessage.value = 'Source and destination accounts must be different'
        transferValidationError.value = true
        return
      }

      const amount = parseFloat(transferAmount.value)
      if (isNaN(amount) || amount <= 0) {
        canTransfer.value = false
        transferValidationMessage.value = 'Please enter a valid amount'
        transferValidationError.value = true
        return
      }

      const sourceAccount = bankAccounts.value.find(acc => acc.name === transferFromAccount.value)
      if (sourceAccount && (sourceAccount.currentBankBalance || sourceAccount.balance) < amount) {
        canTransfer.value = false
        transferValidationMessage.value = 'Insufficient balance in source account'
        transferValidationError.value = true
        return
      }

      canTransfer.value = true
      transferValidationMessage.value = ''
      transferValidationError.value = false
    }

    const transferMoney = async () => {
      try {
        transferring.value = true
        await adminDbService.transferMoneyBetweenAccounts(
          transferFromAccount.value,
          transferToAccount.value,
          parseFloat(transferAmount.value)
        )
        
        // Reset form
        transferFromAccount.value = ''
        transferToAccount.value = ''
        transferAmount.value = ''
        canTransfer.value = false
        transferValidationMessage.value = ''
        
        // Reload data
        await loadBankAccounts()
        await loadTransactionHistory()
        
        showSuccessMessage('Money transferred successfully!')
      } catch (error) {
        showSuccessMessage('Error transferring money. Please try again.', 'error')
      } finally {
        transferring.value = false
      }
    }

    const toggleAccountBalances = () => {
      showAccountBalances.value = !showAccountBalances.value
    }

    const toggleTransactionHistory = async () => {
      showTransactionHistory.value = !showTransactionHistory.value
      if (showTransactionHistory.value && transactionHistory.value.length === 0) {
        await loadTransactionHistory()
      }
    }

    const filterTransactions = () => {
      // Transactions are filtered automatically via computed property
    }

    const filterTransactionsByDate = () => {
      // Transactions are filtered automatically via computed property
    }

    const getTransactionTypeLabel = (type) => {
      if (!type) return 'Unknown'
      
      switch (type) {
        case 'transfer': return 'Internal Transfer'
        case 'loan_approval': return 'Loan Approval'
        case 'payment_approval': return 'Payment Approval'
        case 'balance_update': return 'Balance Update'
        default: return type.charAt(0).toUpperCase() + type.slice(1)
      }
    }

    const getTransactionTypeClass = (type) => {
      if (!type) return 'type-unknown'
      
      switch (type) {
        case 'transfer': return 'type-internal'
        case 'loan_approval': return 'type-loan'
        case 'payment_approval': return 'type-payment'
        case 'balance_update': return 'type-update'
        default: return 'type-unknown'
      }
    }

    const getAccountFirstName = (fullName) => {
      return fullName.split(' ')[0] || fullName
    }

    const getTransactionSender = (transaction) => {
      // For different transaction types, extract sender from different fields
      if (transaction.type === 'transfer') {
        if (transaction.fromAccount) return transaction.fromAccount
        if (transaction.sourceAccount) return transaction.sourceAccount
      } else if (transaction.type === 'loan_approval') {
        // Loan approval: sourceAccount → regId (money flows from sourceAccount to regId)
        if (transaction.sourceAccount) return transaction.sourceAccount
        return 'wereSL'
      } else if (transaction.type === 'payment_approval') {
        // Payment approval: regId → receiverAccount (money flows from regId to receiverAccount)
        if (transaction.regId) return transaction.regId
        return 'wereSL'
      } else if (transaction.type === 'balance_update') {
        // Balance updates are typically to wereSL
        return 'System'
      }
      
      // Fallback to common fields
      if (transaction.fromAccount) return transaction.fromAccount
      if (transaction.sourceAccount) return transaction.sourceAccount
      if (transaction.from) return transaction.from
      if (transaction.source) return transaction.source
      
      return 'Unknown'
    }

    const getTransactionReceiver = (transaction) => {
      // For different transaction types, extract receiver from different fields
      if (transaction.type === 'transfer') {
        if (transaction.toAccount) return transaction.toAccount
        if (transaction.receiverAccount) return transaction.receiverAccount
      } else if (transaction.type === 'loan_approval') {
        // Loan approval: sourceAccount → regId (money flows from sourceAccount to regId)
        if (transaction.regId) return transaction.regId
        return 'Loan Recipient'
      } else if (transaction.type === 'payment_approval') {
        // Payment approval: regId → receiverAccount (money flows from regId to receiverAccount)
        if (transaction.receiverAccount) return transaction.receiverAccount
        return 'Payment Recipient'
      } else if (transaction.type === 'balance_update') {
        // Balance updates are typically to wereSL
        if (transaction.accountName) return transaction.accountName
        return 'wereSL'
      }
      
      // Fallback to common fields
      if (transaction.toAccount) return transaction.toAccount
      if (transaction.receiverAccount) return transaction.receiverAccount
      if (transaction.to) return transaction.to
      if (transaction.receiver) return transaction.receiver
      
      return 'Unknown'
    }

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-US').format(amount)
    }

    const formatAmountWithCommas = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-US').format(amount)
    }

    const formatAmountInMillions = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-US').format(amount)
    }

    const formatDate = (timestamp) => {
      if (!timestamp) return '-'
      
      let date;
      
      // Handle different timestamp formats
      if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } else if (timestamp && timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp) {
        date = new Date(timestamp);
      } else {
        return '-';
      }
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    const formatDateTime = (timestamp) => {
      if (!timestamp) return '-'
      
      let date;
      
      // Handle different timestamp formats
      if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } else if (timestamp && timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp) {
        date = new Date(timestamp);
      } else {
        return '-';
      }
      
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // Transaction modal functions
    const openTransactionModal = (transaction) => {
      selectedTransaction.value = transaction
      showTransactionModal.value = true
    }

    const closeTransactionModal = () => {
      showTransactionModal.value = false
      selectedTransaction.value = null
    }

    // Lifecycle
    onMounted(async () => {
      await loadBankAccounts()
      await loadTransactionHistory()
    })

    return {
      // Data
      bankAccounts,
      wereSLBalance,
      editingWereSL,
      newWereSLBalance,
      updatingWereSL,
      transferFromAccount,
      transferToAccount,
      transferAmount,
      transferring,
      transferValidationMessage,
      transferValidationError,
      canTransfer,
      showAccountBalances,
      showTransactionHistory,
      transactionHistory,
      loadingTransactions,
      transactionFilter,
      dateRange,
      successMessage,
      showTransactionModal,
      selectedTransaction,
      
      // Computed
      totalBankBalance,
      filteredTransactions,
      
      // Methods
      goBack,
      showSuccessMessage,
      clearSuccessMessage,
      loadBankAccounts,
      loadTransactionHistory,
      startEditWereSL,
      cancelEditWereSL,
      updateWereSLBalance,
      updateTransferValidation,
      transferMoney,
      toggleAccountBalances,
      toggleTransactionHistory,
      filterTransactions,
      filterTransactionsByDate,
      getTransactionTypeLabel,
      getTransactionTypeClass,
      getAccountFirstName,
      getTransactionSender,
      getTransactionReceiver,
      formatAmount,
      formatAmountWithCommas,
      formatAmountInMillions,
      formatDate,
      formatDateTime,
      openTransactionModal,
      closeTransactionModal
    }
  }
}
</script>

<style scoped>
.bank-accounts-page {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #1565c0;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #e3f2fd;
}

.page-header h1 {
  margin: 0;
  color: #1565c0;
  font-size: 20px;
  font-weight: 600;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section h3 {
  margin: 0 0 16px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c3e6cb;
}

.close-message {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #155724;
}

.wereSL-balance-form {
  margin-bottom: 16px;
}

.balance-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.balance-display:hover {
  background: #e9ecef;
}

.balance-amount {
  font-size: 24px;
  font-weight: 600;
  color: #28a745;
}

.edit-tag {
  background: #1565c0;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.balance-edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-actions {
  display: flex;
  gap: 8px;
}

.balance-change {
  font-size: 14px;
  color: #666;
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
}

.transfer-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #1565c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0d47a1;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #545b62;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #1e7e34;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-help {
  font-size: 14px;
  color: #666;
}

.form-help.error {
  color: #dc3545;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
}

.expand-icon {
  transition: transform 0.2s;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.section-content {
  margin-top: 16px;
}

.account-balances-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.account-balance-tile {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.account-name {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.account-balance {
  font-size: 18px;
  font-weight: 600;
  color: #28a745;
}

.transaction-filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.filter-select {
  flex: 1;
  min-width: 0;
}

.date-input-group {
  flex: 1;
  min-width: 0;
}

.date-input-group label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
}

.transaction-history {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.transaction-item:hover {
  background: #e9ecef;
  border-color: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.transaction-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  flex-wrap: nowrap;
  overflow: hidden;
}

.transaction-type-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  flex-shrink: 0;
}

.type-internal {
  background: #17a2b8;
}

.type-loan {
  background: #28a745;
}

.type-payment {
  background: #ffc107;
  color: #212529;
}

.type-unknown {
  background: #6c757d;
}

.type-update {
  background: #6f42c1;
}

.transaction-date {
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
  min-width: 60px;
}

.transaction-accounts {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transaction-amount {
  font-size: 14px;
  font-weight: 600;
  color: #28a745;
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
}

.transaction-regid {
  font-size: 11px;
  color: #666;
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  flex-shrink: 0;
  min-width: 50px;
  text-align: center;
}

.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.w-full {
  width: 100%;
}

.no-transactions {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
}

/* Transaction Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.transaction-modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #1565c0;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: #666;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f8f9fa;
  color: #333;
}

.modal-body {
  padding: 24px;
}

/* Transaction Type Section */
.transaction-type-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
}

.type-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  color: white;
}

.transaction-id {
  font-size: 12px;
  color: #666;
  font-family: monospace;
}

/* Money Flow Section */
.money-flow-section {
  margin-bottom: 24px;
}

.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  position: relative;
}

.account-box {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.account-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.account-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 120px;
}

.arrow-line {
  width: 60px;
  height: 2px;
  background: #1565c0;
  position: relative;
}

.arrow-head {
  width: 0;
  height: 0;
  border-left: 8px solid #1565c0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  position: absolute;
  right: 0;
  top: -5px;
}

.amount-badge {
  background: #1565c0;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.3);
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #1565c0;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.amount-value {
  color: #28a745;
  font-weight: 600;
  font-size: 16px;
}

/* Balance Changes */
.balance-changes {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.balance-changes h4 {
  margin: 0 0 16px 0;
  color: #1565c0;
  font-size: 16px;
}

.balance-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
}

.balance-label {
  font-weight: 500;
  color: #333;
}

.balance-change {
  display: flex;
  align-items: center;
  gap: 8px;
}

.previous-balance {
  color: #666;
  font-size: 14px;
}

.balance-arrow {
  color: #1565c0;
  font-weight: 600;
}

.new-balance {
  color: #28a745;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .transaction-modal {
    width: 95%;
    margin: 10px;
  }
  
  .flow-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .arrow-line {
    width: 2px;
    height: 40px;
  }
  
  .arrow-head {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #1565c0;
    border-bottom: none;
    right: -5px;
    top: 32px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>

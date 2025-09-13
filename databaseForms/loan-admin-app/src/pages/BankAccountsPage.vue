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
            <div v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item">
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
      
      console.log('🔍 Starting with', filtered.length, 'transactions');
      
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
        console.log('🔄 Loading bank accounts...')
        const result = await adminDbService.getAllBankAccounts()
        console.log('📊 Bank accounts result:', result)
        
        if (result.success) {
          bankAccounts.value = result.data
          console.log('✅ Loaded bank accounts:', result.data)
          
          // Debug: Log each bank account structure
          result.data.forEach((account, index) => {
            console.log(`🏦 Bank account ${index}:`, account)
            console.log(`   - name: ${account.name}`)
            console.log(`   - currentBankBalance: ${account.currentBankBalance}`)
            console.log(`   - balance: ${account.balance}`)
            console.log(`   - All fields:`, Object.keys(account))
          })
          
          // Find wereSL account and set balance
          const wereSLAccount = result.data.find(account => account.name === 'wereSL')
          if (wereSLAccount) {
            wereSLBalance.value = wereSLAccount.currentBankBalance || wereSLAccount.balance || 0
            console.log('💰 wereSL balance:', wereSLBalance.value)
          } else {
            console.log('⚠️ wereSL account not found')
          }
        } else {
          console.error('❌ Failed to load bank accounts:', result.message)
          bankAccounts.value = []
        }
      } catch (error) {
        console.error('❌ Error loading bank accounts:', error)
      }
    }

    const loadTransactionHistory = async () => {
      try {
        console.log('🔄 Loading transaction history...')
        loadingTransactions.value = true
        const transactions = await adminDbService.getWereSLTransactionHistory()
        console.log('📊 Transaction history result:', transactions)
        
        if (Array.isArray(transactions)) {
          transactionHistory.value = transactions
          console.log('✅ Loaded transactions:', transactions.length, 'transactions')
          if (transactions.length > 0) {
            console.log('🔍 Sample transaction:', transactions[0])
            
            // Debug: Log all unique transaction types
            const types = [...new Set(transactions.map(t => t.type))]
            console.log('🏷️ Available transaction types:', types)
            
            // Debug: Log sample transactions of each type
            types.forEach(type => {
              const sampleOfType = transactions.find(t => t.type === type)
              if (sampleOfType) {
                console.log(`🔍 Sample of type '${type}':`, sampleOfType)
              }
            })
          }
        } else {
          console.log('⚠️ Transactions is not an array:', typeof transactions, transactions)
          transactionHistory.value = []
        }
      } catch (error) {
        console.error('❌ Error loading transaction history:', error)
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
        // Loan approvals typically come from wereSL
        return 'wereSL'
      } else if (transaction.type === 'payment_approval') {
        // Payment approvals typically come from wereSL
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
        // Show regID directly for loan approvals
        if (transaction.regId) return transaction.regId
        return 'Loan Recipient'
      } else if (transaction.type === 'payment_approval') {
        // Show regID directly for payment approvals
        if (transaction.regId) return transaction.regId
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
      formatDate
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
</style>

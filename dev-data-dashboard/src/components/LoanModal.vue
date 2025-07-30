<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 sm:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            Loan Information - {{ document?.Name || 'Profile' }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Loading loan information...</span>
          </div>
        </div>

        <!-- Loan Information -->
        <div v-else class="space-y-6">
          <!-- Profile Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-2">Profile Information</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div><span class="font-medium">Name:</span> {{ document?.Name || 'N/A' }}</div>
              <div><span class="font-medium">Reg ID:</span> {{ document?.Reg_ID || 'N/A' }}</div>
              <div><span class="font-medium">NIC:</span> {{ document?.NIC || 'N/A' }}</div>
              <div><span class="font-medium">District:</span> {{ document?.District || 'N/A' }}</div>
            </div>
          </div>

          <!-- RF Loans Section -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900 border-b border-gray-200 pb-2">RF Loans</h4>
            
            <div v-if="rfLoans.length > 0" class="space-y-3">
              <div v-for="loan in rfLoans" :key="loan.id" class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start mb-3">
                  <h5 class="font-medium text-gray-900">{{ loan.purpose || 'RF Loan' }}</h5>
                  <div class="flex items-center gap-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      loan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    ]">
                      {{ loan.status }}
                    </span>
                    <button
                      v-if="loan.status === 'active'"
                      @click="editLoan(loan)"
                      class="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Initial Amount:</span>
                    <div class="text-gray-900">LKR {{ formatCurrency(loan.amount) }}</div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Current Balance:</span>
                    <div class="text-gray-900">LKR {{ formatCurrency(loan.currentBalance) }}</div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Initiation Date:</span>
                    <div class="text-gray-900">{{ formatDate(loan.initiationDate) }}</div>
                  </div>
                </div>
                
                <div v-if="loan.description" class="mt-3 pt-3 border-t border-gray-100">
                  <span class="font-medium text-gray-700">Description:</span>
                  <div class="text-gray-900 mt-1">{{ loan.description }}</div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              No RF loans found
            </div>
          </div>

          <!-- GRANT Loans Section -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900 border-b border-gray-200 pb-2">GRANT Loans</h4>
            
            <div v-if="grantLoans.length > 0" class="space-y-3">
              <div v-for="loan in grantLoans" :key="loan.id" class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start mb-3">
                  <h5 class="font-medium text-gray-900">{{ loan.purpose || 'GRANT Loan' }}</h5>
                  <div class="flex items-center gap-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      loan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    ]">
                      {{ loan.status }}
                    </span>
                    <button
                      v-if="loan.status === 'active'"
                      @click="editLoan(loan)"
                      class="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Initial Amount:</span>
                    <div class="text-gray-900">LKR {{ formatCurrency(loan.amount) }}</div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Current Balance:</span>
                    <div class="text-gray-900">LKR {{ formatCurrency(loan.currentBalance) }}</div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Initiation Date:</span>
                    <div class="text-gray-900">{{ formatDate(loan.initiationDate) }}</div>
                  </div>
                </div>
                
                <div v-if="loan.description" class="mt-3 pt-3 border-t border-gray-100">
                  <span class="font-medium text-gray-700">Description:</span>
                  <div class="text-gray-900 mt-1">{{ loan.description }}</div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              No GRANT loans found
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-2">Summary</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700">Total RF Loans:</span>
                <div class="text-gray-900">{{ rfLoans.length }}</div>
              </div>
              <div>
                <span class="font-medium text-gray-700">Total GRANT Loans:</span>
                <div class="text-gray-900">{{ grantLoans.length }}</div>
              </div>
              <div>
                <span class="font-medium text-gray-700">Total Balance:</span>
                <div class="text-gray-900">LKR {{ formatCurrency(totalBalance) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-4 mt-6">
          <button
            @click="closeModal"
            class="btn btn-secondary w-full sm:w-auto px-6 py-3 text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Loan Modal -->
    <div v-if="showEditLoanModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 sm:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Edit Loan - {{ editingLoan?.purpose || 'Loan' }}
            </h3>
            <button
              @click="closeEditLoanModal"
              class="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="saving" class="text-center py-4">
            <div class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-gray-600">Saving...</span>
            </div>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="saveLoan" class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="loanAmount" class="block text-sm font-medium text-gray-700 mb-2">
                  Initial Amount (LKR) *
                </label>
                <input
                  id="loanAmount"
                  v-model.number="editForm.amount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="input w-full text-base"
                  :class="{ 'border-red-300': amountError }"
                  required
                  @input="validateAmount"
                />
                <p v-if="amountError" class="text-red-600 text-sm mt-1">{{ amountError }}</p>
                <p class="text-gray-500 text-sm mt-1">
                  Current Balance: LKR {{ formatCurrency(editingLoan?.currentBalance || 0) }}
                </p>
              </div>

              <div>
                <label for="loanDate" class="block text-sm font-medium text-gray-700 mb-2">
                  Initiation Date *
                </label>
                <input
                  id="loanDate"
                  v-model="editForm.initiationDate"
                  type="date"
                  class="input w-full text-base"
                  required
                />
              </div>

              <div>
                <label for="loanDescription" class="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="loanDescription"
                  v-model="editForm.description"
                  rows="3"
                  class="input w-full text-base"
                  placeholder="Enter loan description..."
                ></textarea>
              </div>
            </div>

            <!-- Success/Error Messages -->
            <div v-if="message" class="p-3 rounded-md" :class="messageClass">
              {{ message }}
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                @click="closeEditLoanModal"
                class="btn btn-secondary w-full sm:w-auto px-6 py-3 text-base"
                :disabled="saving"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary w-full sm:w-auto px-6 py-3 text-base"
                :disabled="saving || amountError"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firestoreService from '../services/firestoreService.js';

export default {
  name: 'LoanModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    document: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      saving: false,
      rfLoans: [],
      grantLoans: [],
      showEditLoanModal: false,
      editingLoan: null,
      editForm: {
        amount: 0,
        initiationDate: '',
        description: ''
      },
      amountError: '',
      message: '',
      messageType: ''
    }
  },
  computed: {
    totalBalance() {
      const allLoans = [...this.rfLoans, ...this.grantLoans];
      return allLoans.reduce((sum, loan) => sum + (loan.currentBalance || 0), 0);
    },
    messageClass() {
      return {
        'bg-green-50 text-green-800 border border-green-200': this.messageType === 'success',
        'bg-red-50 text-red-800 border border-red-200': this.messageType === 'error'
      }
    }
  },
  watch: {
    document: {
      handler(newDoc) {
        if (newDoc && this.show) {
          this.loadLoans();
        }
      },
      immediate: true
    },
    show(newVal) {
      if (newVal && this.document) {
        this.loadLoans();
      }
    }
  },
  methods: {
    async loadLoans() {
      if (!this.document?.Reg_ID) return;
      
      this.loading = true;
      try {
        const loans = await firestoreService.getLoans(this.document.Reg_ID);
        
        // Separate RF and GRANT loans
        this.rfLoans = loans
          .filter(loan => loan.type === 'RF')
          .sort((a, b) => {
            const dateA = a.initiationDate?.toDate?.() || new Date(a.initiationDate);
            const dateB = b.initiationDate?.toDate?.() || new Date(b.initiationDate);
            return dateA - dateB;
          });
          
        this.grantLoans = loans
          .filter(loan => loan.type === 'GRANT')
          .sort((a, b) => {
            const dateA = a.initiationDate?.toDate?.() || new Date(a.initiationDate);
            const dateB = b.initiationDate?.toDate?.() || new Date(b.initiationDate);
            return dateA - dateB;
          });
          
        console.log('Loans loaded:', { rfLoans: this.rfLoans, grantLoans: this.grantLoans });
      } catch (error) {
        console.error('Error loading loans:', error);
      } finally {
        this.loading = false;
      }
    },
    editLoan(loan) {
      console.log('Editing loan:', loan);
      this.editingLoan = loan;
      this.editForm = {
        amount: loan.amount || 0,
        initiationDate: this.formatDateForInput(loan.initiationDate),
        description: loan.description || ''
      };
      this.amountError = '';
      this.message = '';
      this.showEditLoanModal = true;
    },
    closeEditLoanModal() {
      this.showEditLoanModal = false;
      this.editingLoan = null;
      this.editForm = {
        amount: 0,
        initiationDate: '',
        description: ''
      };
      this.amountError = '';
      this.message = '';
    },
    validateAmount() {
      const currentBalance = this.editingLoan?.currentBalance || 0;
      const newAmount = parseFloat(this.editForm.amount);
      
      if (newAmount < currentBalance) {
        this.amountError = `New amount (LKR ${this.formatCurrency(newAmount)}) cannot be less than current balance (LKR ${this.formatCurrency(currentBalance)})`;
        return false;
      } else {
        this.amountError = '';
        return true;
      }
    },
    async saveLoan() {
      if (!this.validateAmount()) {
        return;
      }
      
      this.saving = true;
      this.message = '';
      
      try {
        const updateData = {
          amount: parseFloat(this.editForm.amount),
          initiationDate: new Date(this.editForm.initiationDate),
          description: this.editForm.description.trim() || null
        };
        
        await firestoreService.updateLoan(
          this.document.Reg_ID,
          this.editingLoan.id,
          this.editingLoan.type,
          updateData
        );
        
        this.message = 'Loan updated successfully!';
        this.messageType = 'success';
        
        // Reload loans to get updated data
        await this.loadLoans();
        
        // Close modal after a short delay
        setTimeout(() => {
          this.closeEditLoanModal();
        }, 1500);
        
      } catch (error) {
        console.error('Error updating loan:', error);
        this.message = error.message || 'Error updating loan. Please try again.';
        this.messageType = 'error';
      } finally {
        this.saving = false;
      }
    },
    closeModal() {
      this.$emit('close');
    },
    formatCurrency(amount) {
      if (!amount) return '0.00';
      return parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    formatDateForInput(timestamp) {
      if (!timestamp) return '';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toISOString().split('T')[0];
    }
  }
}
</script> 
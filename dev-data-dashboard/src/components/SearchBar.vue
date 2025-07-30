<template>
  <div class="card p-4 sm:p-6 mb-6">
    <div class="space-y-4">
      <!-- Search Input -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Search Profiles
        </label>
        <div class="relative">
          <input
            id="search"
            v-model="searchTerm"
            @input="handleSearch"
            type="text"
            placeholder="Search by name, NIC, or Reg ID..."
            class="input pr-10 w-full text-base"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- District Filter -->
      <div>
        <label for="district" class="block text-sm font-medium text-gray-700 mb-2">
          Filter by District
        </label>
        <select
          id="district"
          v-model="selectedDistrict"
          @change="handleDistrictChange"
          class="input w-full text-base"
        >
          <option value="">All Districts</option>
          <option v-for="district in districts" :key="district" :value="district">
            {{ district }}
          </option>
        </select>
      </div>

      <!-- Clear Button -->
      <div class="flex justify-center sm:justify-start">
        <button
          @click="clearSearch"
          class="btn btn-secondary w-full sm:w-auto px-6 py-2 text-base"
          :disabled="!searchTerm && !selectedDistrict"
        >
          Clear Search
        </button>
      </div>
    </div>

    <!-- Search Info -->
    <div v-if="searchTerm || selectedDistrict" class="mt-4 p-3 bg-blue-50 rounded-md">
      <div class="text-sm text-blue-800">
        <span v-if="searchTerm">Searching for: "{{ searchTerm }}"</span>
        <span v-if="searchTerm && selectedDistrict"> and </span>
        <span v-if="selectedDistrict">District: "{{ selectedDistrict }}"</span>
        <span> in profiles</span>
      </div>
    </div>
  </div>
</template>

<script>
import firestoreService from '../services/firestoreService.js';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: '',
      selectedDistrict: '',
      districts: firestoreService.getDistricts()
    }
  },
  methods: {
    handleSearch() {
      console.log('SearchBar: Search term changed to:', this.searchTerm);
      this.$emit('search', this.searchTerm, this.selectedDistrict);
    },
    handleDistrictChange() {
      console.log('SearchBar: District changed to:', this.selectedDistrict);
      this.$emit('search', this.searchTerm, this.selectedDistrict);
    },
    clearSearch() {
      console.log('SearchBar: Clearing search and filters');
      this.searchTerm = '';
      this.selectedDistrict = '';
      this.$emit('search', '', '');
    }
  }
}
</script> 
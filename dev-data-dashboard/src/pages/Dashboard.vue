<template>
  <div class="dashboard">
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Database Explorer
      </h1>
      <p class="text-gray-600">
        Explore your Firebase database structure dynamically. Navigate through collections, documents, and subcollections.
      </p>
    </div>

    <!-- Database Explorer Component -->
    <DatabaseExplorer />
  </div>
</template>

<script setup>
import DatabaseExplorer from '../components/DatabaseExplorer.vue'
</script>

<style scoped>
.dashboard {
  @apply w-full;
}
</style> 
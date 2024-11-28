<script setup>
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()
</script>

<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <div class="flex-1 min-w-[200px]">
      <input
        v-model="dataStore.searchInput"
        placeholder="Search Tasks"
        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="flex-1 min-w-[200px]">
      <select
        v-model="dataStore.authorFilterValue"
        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option selected value="All authors">All Authors</option>
        <option v-for="author in dataStore.authorsById">{{ author }}</option>
      </select>
    </div>
  </div>
</template>

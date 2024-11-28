<script setup>
const props = defineProps({
  tasksData: Object,
  author: String,
})
</script>

<template>
  <div class="bg-white shadow-md border border-gray-300 rounded-lg p-4">
    <h6 class="text-lg font-bold text-gray-800">{{ tasksData.id }}. {{ tasksData.title }}</h6>
    <h6 class="text-gray-600"><span class="font-bold text-gray-700">Author:</span> {{ author }}</h6>
  </div>
</template>

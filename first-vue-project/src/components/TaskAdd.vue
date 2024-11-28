<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataStore'
const dataStore = useDataStore()

const newTaskTitle = ref('')
const newTaskAuthorId = ref('')

function addNewTask(event) {
  if (newTaskTitle.value && newTaskAuthorId.value) {
    dataStore.addTask(newTaskTitle.value, newTaskAuthorId.value)
    newTaskTitle.value = ''
    newTaskAuthorId.value = ''
  }
}

function handleAuthorInput(event) {
  newTaskAuthorId.value = event.target.value
}
</script>

<template>
  <div class="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-700">Add New Task</h2>
    <form @submit.prevent="addNewTask" class="flex flex-col gap-4">
      <input
        v-model="newTaskTitle"
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Task Title"
      />
      <select
        @change="handleAuthorInput"
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option selected disabled>Select Author</option>
        <option v-for="(name, id) in dataStore.authorsById" :key="id" :value="id">
          {{ name }}
        </option>
      </select>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Add Task
      </button>
    </form>
  </div>
</template>

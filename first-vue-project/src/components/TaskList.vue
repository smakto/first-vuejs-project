<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import Task from './Task.vue'
import TaskFilter from './TaskFilter.vue'
import TaskAdd from './TaskAdd.vue'

const dataStore = useDataStore()

const draggedTask = ref(null)

function handleDragStart(task) {
  draggedTask.value = task
}

function handleDrop(columnName) {
  if (draggedTask.value) {
    dataStore.updateTaskColumn(draggedTask.value.id, columnName)
    draggedTask.value = null
  }
}

function handleDragOver(event) {
  event.preventDefault()
}

onMounted(() => {
  dataStore.fetchData()
})
</script>

<template>
  <header class="mb-8">
    <TaskAdd />
    <TaskFilter />
  </header>

  <main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="colName in dataStore.columns"
      :key="colName"
      class="bg-gray-50 shadow-lg rounded-lg p-4 border border-gray-300"
      @dragover="handleDragOver"
      @drop="handleDrop(colName)"
    >
      <h2 class="text-lg font-semibold text-center mb-4 text-gray-700">
        {{ colName }}
      </h2>
      <ul class="space-y-3">
        <Task
          v-for="task in dataStore.tasksByColumn[colName]"
          :key="task.id"
          :tasksData="task"
          :author="dataStore.authorsById[task.author_id]"
          draggable="true"
          @dragstart="handleDragStart(task)"
        />
      </ul>
    </div>
  </main>
</template>

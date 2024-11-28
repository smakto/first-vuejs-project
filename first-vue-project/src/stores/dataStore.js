import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useDataStore = defineStore('data', () => {
  const fetchedData = ref(null)
  const authors = ref([])
  const columns = ref([])
  const tasks = ref([])
  const searchInput = ref('')
  const newTaskId = ref(101)
  const authorFilterValue = ref('All authors')

  async function fetchData() {
    try {
      const response = await axios.get('/api/frontend-task-data.json')
      fetchedData.value = response.data
      authors.value = fetchedData.value.authors
      columns.value = fetchedData.value.columns
      tasks.value = fetchedData.value.tasks
    } catch (error) {
      console.log('Error fetching data:', error.message)
    }
  }

  function addTask(title, authorId) {
    tasks.value.push({
      id: newTaskId.value,
      title,
      author_id: authorId,
      current_column: 'To do',
    })
    newTaskId.value++
  }

  function updateTaskColumn(taskId, columnName) {
    const task = tasks.value.find((task) => task.id === taskId)
    if (task) task.current_column = columnName
  }

  const authorsById = computed(() => {
    return authors.value.reduce((acc, author) => {
      acc[author.id] = author.display_name
      return acc
    }, {})
  })

  const filteredTasks = computed(() => {
    return tasks.value.filter((task) =>
      task.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    )
  })

  const tasksByColumn = computed(() => {
    const sourceTasks = searchInput.value.length > 0 ? filteredTasks.value : tasks.value

    const filteredByAuthor =
      authorFilterValue.value === 'All authors'
        ? sourceTasks
        : sourceTasks.filter((task) => {
            const authorName = authorsById.value[task.author_id]
            return authorName === authorFilterValue.value
          })

    return columns.value.reduce((acc, columnName) => {
      acc[columnName] = filteredByAuthor.filter((task) => task.current_column === columnName)
      return acc
    }, {})
  })

  return {
    authors,
    columns,
    tasks,
    searchInput,
    newTaskId,
    authorFilterValue,

    fetchData,
    addTask,
    updateTaskColumn,

    authorsById,
    tasksByColumn,
    filteredTasks,
  }
})

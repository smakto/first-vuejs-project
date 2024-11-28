// Import Vue and App component
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
const pinia = createPinia()

// Create the Vue app and mount it to the #app div in index.html
createApp(App).use(pinia).mount('#app')

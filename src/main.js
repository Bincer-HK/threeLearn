import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import "@/assets/css/tailwindcss/tailwindcss.css"

createApp(App).use(router).mount('#app')

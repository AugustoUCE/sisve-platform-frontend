import './assets/styles/global.css'
import './assets/styles/colors.css'
import { createPinia } from "pinia";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import "./css/tailwind.css";
createApp(App).use(createPinia()).use(router).mount('#app')


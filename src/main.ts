import { createApp } from "vue";

import App from './App.vue'
import router from './router'
// 引入pinia
import { createPinia } from 'pinia'

const app = createApp(App)
// 创建pinia
const pinia = createPinia()
// 安装pinia
app.use(pinia)
app.use(router)
app.mount('#app')
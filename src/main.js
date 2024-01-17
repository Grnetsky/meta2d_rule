import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css';
import router from "./router/index.js";

const app = createApp(App)
app.use(router)
app.mount('#app')
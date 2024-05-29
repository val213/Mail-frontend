import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import axios from "axios";


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/4519450-4166923-default';

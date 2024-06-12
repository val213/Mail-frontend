import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import axios from "axios";
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
});
app.mount('#app')

axios.defaults.baseURL = 'http://127.0.0.1:8080';

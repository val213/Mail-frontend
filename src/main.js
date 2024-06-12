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
axios.interceptors.request.use(
    config => {
      // 假设usertoken存储在localStorage中，你可以根据你的应用需求调整获取方式
        const usertoken = localStorage.getItem('userToken');
        if (usertoken) {
        config.headers['Authorization'] = `Bearer ${usertoken}`;
        }
        return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
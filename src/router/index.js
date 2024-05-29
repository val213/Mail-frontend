import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "@/Page/LoginPage.vue";
import SignUpPage from "@/Page/SignUpPage.vue";
import MainPage from "@/Page/MainPage.vue";





const routerHistory = createWebHistory()

const constantRoutes = [
    {
       path:'/',
        component:MainPage
    },
    {
        path:'/Login',
        name:'Login',
        component:LoginPage

    },
    {
        path:'/SignUp',
        name:'SignUp',
        component:SignUpPage


    },


]


let router = createRouter({
    history: routerHistory,
    routes:constantRoutes,
})

export default  router

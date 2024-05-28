import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/Page/MainView.vue";
import Login from "@/components/Login.vue";



const routerHistory = createWebHistory()

const constantRoutes = [
    {
       path:'/',
        component:MainView
    },
    {
        path:'/Login',
        component:Login

    },

]


let router = createRouter({
    history: routerHistory,
    routes:constantRoutes,
})

export default  router

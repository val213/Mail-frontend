import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "@/Page/LoginPage.vue";
import SignUpPage from "@/Page/SignUpPage.vue";
import MainPage from "@/Page/MainPage.vue";
import writeEmail from "@/components/writeEmail.vue";
import EmailHaveReceived from "@/components/EmailHaveReceived.vue";
import EmailHaveSent from "@/components/EmailHaveSent.vue";
import DraftBox from "@/components/DraftBox.vue";
import StarEmail from "@/components/StarEmail.vue";
import JunkMailBox from "@/components/JunkMailBox.vue";
import UserProfile from "@/components/UserProfile.vue";





const routerHistory = createWebHistory()

const constantRoutes = [
    {
        path:'/',
        component:MainPage
    },
    {
        path:'/Login',
        component:LoginPage
    },
    {
        path:'/SignUp',
        component:SignUpPage
    },
    {
        path:'/writeEmail',
        component:writeEmail
    },
    {
        path:'/EmailHaveReceived',
        component:EmailHaveReceived
    },
    {
        path:'/EmailHaveSent',
        component:EmailHaveSent

    },
    {
        path:'/DraftBox',
        component:DraftBox

    },
    {
        path:'/StarEmail',
        component:StarEmail

    },
    {
        path:"/JunkMailBox",
        component:JunkMailBox
    },
    {
        path:'/UserProfile',
        component:UserProfile

    }

]


let router = createRouter({
    history: routerHistory,
    routes:constantRoutes,
})

export default  router

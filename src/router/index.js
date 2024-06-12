import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "@/Page/LoginPage.vue";
import SignUpPage from "@/Page/SignUpPage.vue";
import MainPage from "@/Page/MainPage.vue";
import writeEmail from "@/components/writeEmail.vue";
import EmailHaveReceived from "@/Page/EmailHaveReceived.vue";
import EmailHaveSent from "@/Page/EmailHaveSent.vue";
import DraftBox from "@/Page/DraftBox.vue";
import StarEmail from "@/Page/StarEmail.vue";
import JunkMailBox from "@/Page/JunkMailBox.vue";
import UserProfile from "@/components/UserProfile.vue";
import MailDetail from "@/components/MailDetail.vue";




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

    },
    {
        path: '/mail/:mailId',
        name: 'MailDetail',
        component: MailDetail
    },

]


let router = createRouter({
    history: routerHistory,
    routes:constantRoutes,
})

export default  router

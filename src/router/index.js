import {createRouter, createWebHistory} from 'vue-router'
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
        path: '/',
        components: {top: LoginPage},
    },
    {
        path: '/Signup',
        name: 'SignUp',
        components: {top: SignUpPage}
    },
    {
        path: '/Login',
        name: 'Login',
        components: {top: LoginPage}
    },
    {
        path: '/MainPage',
        components: {top: MainPage},
        children: [
            {
                path: '',
                components:
                    {Main: EmailHaveReceived,}
            },
            {
                path: 'writeEmail',
                name: 'writeEmail',
                components:
                    {Main: writeEmail,}
            },
            {
                path: 'EmailHaveReceived',
                name: 'EmailHaveReceived',
                components: {Main: EmailHaveReceived,}
            },
            {
                path: 'EmailHaveSent',
                name: "EmailHaveSent",
                components: {Main: EmailHaveSent,}
            },
            {
                path: 'DraftBox', name: "DraftBox",
                components: {Main: DraftBox,}
            },
            {
                path: 'StarEmail', name: "StarEmail",
                components: {Main: StarEmail,}
            },
            {
                path: "JunkMailBox", name: "JunkMailBox",
                components: {Main: JunkMailBox,}
            },

            {
                path: 'UserProfile', name: 'UserProfile',
                components: {Main: UserProfile}
            },
            {
                path: 'mail/:mailId',
                name: 'MailDetail',
                components: {Main: MailDetail}
            },
        ],
    },
]
let router = createRouter({
    history: routerHistory,
    routes: constantRoutes,
})
export default router

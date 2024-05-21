import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";

const router=createRouter({
history:createWebHistory(import.meta.env.BASE_URL),
//保存了路由跳转的历史，用push进行路由跳转时历史里会增加相应的信息，用replace会替换掉当前路由在路由历史中的位置
router:[

    {
        path:'/',
        name:'WelcomePage',
        component:{WelcomePage:HelloWorld}


    }







  ]
})
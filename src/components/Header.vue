<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="header">
        <!-- 横幅或导航栏内容 -->
        <img class="logo" src="@/assets/logo.png" alt="Logo">
        <el-input class="search" v-model="searchText" placeholder="搜索邮件"></el-input>
        <el-avatar class="avatar" @click="clickonUser" src="el-icon-user-solid"></el-avatar>
    </header>
    <el-descriptions class="info">
            <el-descriptions-item label=" 云信Mail ">
            <el-tag size="small"> betav0.1.0 </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label=" 当前用户 ">
            <el-tag size="small"  v-if="username"> {{username}} </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label=" 邮箱地址 ">
            <el-tag size="small"  v-if="address"> {{address}} </el-tag>
            </el-descriptions-item>
        </el-descriptions>
</template>
<script>
    import router from '@/router/index.js'
import emitter from '@/services/event_bus.js'
    export default {
        data() {
            return {
                searchText: '',
                username: '',
                address: '',
            };
        },
        methods: {
            clickonUser()
            {
                router.push({name:'UserProfile'})
            },
            getUsername() {
            // 检查localStorage是否可用
            if (typeof localStorage !== 'undefined') {
                console.log(localStorage.getItem('username'));
                return localStorage.getItem('username');
            }
            return "未登录";
            },
            getEmailAddress() {
                // 检查localStorage是否可用
                if (typeof localStorage !== 'undefined') {
                    console.log(localStorage.getItem('emailAddress'));
                    return localStorage.getItem('emailAddress');
                }
                return "未登录";
            },
    },
    mounted() {
        this.username = this.getUsername();
        this.address = this.getEmailAddress();
        
        },
        created()
        {
            emitter.on('refreshing',(data)=>{
                if(data){
                 
                 this.   imageurl=localStorage.getItem(localStorage.getItem('userId'))
                }
                
                
            })
            
        },
        data() {
        return {
            searchText: '',
            imageurl:localStorage.getItem(localStorage.getItem('userId'))
        };
    }
    }
</script>
<style scoped>
    .header
    {
        height: 80px;
        background: linear-gradient(90deg, #cbe6ff,#ffffff);
        display: flex;
        align-items: center;
        justify-content: center;
        /* border-color: black;
        border-width: 5px;
        border-style: solid; */
    }
    
    .avatar
    {
        margin-left: auto;
        cursor: pointer;
    }

    .logo
    {
        height: 150px;
    }

    .search
    {
        flex-grow: 0;
        width: 1000px;
        margin: 0 20px;
    }
    .info {
        display: block; /* 确保el-descriptions独占一行 */
        clear: both; /* 如果之前的元素使用了float，这可以帮助清除浮动 */
        width: 100%; /* 可选，确保占满整行 */
        margin-top: 10px;
    }
</style>
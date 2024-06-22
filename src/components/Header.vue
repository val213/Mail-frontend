<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="header">
        <!-- 横幅或导航栏内容 -->
        <img class="logo" src="@/assets/logo.png" alt="Logo">
        <el-input class="search" v-model="searchText" placeholder="搜索邮件"></el-input>
        <el-avatar class="avatar" @click="clickonUser" :src="imageurl"></el-avatar>
    </header>
</template>
<script>
    import router from '@/router/index.js'
import emitter from '@/services/event_bus.js'
    export default {
        
    
        
        methods: {
            clickonUser()
            {
                router.push({name:'UserProfile'})
            },
            
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
</style>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="header">
        <!-- 横幅或导航栏内容 -->
        <img class="logo" src="@/assets/logo.png" alt="Logo">
        <!-- <el-input class="search" v-model="searchText" placeholder="搜索邮件" @input="searchEmails"></el-input> -->
        <el-autocomplete  
            v-model="searchText"  
            :fetch-suggestions="querySearch"  
            placeholder="请输入内容"  
            @select="handleSelect"  
        >  
        </el-autocomplete>
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
    import axios from 'axios'
    export default {
        data() {
            return {
                searchText: '',
                username: '',
                address: '',
                searchText: '',
                allEmails: [],  
                // filteredEmails: [], // 用于存储过滤后的邮件列表  
            };
        },
        methods: {
            clickonUser()
            {
                router.push({name:'UserProfile'})
            },
            querySearch(queryString, cb) {  
                const results = this.allEmails.filter(email =>  
                    email.subject.toLowerCase().includes(queryString.toLowerCase())  
                );  
                    
                // 调用 callback 返回建议列表的数据  
                cb(results);  
            },  
            handleSelect(item) {  
                // 这里处理选择后的操作
                console.log(item);  
            },  
            fetchEmails(path) {  
                let postData = {
                    "type": null, // 1 或者 2，取决于你是想按发送者还是接收者查询
                    "userId": 7,//怎么获取？？？？？？？
                    "pageNumber": 1, // 页码
                    "pageSize": 10000 ,// 每页显示的记录数
                    "star": null,
                    "readis": null,
                    "draft": null
                };
    
                // 根据路由的不同设置readis的值  
                if (path === '/MainPage/EmailHaveSent') {  
                    postData.type = 1; 
                } 
                else if (path === '/MainPage/EmailHaveReceived') {  
                    postData.type = 2; 
                } 
                else if (path === '/MainPage/StarEmail') {  
                    postData.star = 1;
                } 
                else if (path === '/MainPage/DraftBox') {  
                    postData.draft = 1;
                }
    
                // 发送POST请求  
                axios.post('/mail/view', postData)
                    .then(response => {  
                        this.allEmails = response.data.data.records;
                    })  
                    .catch(error => {  
                        console.error(error);  
                    });  
            }
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
        watch: {  
            '$route'(to) { // 监听路由变化  
                this.fetchEmails(to.path);  
            }  
        },  
        created() {  
            // 在组件创建时获取邮件  
            this.fetchEmails(this.$route.path);  
        },
        mounted() {
            this.username = this.getUsername();
            this.address = this.getEmailAddress();
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
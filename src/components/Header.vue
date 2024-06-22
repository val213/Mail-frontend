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
    import emitter from '@/services/event_bus.js'
    export default {
        data() {
            return {
                searchText: '',
                username: '',
                address: '',
                allEmails: [],  
                // filteredEmails: [], // 用于存储过滤后的邮件列表  
               
                imageurl:localStorage.getItem(localStorage.getItem('userId'))
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
            handleSelect(row) {  
                // 这里处理选择后的操作，待完善
                console.log(row);  
                router.push({name: 'MailDetail', params: {mailId: row.id}});
                if (row.read == 0 || row.read == null)
                {
                    const mailId = row.id
                    this.setMailRead(mailId);
                }
            },  
            fetchEmails() {  
                let emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`));//获取全部邮件
                //这里对缓存里的进行过滤，以显示需要的
                let emailfordifferenttype=[]
                
                for(let i =0;i<emails.length;i++)
                {
                    /*console.log(JSON.parse(localStorage.getItem('用户信息')).username,emails[i].senderUsername,emails[i].receiverUsername)*/
                    if(this.star===1&&emails[i].star===1)
                    {
                        emailfordifferenttype.push(emails[i])
                    }else
                        if(this.type===1&&emails[i].senderUsername===localStorage.getItem(`${localStorage.getItem('userId')}username`)){
                        
                         emailfordifferenttype.push(emails[i])
                    }else
                        if(this.type===2&&emails[i].receiverUsername===localStorage.getItem(`${localStorage.getItem('userId')}username`)){
                         
                         emailfordifferenttype.push(emails[i])
                    }else if(this.draft===1&&emails[i].draft===1)
                        {
                            emailfordifferenttype.push(emails[i])
                        }
                    
                } this.total = emailfordifferenttype.length
                this.allEmails = []
                for(let i =0;i<this.total;i++)
                {
                    if (emailfordifferenttype[i])
                    {
                        this.allEmails.push(emailfordifferenttype[i])
                    }
                }
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
        watch: {  
            '$route'() { // 监听路由变化  
                this.fetchEmails();  
            }  
        },  
        created() {  
            // 在组件创建时获取邮件  
            this.fetchEmails();  

            emitter.on('refreshing',(data)=>{
                if(data){
                 
                 this.   imageurl=localStorage.getItem(localStorage.getItem('userId'))
                }
                
                
            })
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
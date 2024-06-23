<template>
    <header class="header">
        <!-- 横幅或导航栏内容 -->
        <img class="logo" src="@/assets/logo.png" alt="Logo">
        <!-- <el-input class="search" v-model="searchText" placeholder="搜索邮件" @input="searchEmails"></el-input> -->
        <div style="margin-top: 0 ;position: absolute;width:70%;align-items: center">
            <input type="text" id="searchInput" v-model="searchText" style="width:50%;height:30px" @focus="show=true"
                   @blur="show=false" @input="dealwiththeinput" placeholder="在这里搜索邮件">
            <table style="
  position: absolute;
  background-color: #f9f9f9;
  width: 50%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;" v-if="show">
                <tr v-for="item in this.thelisttoshow" :key="item.id">
                    <td>{{ item.senderUsername }}</td>
                    <td>{{ item.receiverUserName }}</td>
                    <td>{{ item.theme }}</td>
                    <!-- 更多的列 -->
                </tr>
            </table>
        </div>
        <el-avatar class="avatar" @click="clickonUser" :src="imageurl"></el-avatar>
    </header>
    <el-descriptions class="info">
        <el-descriptions-item label=" 云信Mail ">
            <el-tag size="small"> betav0.1.0</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label=" 当前用户 ">
            <el-tag size="small" v-if="username"> {{ username }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label=" 邮箱地址 ">
            <el-tag size="small" v-if="address"> {{ address }}</el-tag>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script>
    import router from '@/router/index.js';
    import emitter from '@/services/event_bus.js';
    
    export default {
        name: 'HEAdER',
        data()
        {
            return {
                show: false,
                searchText: '',
                allEmails: JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`)),
                thelisttoshow: [],
                filteredEmails: [],
                imageurl: localStorage.getItem(localStorage.getItem('userId')),
                username: localStorage.getItem(`${localStorage.getItem('userId')}username`),
                address: localStorage.getItem(`${localStorage.getItem('userId')}emailAddress`)
            };
        },
        methods: {
            querySearch(queryString, cb)
            {
                const results = queryString
                    ? this.allEmails.filter(this.createFilter(queryString))
                    : this.filteredEmails;
                cb(results);
            },
            createFilter(queryString)
            {
                return (email) =>
                {
                    return (
                        email.subject.toLowerCase().includes(queryString.toLowerCase()) ||
                        email.from.toLowerCase().includes(queryString.toLowerCase())
                    );
                };
            },
            clickonUser()
            {
                router.push({name: 'UserProfile'});
            },
            dealwiththeinput()
            {
                this.thelisttoshow = []
                for (let i = 0; i < this.allEmails.length; i++)
                {
                    console.log(this.searchText)
                    if (this.allEmails[i].senderUsername.includes(this.searchText) ||
                        this.allEmails[i].receiverUsername.includes(this.searchText) ||
                        this.allEmails[i].theme.includes(this.searchText) || (this.searchText === '已读' && this.allEmails[i].read == 1) || (this.searchText === '星标' && this.allEmails[i].star == 1)
                        || (this.searchText === '未读' && this.allEmails[i].read == 0)
                    )
                    {
                        console.log('you')
                        this.thelisttoshow.push(this.allEmails[i])
                    } else
                    {
                        console.log('wu')
                    }
                }
            },
        },
        created()
        {
            // 在组件创建时获取邮件
            emitter.on('refreshing', (data) =>
            {
                if (data)
                {
                    this.imageurl = localStorage.getItem(localStorage.getItem('userId'));
                }
            });
        },
        mounted()
        {
            this.filteredEmails = this.allEmails; // 假设邮件列表已经加载
        },
    };
</script>
<style scoped>
    .header
    {
        height: 10vh;
        background: linear-gradient(90deg, #cbe6ff, #ffffff);
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
    
    .info
    {
        display: block; /* 确保el-descriptions独占一行 */
        clear: both; /* 如果之前的元素使用了float，这可以帮助清除浮动 */
        width: 100%; /* 可选，确保占满整行 */
        margin-top: 10px;
    }
</style>

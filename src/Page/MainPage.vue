<template>
    <div>
        <Header/>
    </div>
    <el-container>
        <el-aside style="border-width: thick;border-color: #4036ff">
            <el-menu>
                <el-menu-item index="1" @click="$router.push({name:'writeEmail'})">写信</el-menu-item>
                <el-menu-item index="2" @click="$router.push({name:'EmailHaveSent'})">已发送</el-menu-item>
                <el-menu-item index="3" @click="$router.push({name:'EmailHaveReceived'});">收信箱</el-menu-item>
                <el-menu-item index="4" @click="$router.push({name:'StarEmail'})">星标邮件</el-menu-item>
                <el-menu-item index="5" @click="$router.push({name:'DraftBox'})">草稿箱</el-menu-item>
                <el-menu-item index="6" @click="$router.push({name:'JunkMailBox'})">垃圾箱</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view name="Main"/>
        </el-main>
    </el-container>
</template>
<script>
    import Header from "@/components/Header.vue";
    import axios from "axios";
    import {ElMessage, ElNotification} from "element-plus";
    import emitter from '@/services/event_bus.js'
    
    export default {
        components: {
            Header,
        },
        data()
        {
            return {
                userId: localStorage.getItem('userId'),
                //测试数据，不喜删除
                Emails: [],
                total: 0,
                pageNumber: 1,
                pageSize: 2000,
                type: null,
                intervalId: null,
                latestemailid: 0
            }
        },
        methods: {
            setEmails()
            {
                console.log('执行了Mainpage的setEmails')
                const data = {
                    userId: this.userId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: null,
                    star: null,
                    readis: null,
                    draft: null,
                    junk: null
                }
                axios({
                    method: "post",
                    url: "/mail/view",
                    data: data,
                }).then((res) =>
                {
                    console.log("获取邮件列表响应", res);
                    if (res.data.code === 1)
                    {
                        console.log('后台刷新邮件成功');
                        this.Emails = res.data.data.records;
                        localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(this.Emails))
                        //确定最新的邮件的id
                        localStorage.getItem(`${localStorage.getItem('userId')}latestemail`)
                        this.latestemailid = this.Emails[this.Emails.length - 1].id
                        this.total = res.data.data.total;
                        console.log('MainPage的setEmails获取邮件列表', this.Emails);
                    } else
                    {
                        console.log('发送失败' + res.data.message);
                    }
                }).catch(error =>
                {
                    console.error('后台刷新失败', error);
                    //刚登录就断网的情况几乎不会出现
                    this.Emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
                });
            },
            getEmails()
            {
                console.log("开始获取邮件列表", {
                    userId: this.userId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: this.type
                });
                const data = {
                    userId: this.userId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: null,
                    junk: null
                }
                axios({
                    method: "post",
                    url: "/mail/view",
                    data: data,
                }).then((res) =>
                {
                    console.log("获取邮件列表响应", res);
                    if (res.data.code === 1)
                    {
                        console.log('后台刷新邮件成功');
                        this.comparation(res.data.data.records)
                        this.needtodealwith()
                        console.log('邮件列表', this.Emails);
                    } else
                    {
                        console.log('发送失败' + res.data.message);
                    }
                }).catch(error =>
                {
                    console.error('后台刷新失败', error);
                });
            },
            needtodealwith()
            {
                //这里处理离线未处理的操作如删除星标
                let needtodealwith =
                    JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`)) || []
                if (needtodealwith.length > 0)
                {
                    for (let i = 0; i < needtodealwith.length; i++)
                    {
                        if (needtodealwith[i].type === 1)
                        {
                            axios({
                                method: "put",
                                url: "/mail/star",
                                params: {
                                    'ids': needtodealwith[i].ids,
                                }
                            }).then((res) =>
                            {
                                if (res.status === 200)
                                {
                                    ElMessage('一个离线操作上传成功');
                                } else
                                {
                                    console.log('删除失败' + res.data.message);
                                }
                            }).catch((error) =>
                            {
                                // 这里处理断网失败的情况
                                console.log('上传失败:', error);
                                // 可以执行其他操作，比如显示错误消息或尝试重新连接
                            });
                        } else if (needtodealwith[i].type === 0)
                        {
                            axios({
                                method: "delete",
                                url: "/mail/delete",
                                params: {
                                    // 直接传递编码后的ID数组
                                    'ids': needtodealwith[i].ids,
                                },
                            }).then((res) =>
                            {
                                if (res.status === 200)
                                {
                                    ElMessage('一个离线操作上传成功');
                                } else
                                {
                                    console.log('删除失败' + res.data.message);
                                }
                            }).catch((error) =>
                            {
                                // 这里处理断网失败的情况
                                console.log('上传失败:', error);
                                // 可以执行其他操作，比如显示错误消息或尝试重新连接
                            });
                        } else if (needtodealwith[i].type === 2)
                        {
                            axios({
                                method: "put",
                                url: "/mail/cancelstar",
                                params: {
                                    'ids': needtodealwith[i].ids,
                                }
                            }).then((res) =>
                            {
                                if (res.status === 200)
                                {
                                    ElMessage('一个离线操作上传成功');
                                } else
                                {
                                    console.log('删除失败' + res.data.message);
                                }
                            }).catch((error) =>
                            {
                                // 这里处理断网失败的情况
                                console.log('上传失败:', error);
                                // 可以执行其他操作，比如显示错误消息或尝试重新连接
                            });
                        }
                    }
                    this.setEmails()
                    needtodealwith = [];
                    localStorage.setItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`, JSON.stringify(needtodealwith))
                }
            },
            comparation(a)
            {
                if (a.length === 0)
                {
                    this.Emails = a;
                    console.log('没有邮件')
                } else if (a[a.length - 1].id > this.latestemailid)
                {
                    ElNotification({
                        title: '新邮件到达',
                        message: '',
                        type: 'success',
                    })
                    emitter.emit('new', 1)
                    this.Emails = a;
                    localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(a))
                    this.latestemailid = this.Emails[this.Emails.length - 1].id
                }
            },
        },
        mounted()
        {   //要联网的话下面这两句需要删掉
            this.setEmails()
            ; //初始获取一次邮件列表
            this.intervalId = setInterval(this.getEmails, 10000); // 每10秒获取一次邮件列表,同时相当于每十秒重连一次
        },
        beforeUnmount()
        {
            clearInterval(this.intervalId); // 清除定时器
        },
    }
</script>
<style scoped>
</style>

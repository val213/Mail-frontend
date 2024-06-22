<template>
    <div>
        <Header/>
    </div>
    <el-container>
        <el-aside style="border-width: thick;border-color: #4036ff">
            <el-menu>
                <el-menu-item index="1" @click="$router.push({name:'writeEmail'})">写信</el-menu-item>
                <el-menu-item index="2" @click="$router.push({name:'EmailHaveSent'})">已发送</el-menu-item>
                <el-menu-item index="3" @click="$router.push({name:'EmailHaveReceived'});havenew=false">收信箱
                    <span v-if="havenew===true" style="background-color: #e8375a;border-radius: 10px;font-size: 10px;color:
            white">new!</span></el-menu-item>
                <el-menu-item index="4" @click="$router.push({name:'StarEmail'})">星标邮件</el-menu-item>
                <el-menu-item index="5" @click="$router.push({name:'DraftBox'})">草稿箱</el-menu-item>
                <el-menu-item index="6" @click="$router.push({name:'JunkMailBox'})">垃圾箱</el-menu-item>
            </el-menu>
          
            <dl>
                <dt>写信</dt>
                <dt>已发送</dt>
                <dt>收信箱</dt>
                <dt>星标邮件</dt>
                <dt>草稿箱</dt>
                <dt>垃圾箱</dt>
            </dl>
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
                userId: '',
                //测试数据，不喜删除
                Emails: [
                    {
                        id: 1,
                        senderUsername: 'lihengjin',
                        receiverUsername: 'user_9328',
                        theme: 'Meeting',
                        sendTime: '2023-05-02T10:30:00',
                        star: 0,
                        read: 1,
                        draft:1
                    },
                    {
                        id: 2,
                        senderUsername: 'lihengjin',
                        receiverUsername: 'user_2713',
                        theme: 'Vacation',
                        sendTime: '2023-04-21T14:45:00',
                        star: 1,
                        read: 0
                    },
                    {
                        id: 3,
                        senderUsername: 'user_7936',
                       receiverUsername: 'lihengjin',
                        theme: 'Project Update',
                        sendTime: '2023-05-16T12:15:00',
                        star: 0,
                        read: 1
                    },
                    {
                        id: 4,
                        senderUsername: 'user_8476',
                        receiverUsername: 'lihengjin',
                        theme: 'Feedback',
                        sendTime: '2023-05-09T17:00:00',
                        star: 1,
                        read: 0
                    },
                    {
                        id: 5,
                        senderUsername: 'lihengjin',
                        receiverUsername: 'user_4567',
                        theme: 'Reminder',
                        sendTime: '2023-04-15T11:00:00',
                        star: 0,
                        read: 1
                    },
                    {
                        id: 6,
                        senderUsername: 'user_7654',
                        receiverUsername: 'user_3210',
                        theme: 'Meeting',
                        sendTime: '2023-05-23T15:15:00',
                        star: 1,
                        read: 0
                    },
                    {
                        id: 7,
                        senderUsername: 'lihengjin',
                        receiverUsername: 'user_1234',
                        theme: 'Project Update',
                        sendTime: '2023-05-03T13:45:00',
                        star: 0,
                        read: 1
                    },
                    {
                        id: 8,
                        senderUsername: 'user_2468',
                        receiverUsername: 'user_7890',
                        theme: 'Vacation',
                        sendTime: '2023-04-28T16:30:00',
                        star: 1,
                        read: 0
                    },
                    {
                        id: 9,
                        senderUsername: 'user_5432',
                        receiverUsername: 'user_8765',
                        theme: 'Feedback',
                        sendTime: '2023-05-10T11:15:00',
                        star: 0,
                        read: 1
                    },
                    {
                        id: 10,
                        senderUsername: 'user_1234',
                        receiverUsername: 'user_5432',
                        theme: 'Reminder',
                        sendTime: '2023-05-04T10:00:00',
                        star: 1,
                        read: 0
                    },
                    {
                        id: 11,
                        senderUsername: 'user_7890',
                        receiverUsername: 'user_2468',
                        theme: 'Meeting',
                        sendTime: '2023-05-17T14:30:00',
                        star: 0,
                        read: 0
                    }
                ],
                total: 0,
                pageNumber: 1,
                pageSize: 2000,
                type: 1,
                intervalId: null,
                latestemailid:0
            }
        },
        methods: {
            setEmails()
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
                    type: this.type
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
                        this.latestemailid=this.Emails[0].id
                        this.total = res.data.data.total;
                        console.log('邮件列表', this.Emails);
                    } else
                    {
                        console.log('发送失败' + res.data.message);
                    }
                }).catch(error =>
                {
                    console.error('后台刷新失败', error);
                    //刚登录就断网的情况几乎不会出现
                    this.Emails=JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
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
                    type: this.type
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
            needtodealwith(){
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
                                    ids: needtodealwith[i].ids,
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
                            })
                        } else if (needtodealwith[i].type === 0)
                        {
                            axios({
                                method: "delete",
                                url: "/mail/delete",
                                data: needtodealwith[i].ids,
                                headers: {
                                    'Content-Type': 'application/json'
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
                            })
                        } else if (needtodealwith[i].type === 2)
                        {
                            axios({
                                method: "put",
                                url: "/mail/cancelstar",
                                params: {
                                    ids: needtodealwith[i].ids,
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
                            })
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
                    console.log('没有邮件')
                } else if (a[0].id > this.latestemailid)
                {
                    ElNotification({
                        title: '新邮件到达',
                        message: '',
                        type: 'success',
                    })
                    emitter.emit('new', 1)
                }
                this.Emails = a;
            },
        },
        mounted()
        {   //要联网的话下面这两句需要删掉
            localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(this.Emails))
             localStorage.setItem(`${localStorage.getItem('userId')}username`, 'lihengjin');
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

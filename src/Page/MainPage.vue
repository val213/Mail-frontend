<template>
    <Header/>
    <Sidebar/>
    <MainContent/>
</template>
<script>
    import Header from "@/components/Header.vue";
    import Sidebar from "@/components/Sidebar.vue";
    import MainContent from "@/components/MainContent.vue";
    import axios from "axios";
    import {ElNotification} from "element-plus";
    import emitter from '@/services/event_bus.js'
    
    export default {
        components: {
            MainContent,
            Header,
            Sidebar,
        },
        data()
        {
            return {
                userId: '',
                Emails: [],
                total: 0,
                pageNumber: 1,
                pageSize: 2000,
                type: 1,
                intervalId: null,
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
                        this.total = res.data.data.total;
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
            comparation(a)
            {
                if (a.length === 0)
                {
                    console.log('没有邮件')
                }
                else if (a[0].id>this.Emails[0].id)
                {
                    ElNotification({
                        title: '新邮件到达',
                        message: '',
                        type: 'success',
                    })
                    emitter.emit('new', 1)
                }
                this.Emails=a;
            },
        },
        mounted()
        {
            this.setEmails(); // 初始获取一次邮件列表
            this.intervalId = setInterval(this.getEmails, 10000); // 每10秒获取一次邮件列表
        },
        beforeUnmount()
        {
            clearInterval(this.intervalId); // 清除定时器
        },
    }
</script>
<style scoped>
</style>

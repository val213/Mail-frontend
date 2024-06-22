<template>
    <div>
        <div>
            <el-button @click="handleDelete" v-if="!junk">删除</el-button>
          
            <el-button >标记为星标</el-button>
        </div>
        <div v-if="Emails.length > 0">
            <el-table :data="Emails" style="width: 100%" @row-dblclick="handleRowDblclick"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="senderUsername" label="发件人" width="180"></el-table-column>
                <el-table-column prop="receiverUsername" label="收件人" width="180"></el-table-column>
                <el-table-column prop="theme" label="主题">
                    <template #default="scope">
                        <div class="star-container">
                            {{ scope.row.theme }} <span v-if="scope.row.read===0">(未读)</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sendTime" label="发送时间" width="180">
                    <template #default="scope">
                        <div class="star-container">
                            {{ scope.row.sendTime }}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
                                 v-if="scope.row.star===0" @click="handleStar(scope.row.id)">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor"
                                 stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
                                 v-if="scope.row.star===1" @click="handleCancelStar(scope.row.id)">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @update:page-size="handleSizeChange" @update:current-page="handleCurrentChange"
                           :current-page="pageNumber" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                           :total="total"></el-pagination>
        </div>
        <el-empty v-else description="没有邮件"
                  image="https://cdn-icons-png.flaticon.com/128/4076/4076559.png"></el-empty>
    </div>
</template>
<script>
    import axios from "axios";
    import router from "@/router";
    // import { ref } from 'vue';
    // import {ElMessage} from "element-plus";
    import {useToast} from 'vue-toastification';
      import emitter from '@/services/event_bus.js'
    export default {
        name: "EmailHaveSent",
        props: {
            initialUserId: {
                type: String,
                default: ''
            },
            initialPageNumber: {
                type: Number,
                default: 1
            },
            initialPageSize: {
                type: Number,
                default: 15
            },
            initialType: {
                type: Number,
                default: null
            },
            initialStar: {
                type: Number,
                default: null
            },
            initialRead: {
                type: Number,
                default: null
            },
            initialDraft: {
                type: Number,
                default: null
            },
             initialJunk: {
                type: Boolean,
                default: false
            },
        },
        setup()
        {
            const toast = useToast();
            return {toast};
        },
        data()
        {
            console.log("初始化数据"); // 添加日志
            return {
                userId: this.initialUserId || localStorage.getItem('userId'),
                pageNumber: this.initialPageNumber,
                pageSize: this.initialPageSize,
                type: this.initialType,
                star: this.initialStar,
                readis: this.initialRead,
                draft: this.initialDraft,
                junk:this.initialJunk,
                Emails: [],
                total: 0,
                Emailsbeingchosen: [],
                // isToastShowing: false  // 添加判断此时有没有标志，防止弹窗多次出现
            }
        },
        methods: {
            init()
            {
                console.log("初始化邮件列表"); // 添加日志
                this.getEmailsfromlocal()
            },
            getEmailsfromlocal()
            {
                let emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
                this.total = emails.length
                this.Emails=[]
                for (let i = this.pageNumber - 1; i < this.pageSize; i++)
                {
                    if (emails[i])
                    {
                        this.Emails.push(emails[i])
                    }
                }
            },
            getEmails()
            {
                console.log("开始获取邮件列表", { // 添加日志
                    userId: this.userId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: this.type,
                    star: this.star,
                    readis: this.readis,
                    draft: this.draft
                });
                const data = {
                    userId: this.userId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    type: this.type,
                    star: this.star,
                    readis: this.readis,
                    draft: this.draft
                }
                axios({
                    method: "post",
                    url: "/mail/view",
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) =>
                {
                    console.log("获取邮件列表响应", res); // 添加日志
                    if (res.data.code === 1)
                    {
                        console.log('查询邮件成功');
                        this.showSuccessToast('查询邮件成功');
                        let emails=res.data.data.records;
                        localStorage.setItem('Emails',JSON.stringify(emails))
                        this.getEmailsfromlocal()
                        this.total = res.data.data.total;
                        // 打印日志
                        console.log('邮件列表', this.Emails);
                    } else
                    {
                        console.log('发送失败' + res.data.message);
                        this.showErrorToast('查询邮件失败');
                    }
                }).catch(error =>
                {
                    console.error('请求邮件列表失败', error);
                    this.showErrorToast('联网失败');
                });
            },
            handleSizeChange(newSize)
            {
                console.log("改变每页显示邮件数量", newSize); // 添加日志
                this.pageSize = newSize;
                this.pageNumber = 1; // 重置为第一页
                this.getEmailsfromlocal();
            },
            handleCurrentChange(newPage)
            {
                console.log("改变当前页码", newPage); // 添加日志
                this.pageNumber = newPage;
                this.getEmailsfromlocal();
            },
            handleRowDblclick(row)
            {
                // 假设每封邮件的唯一标识符是id，并且它是row对象的一个属性
                // 跳转到邮件详情页面，并将邮件ID作为参数传递
                router.push({name: 'MailDetail', params: {mailId: row.id}});
                
                
            },
            showSuccessToast(message)
            {
                // if (this.isToastShowing) {
                //   this.toast.clear();
                // }
                // this.isToastShowing = true;
                this.toast.success(message, {
                    timeout: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: 'top-right',
                    // onClose: () => { this.isToastShowing = false; }  // 提示关闭时重置标志
                });
                //  ElMessage({
                //   message: message,
                //   type: 'success',
                //   duration: 3000,
                //   showClose: true,
                //   center: true,
                // });
            },
            showErrorToast(message)
            {
                // if (this.isToastShowing) {
                //   this.toast.dismiss(this.toast);
                // }
                // this.isToastShowing = true;
                this.toast.error(message, {
                    timeout: 1000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: 'top-right',
                    // onClose: () => { this.isToastShowing = false; }  // 提示关闭时重置标志
                });
                //  ElMessage({
                //   message: message,
                //   type: 'error',
                //   duration: 3000,
                //   showClose: true,
                //   center: true,
                // });
            },
            handleSelectionChange(selection)
            {
                this.Emailsbeingchosen = [];
                selection.forEach(row =>
                {
                    this.Emailsbeingchosen.push(row.id);
                })
            },
            handleDelete()
            {
                const ids = this.Emailsbeingchosen
                axios({
                    method: "delete",
                    url: "/mail/delete",
                    data: ids,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) =>
                {
                    if (res.status === 200)
                    {
                        this.getEmails()
                    } else
                    {
                        console.log('删除失败' + res.data.message);
                    }
                }).catch((error) =>
                {
                    // 这里处理联网失败的情况
                    console.log('联网失败:', error);
                    let emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
                    let junkmailbox = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}JunkMailBox`)) || []
                 
                    for (let i = 0; i < emails.length; i++)
                    {
                        if (ids == emails[i].id)
                        {
                            junkmailbox.push(emails[i])
                            emails.splice(i, 1)
                            //更新本地缓存
                            localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(emails))
                            this.getEmailsfromlocal()
                            //更新垃圾箱缓存
                            localStorage.setItem(`${localStorage.getItem('userId')}JunkMailBox`,
                                JSON.stringify(junkmailbox))
                        }
                    }
                    // 可以执行其他操作，比如显示错误消息或尝试重新连接
                });
            },
            handleStar(a)
            {
                const ids = a
                axios({
                    method: "put",
                    url: "/mail/star",
                    params: {
                        ids,
                    }
                }).then((res) =>
                {
                    if (res.status === 200)
                    {
                        this.getEmails()
                    } else
                    {
                        console.log('删除失败' + res.data.message);
                    }
                }).catch((error) =>
                {
                    // 这里处理联网失败的情况
                    console.log('联网失败:', error);
                    let emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
                    for (let i = 0; i < emails.length; i++)
                    {
                        if (ids === emails[i].id)
                        {
                            emails[i].star=1
                            //更新本地缓存
                            localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(emails))
                            this.getEmailsfromlocal()
                            let
                                needtodealwith=JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`))||[]
                            let thing={ids:ids,type:1}
                            needtodealwith.push(thing)
                            localStorage.setItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`,JSON.stringify(needtodealwith))
                        }
                    }
                    // 可以执行其他操作，比如显示错误消息或尝试重新连接
                });
            },
            handleCancelStar(a)
            {
                const ids = a
                axios({
                    method: "put",
                    url: "/mail/cancelstar",
                    params: {
                        ids,
                    }
                }).then((res) =>
                {
                    if (res.status === 200)
                    {
                        this.getEmails()
                    } else
                    {
                        console.log('删除失败' + res.data.message);
                    }
                }).catch((error) =>
                {
                    // 这里处理断网失败的情况
                    console.log('联网失败:', error);
                    let emails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`))
                    for (let i = 0; i < emails.length; i++)
                    {
                        if (ids === emails[i].id)
                        {
                            emails[i].star=0
                            //更新本地缓存
                            localStorage.setItem(`${localStorage.getItem('userId')}Emails`, JSON.stringify(emails))
                            this.getEmailsfromlocal()
                             let
                                needtodealwith=JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`))||[]
                            let thing={ids:ids,type:2}
                            needtodealwith.push(thing)
                            localStorage.setItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`,JSON.stringify(needtodealwith))
                        }
                    }
                    // 可以执行其他操作，比如显示错误消息或尝试重新连接
                });
            },
        },
        mounted()
        {
            console.log("组件挂载"); // 添加日志
            this.init();
            ///新邮件到达自动刷新
             emitter.on('new',(data)=>{
                
                if(data===1)
                {
                    this.getEmailsfromlocal();
                    
                }
              
                
                
            })
        }
    }
</script>
<style scoped>
    .star-container
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    
    .star-container svg
    {
        margin-left: auto;
    }
</style>
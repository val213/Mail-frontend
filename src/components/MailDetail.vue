<template>
    <div style="padding-top: 6px;padding-bottom: 6px;background-color:#C1D9F3;margin-top: 5PX;padding-left:5px">
        <button style='margin-right: 20px' @click="goback">返回</button>
        <button style='margin-right: 5px'
                @click="handledelete">删除
        </button>
        <AiMailContentSummarize
            :mailContent="content"></AiMailContentSummarize>
     
    </div>
    <div>
        <div style="background-color:#EFF5FB">
            <span STYLE="font-size: large;padding-left: 20px;font-weight: bold">{{ subject }}</span><br>
            <span style="color: #7f7f7f;font-size:small;font-weight: lighter;padding-left: 20px">发件人:&nbsp;{{
                    senderMessage
                }}</span><br>
            <span style="color: #7f7f7f;font-size:small;font-weight: lighter;padding-left: 20px">发送时间:&nbsp;{{
                    sendTime
                }}</span><br>
            <span style="color: #7f7f7f;font-size:small;font-weight: lighter;padding-left: 20px">收件人:&nbsp;{{
                    receiverMessage
                }}</span><br>
            <span style="color: #7f7f7f;font-size:small;font-weight: lighter;padding-left: 20px">抄送:&nbsp;{{
                    ccEmailAddresses
            }}</span><br>
            <span style="color: #7f7f7f;font-size:small;font-weight: lighter;padding-left: 20px">附件:&nbsp;{{
                    attachments ? attachments.length : 0
                }}个</span></div>
        <div style="border: 1px solid #ccc;height: 60vh">
            <Editor
                style="height: 60vh; overflow-y: hidden;"
                :defaultConfig="editorConfig"
                v-model="html"
                @onCreated="onCreated"
            />
        </div>
    </div>
    <div style="background-color: #b9d7f1;padding-left: 2px" v-if="attachments ? attachments.length : 0>0">附件</div>
    <div style="border: 2px solid #b9d7f1;" v-for="item in attachments" :key="item.id">
        <table>
            <tr>
                <td><img src="http://hbimg.huaban.com/b7f755b76d18c7880c043cb2d34f3319856cd5b39b73-hDUrzm"
                         alt="Big Boat"
                         style="width: 30px;height: 30px"/></td>
                <td><span style="font-size:10px">{{ item.fileName }}</span><span
                    style="color: #7f7f7f;font-size:9px">({{
                        item.size
                    }}kb)</span><br>
                    <span style="color: #7f7f7f;font-size:8px">下载链接</span>
                    <el-link style="color: #4036ff;font-size:8px" :href="item.downloadUrl" target="_blank">
                        {{ item.downloadUrl }}
                    </el-link>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import AiMailContentSummarize from './AiMailContentSummarize.vue';
    import axios from "axios";
    import {Editor} from "@wangeditor/editor-for-vue";
    import router from "@/router";
    import {ElMessage} from "element-plus";
    
    export default {
        components: {
            AiMailContentSummarize, Editor
        },
        data()
        {
            return {
                editorReady: false,
                editor: null,
                html: "<p></p>",
                editorConfig: {
                    placeholder: "暂无数据",
                    readOnly: true,
                    // autoFocus: false,
                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {}
                },
                //这里的content代表邮件内容，可以被Ai子组件接收
                content: '邮件内容',
                // 邮件详情数据
                senderMessage: '不知道什么形式',
                receiverMessage: "不知道什么形式",
                subject: "第一封邮件",
                sendTime: '先写个今天',
                attachments: [],
                junk: this.$route.params.junk,
                ccEmailAddresses: '',
            }
        },
        created()
        {
            this.editorReady = true;
            this.loadMailDetail();
        },
        beforeUnmount()
        {
            const editor = this.editor;
            if (editor == null)
            {
                return;
            }
            editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
        }
        ,
        methods: {
            onCreated(editor)
            {
                this.editor = Object.seal(editor);
            },
            loadMailDetail()
            {    //增加判断是否有保存在缓存里，有则用，没有再调用接口
                let emaildetails = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}emaildetails`))
                    || []
                const mailId = this.$route.params.mailId;
                let b = 0;
                if (emaildetails.length > 0)
                {
                    for (let i = 0; i < emaildetails.length; i++)
                    {
                        if (mailId == emaildetails[i].id)
                        {
                            this.senderMessage = emaildetails[i].senderName;
                            this.receiverMessage = emaildetails[i].receiverName;
                            this.subject = emaildetails[i].theme;
                            this.content = emaildetails[i].content;
                            this.sendTime = emaildetails[i].sendTime;
                            this.attachments = emaildetails[i].attachments;
                            this.html = this.content;
                            this.ccEmailAddresses = emaildetails[i].ccEmailAddresses;
                            b += 1;
                            console.log('本地有缓存该邮件详情信息，不执行请求')
                            break;
                        }
                    }
                }
                if (emaildetails.length === 0 || b === 0)
                {
                    console.log('本地没有缓存该邮件详情信息，现在执行请求')
                    axios({
                        method: "get",
                        url: `/mail/maildetails/${mailId}`,
                    }).then((res) =>
                    {
                        // 打印返回的数据
                        console.log(res);
                        if (res.status === 200)
                        {
                            this.senderMessage = res.data.data.senderName;
                            this.receiverMessage = res.data.data.receiverName;
                            this.subject = res.data.data.theme;
                            this.content = res.data.data.content;
                            this.sendTime = res.data.data.sendTime;
                            this.attachments = res.data.data.attachments;
                            this.html = this.content;
                            this.ccEmailAddresses = res.data.data.ccEmailAddresses;
                            //本地存储
                            let emaildetail = res.data.data
                            emaildetails.push(emaildetail)
                            localStorage.setItem(`${localStorage.getItem('userId')}emaildetails`,
                                JSON.stringify(emaildetails))
                        } else
                        {
                            console.log('获取失败' + res.data.message);
                        }
                    }).catch((error) =>
                    {
                        console.log('无法连接网络且本地未缓存' + error);
                        ElMessage('无法连接网络且本地未缓存')
                        this.goback()
                    })
                    mailId && console.log('加载邮件详情', mailId);
                }
            },
            goback()
            {
                router.back()
            },
            handlellocalstoragedelete()
            {
                let emails =
                    JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}Emails`)) || []
                let junkboxs =
                    JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}JunkMailBox`)) || []
                const mailId = this.$route.params.mailId;
                console.log(mailId)
                let isjunk = 1;
                for (let i = 0; i < emails.length; i++)
                {
                    if (mailId == emails[i].id)
                    {
                        junkboxs.push(emails[i])
                        emails.splice(i, 1)
                        isjunk -= 1
                        localStorage.setItem(`${localStorage.getItem('userId')}emaildetails`, JSON.stringify(emails))
                        localStorage.setItem(`${localStorage.getItem('userId')}JunkMailBox`, JSON.stringify(junkboxs))
                       return 0;
                    }
                }
                if (isjunk === 1)
                {
                    let emaildetails =
                        JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}emaildetails`)) || []
                    for (let i = 0; i < emaildetails.length; i++)
                    {
                        if (mailId == emaildetails[i].id)
                        {
                            emaildetails.splice(i, 1)
                        }
                    }
                    for (let i = 0; i < junkboxs.length; i++)
                    {
                        if (junkboxs[i] == mailId)
                        {
                            junkboxs.splice(i, 1)
                        }
                    }
                    localStorage.setItem(`${localStorage.getItem('userId')}emaildetails`, JSON.stringify(emaildetails))
                    localStorage.setItem(`${localStorage.getItem('userId')}JunkMailBox`, JSON.stringify(junkboxs))
                }
            },
            handledelete()
            {
                axios({
                    method: "delete",
                    url: "/mail/delete",
                    params: {ids: this.$route.params.mailId},
                }).then((res) =>
                {
                    if (res.status === 200)
                    {
                        ElMessage({message: '删除成功', type: 'success'})
                        this.handlellocalstoragedelete()
                        setTimeout(() =>
                        {
                            this.goback()
                        }, 50)
                    } else
                    {
                        console.log('删除失败' + res.data.message);
                    }
                })
            },
        }
    }
</script>

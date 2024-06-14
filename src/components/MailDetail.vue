<template >
    <div>
        <AiMailContentSummarize :mailContent="content"></AiMailContentSummarize>
    </div>
    <div>
        <h1>{{subject}}</h1><br>
        <span>发件人{{senderMessage}}</span><br>
         <span>发送时间{{sendTime}}</span><br>
        <span>收件人{{receiverMessage}}</span>
        <span>附件: {{attachments.length}}个</span>
      <div style="border: 1px solid #ccc; margin-top: 10px">
           
            <Editor
                style="height: 400px; overflow-y: hidden"
                :defaultConfig="editorConfig"
                v-model="html"
           
                @onCreated="onCreated"
            />
      </div></div>
    <div>
       <span>附件</span><br>
         <div v-for="item in attachments" :key="item.id">
             <span>{{item.fileName}}({{item.fileSize}})</span>
             <span>下载链接</span><el-link >{{item.downloadUrl}}</el-link>
         </div><br>
    </div>
</template>
<script>
    import AiMailContentSummarize from './AiMailContentSummarize.vue';
    import axios from "axios";
       import {Editor} from "@wangeditor/editor-for-vue";
 
    export default {
       
        components: {
            AiMailContentSummarize,Editor
        },
        data()
        {
            return {
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
                senderMessage: ''
                ,
                receiverMessage: "",
                subject: "",
                sendTime: '',
                attachments: [],
            }
        },
        created()
        {
            this.loadMailDetail();
        },
         beforeUnmount()
        {
            const editor = this.editor;
            if (editor == null) {
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
            {
                const mailId = this.$route.params.mailId;
                axios({
                    method: "get",
                    url: `/mail/maildetails/${mailId}`,
                }).then((res) =>
                {
                    // 打印返回的数据
                    console.log(res);
                    if (res.status === 200)
                    {
                        this.senderMessage = res.data.data.sender;
                        this.receiverMessage = res.data.data.receiver;
                        this.subject = res.data.data.subject;
                        this.content = res.data.data.content;
                        this.sendTime = res.data.data.sendTime;
                        this.attachments = res.data.data.attachments;
                        this.html=this.content;
                        
                    } else
                    {
                        console.log('获取失败' + res.data.message);
                       
                    }
                })
                mailId && console.log('加载邮件详情', mailId);
            }
        }
    }
</script>
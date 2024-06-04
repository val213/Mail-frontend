<script>
    import axios from "axios";
 
    
    export default {
        name: "EmailHaveSent",
        data()
        {
            return {
                userId: localStorage.getItem('userId'),
                pageNumber: 1,
                pageSize: 30,
                type:0,
                Emails: [],
               total:0,
                Emailsbeingchosen:[]
            }
        },
        methods: {
            init()
            {
                ///this.getEmails(this.userId,this.pageNumber,this.pageSize,this.type)
            },
            getEmails(userId, pageNumber, pageSize, type,)
            {
                const data = {
                    userId: userId,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    type: type
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
                    if (res.data.code === 1)
                    {
                        console.log('查询邮件成功')
                        this.Emails=res.data.records
                    } else
                    {
                        console.log('发送失败' + res.data.message)
                    }
                })
            },
            handledelete(){}
        },
        mounted()
        {
           this.init();
        }
    }
</script>
<template>
    <div><button @click="handledelete">删除</button><button>转发</button></div>
    <div>
        <table border="1">
            <tr>
                 <td><input type="checkbox"></td>
                <th>
                    收件人
                </th>
                <th>主题</th>
                <th>
                    发送时间
                </th>
            </tr>
            <tr v-for="item in Emails" :key="item.id" >
                <td><input type="checkbox" :value=item.id v-model="Emailsbeingchosen"></td>
                 <td>{{item.receiverUsername}}</td>
                <td>{{item.theme}}</td>
                <td>{{item.sendTime}}</td>
            </tr>
        </table>
    </div>
</template>
<style scoped>
</style>
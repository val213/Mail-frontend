<script>
    import router from "@/router";
    import axios from "axios";
  
    
    export default {
        name: "JunkMailBox",
        components: {},
        data()
        {
            return {
                junkmail: []
            }
        },
        mounted()
        {
            this.initiate()
        },
        methods: {
            initiate()
            {
                this.junkmail = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}JunkMailBox`))
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
                const encodedIds = ids.map(id => encodeURIComponent(id.toString().trim()));
                //这里是彻底删除，把缓存里的垃圾箱里的垃圾邮件删了，后端的也删了
                axios({
                    method: "delete",
                    url: "/mail/delete",
                    params: {
                        // 直接传递编码后的ID数组
                        'ids': encodedIds,
                    },
                    paramsSerializer: params =>
                    {
                        // 使用自定义序列化函数来构造查询字符串
                        return Object.keys(params)
                            .map(key => `${key}=${params[key].join(',')}`)
                            .join('&');
                    }
                }).then((res) =>
                    {
                        if (res.status === 200)
                        {
                            // 处理成功的响应
                            //后端数据删除成功后，前端也同时彻底删除缓存，做到前后端同步
                            console.log('删除邮件成功');
                            for (let j = 0; j < ids.length; j++)
                            {
                                for (let i = 0; i < this.junkmail.length; i++)
                                {
                                    if (ids[j] == this.junkmail[i].id)
                                    {
                                        this.junkmail.splice(i, 1)
                                        //更新垃圾箱缓存
                                     
                                    }
                                }
                            }
                            localStorage.setItem(`${localStorage.getItem('userId')}JunkMailBox`,
                                JSON.stringify(this.junkmail))
                            this.initiate()
                        }
                    }
                ).catch((error) =>
                {// 这里处理联网失败的情况
                    console.log('联网失败:', error);
                    for (let j = 0; j < ids.length; j++)
                    {
                        for (let i = 0; i < this.junkmail.length; i++)
                        {
                            if (ids[j] == this.junkmail[i].id)
                            {
                                this.junkmail.splice(i, 1)
                                //更新垃圾箱缓存
                                let
                                    needtodealwith = JSON.parse(localStorage.getItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`)) || []
                                let thing = {ids: ids[j], type: 0}
                                //没有联网时把该删除操作记录到缓存，等网络好时再处理
                                needtodealwith.push(thing)
                                localStorage.setItem(`${localStorage.getItem('userId')}needtodealwithafterconnect`, JSON.stringify(needtodealwith))
                            }
                        }
                    }
                    localStorage.setItem(`${localStorage.getItem('userId')}JunkMailBox`,
                        JSON.stringify(this.junkmail))
                  
                });
                
            },
            handleRowDblclick(row)
            {
                // 假设每封邮件的唯一标识符是id，并且它是row对象的一个属性
                // 跳转到邮件详情页面，并将邮件ID作为参数传递
                router.push({name: 'MailDetail', params: {mailId: row.id}});
            },
        },
    }
</script>
<template>
    <div>
        <div>
            <el-button @click="handleDelete">彻底删除</el-button>
            <el-button>恢复邮件</el-button>
        </div>
        <div v-if="junkmail.length>0">
            <el-table :data="junkmail" style="width: 100%" @row-dblclick="handleRowDblclick"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="senderUsername" label="发件人" width="180"></el-table-column>
                <el-table-column prop="receiverUsername" label="收件人" width="180"></el-table-column>
                <el-table-column prop="theme" label="主题">
                </el-table-column>
                <el-table-column prop="sendTime" label="发送时间" width="180">
                </el-table-column>
            </el-table>
        </div>
        <el-empty v-else description="垃圾箱为空"
                  image="https://cdn-icons-png.flaticon.com/128/4076/4076559.png"></el-empty>
    </div>
</template>
<style scoped>
</style>
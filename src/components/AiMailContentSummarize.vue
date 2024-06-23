<template>
  
        <button @click="open" >
            Ai总结
        </button>
    
</template>

<script>
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { AiContentSummarize } from '@/services/AiServices'

export default {
    props: {
        mailContent: String
    },
    methods: {
        async open() {
            //console.log('邮件内容'+this.mailContent)
            const response = await this.summarize()
            console.log("返回体：", response)
            ElNotification({
                title: 'Ai邮件总结内容如下：',
                message: h('i', { style: 'color: teal' }, response.data),
                duration: 10000
            })
        },
        async summarize() {
            try {
                const response = await AiContentSummarize(this.mailContent)
                //console.log(response)
                return response
            } catch (error) {
                console.log(error)
            }
        }
    },
}


</script>

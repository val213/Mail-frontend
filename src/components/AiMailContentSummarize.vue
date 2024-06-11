<template>
    <el-button plain @click="open" circle>
        <el-icon><View /></el-icon>
    </el-button>
</template>

<script>
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { AiContentSummarize } from '@/services/AiServices';

export default {
    props: {
        mailContent: String
    },
    methods: {
        open() {
            const response = this.summarize()
            ElNotification({
                title: 'Ai邮件总结内容如下：',
                message: h('i', { style: 'color: teal' }, response),
            })
        },
        async summarize() {
            try {
                const response = await AiContentSummarize(this.mailContent)
                console.log(response)
                return response
            } catch (error) {
                console.log(error)
            }
        }
    },
}


</script>
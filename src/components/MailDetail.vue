<template>
  <div>
    <h1>邮件详情</h1>
    <!-- 显示邮件内容等 -->
  </div>
  <div class="ai-mailContent-summarize">
    <AiMailContentSummarize :mailContent="content"></AiMailContentSummarize>
  </div>
</template>

<script>
import AiMailContentSummarize from './AiMailContentSummarize.vue';
export default {
  components: {
    AiMailContentSummarize
  },
  data() {
    return {
      //这里的content代表邮件内容，可以被Ai子组件接收
      content:''
      // 邮件详情数据
    }
  },
  created() {
    this.loadMailDetail();
  },
  methods: {
    loadMailDetail() {
      const mailId = this.$route.params.mailId;
      // 根据mailId从后端加载邮件详情数据
      mailId && console.log('加载邮件详情', mailId);
    }
  }
}
</script>

<style scoped>
.ai-mailContent-summarize {
  position: relative;

.ai-mailContent-summarize > AiMailContentSummarize {
  position: absolute;
  top:0;
  right:0;
}
}



</style>
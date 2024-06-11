<template>
  <div>
    <AiMailContentSummarize :mailContent="content"></AiMailContentSummarize>
  </div>
  <div>
    <h1>邮件详情</h1>
    <!-- 显示邮件内容等 -->
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
      content:'邮件内容'
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

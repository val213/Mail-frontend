<template>
    <div>
      <h1>邮件详情</h1>
      <!-- 显示邮件内容等 -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
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
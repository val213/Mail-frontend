<template>
    <div>
      <el-table :data="Emails" style="width: 100%" >
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="receiverUsername" label="收件人" width="180"></el-table-column>
        <el-table-column prop="theme" label="主题"></el-table-column>
        <el-table-column prop="sendTime" label="发送时间" width="180"></el-table-column>
      </el-table>
      <!-- <el-empty description="没有邮件"
      image="https://cdn-icons-png.flaticon.com/128/4076/4076559.png"
      /> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "EmailHaveSent",
    components: {
    },
    data() {
      return {
        userId: localStorage.getItem('userId'),
        pageNumber: 1,
        pageSize: 30,
        type: 0,
        Emails: [],
        total: 0,
        Emailsbeingchosen: []
      }
    },
    methods: {
      init() {
        // this.getEmails(this.userId, this.pageNumber, this.pageSize, this.type)
      },
      getEmails(userId, pageNumber, pageSize, type) {
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
        }).then((res) => {
          if (res.data.code === 1) {
            console.log('查询邮件成功')
            this.Emails = res.data.records
          } else {
            console.log('发送失败' + res.data.message)
          }
        })
      },
      handledelete() {}
    },
    mounted() {
      this.init();
    }
  }
  </script>
  
  <style scoped>
  </style>
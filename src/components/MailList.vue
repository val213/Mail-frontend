<template>
  <div>
    <el-table :data="Emails" style="width: 100%" @row-dblclick="handleRowDblclick">
    <el-table-column
    type="selection"
    width="55">
    </el-table-column>
      <el-table-column prop="senderUsername" label="发件人" width="180"></el-table-column>
      <el-table-column prop="receiverUsername" label="收件人" width="180"></el-table-column>
      <el-table-column prop="theme" label="主题"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间" width="180"></el-table-column>
    </el-table>
    <!-- <el-empty description="没有邮件"
    image="https://cdn-icons-png.flaticon.com/128/4076/4076559.png"
    /> -->
    <el-pagination
      @update:page-size="handleSizeChange"
      @update:current-page="handleCurrentChange"
      :current-page="pageNumber"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
// import { ref } from 'vue';
// import {ElMessage} from "element-plus";
import { useToast } from 'vue-toastification';


export default {
  name: "EmailHaveSent",
  props: {
    initialUserId: {
      type: String,
      default: ''
    },
    initialPageNumber: {
      type: Number,
      default: 1
    },
    initialPageSize: {
      type: Number,
      default: 30
    },
    initialType: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    console.log("初始化数据"); // 添加日志
    return {
      userId: this.initialUserId || localStorage.getItem('userId'),
      pageNumber: this.initialPageNumber,
      pageSize: this.initialPageSize,
      type: this.initialType,
      Emails: [],
      total: 0,
      Emailsbeingchosen: []
    }
  },
  methods: {
    init() {
      console.log("初始化邮件列表"); // 添加日志
      this.getEmails();
    },
    getEmails() {
      console.log("开始获取邮件列表", { // 添加日志
        userId: this.userId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        type: this.type
      });
      const data = {
        userId: this.userId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        type: this.type
      }
      
      axios({
        method: "post",
        url: "/mail/view",
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log("获取邮件列表响应", res); // 添加日志
        if (res.data.code === 1) {
          console.log('查询邮件成功');
          this.showSuccessToast('查询邮件成功');
          this.Emails = res.data.data.records;
          this.total = res.data.data.total; 
          // 打印日志
          console.log('邮件列表', this.Emails);

        } else {
          console.log('发送失败' + res.data.message);
          this.showErrorToast('查询邮件失败');
        }
      }).catch(error => {
        console.error('请求邮件列表失败', error);
        this.showErrorToast('请求邮件列表失败');
      });
    },
    handleSizeChange(newSize) {
      console.log("改变每页显示邮件数量", newSize); // 添加日志
      this.pageSize = newSize;
      this.pageNumber = 1; // 重置为第一页
      this.getEmails();
    },
    handleCurrentChange(newPage) {
      console.log("改变当前页码", newPage); // 添加日志
      this.pageNumber = newPage;
      this.getEmails();
    },
    handleRowDblclick(row) {
      // 假设每封邮件的唯一标识符是id，并且它是row对象的一个属性
      // 跳转到邮件详情页面，并将邮件ID作为参数传递
      this.$router.push({ name: 'MailDetail', params: { mailId: row.id } });
    },
    showSuccessToast(message) {
      this.toast.success(message, {
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-center',
      });
      //  ElMessage({
      //   message: message,
      //   type: 'success',
      //   duration: 3000,
      //   showClose: true,
      //   center: true,
      // });
    },
    showErrorToast(message) {
      this.toast.error(message, {
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-center',
      });
      //  ElMessage({
      //   message: message,
      //   type: 'error',
      //   duration: 3000,
      //   showClose: true,
      //   center: true,
      // });
    }
  },
  // },
  
  mounted() {
    console.log("组件挂载"); // 添加日志
    this.init();
  }
}
</script>

<style scoped>
</style>
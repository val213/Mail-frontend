<template>
  <div>
    <div><el-button @click="handleDelete">删除</el-button><el-button>标记为星标</el-button><el-button>切换已读状态</el-button></div>
    <div v-if="Emails.length > 0">
      <el-table :data="Emails" :row-style="getRowStyle" style="width: 100%"  @row-dblclick="handleRowDblclick" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="senderUsername" label="发件人" width="180"></el-table-column>
        <el-table-column prop="receiverUsername" label="收件人" width="180"></el-table-column>
        <el-table-column prop="theme" label="主题"></el-table-column>
        <el-table-column prop="summary" label="摘要"></el-table-column>
        <el-table-column prop="sendTime" label="发送时间" width="180">
          <template #default="scope">
            <div class="star-container">
              {{scope.row.sendTime}}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" v-if="scope.row.star===0" @click="handleStar(scope.row.id)">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" v-if="scope.row.star===1" @click="handleCancelStar(scope.row.id)">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @update:page-size="handleSizeChange" @update:current-page="handleCurrentChange" :current-page="pageNumber" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <el-empty v-else description="没有邮件" image="https://cdn-icons-png.flaticon.com/128/4076/4076559.png"></el-empty>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
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
      default: null
    },
    initialStar:{
      type:Number,
      default: null
    },
    initialRead:{
      type:Number,
      default: null
    },
    initialDraft:{
      type:Number,
      default: null
    },
    initialJunk:{
      type:Number,
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
      star:this.initialStar,
      readis:this.initialRead,
      draft: this.initialDraft,
      junk: this.initialJunk,
      Emails: [],
      total: 0,
      Emailsbeingchosen: [],
      // isToastShowing: false  // 添加判断此时有没有标志，防止弹窗多次出现
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
        type: this.type,
        star: this.star,
        readis: this.readis,
        draft: this.draft,
        junk: this.junk
      });
      const data = {
        userId: this.userId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        type: this.type,
        star: this.star,
        readis: this.readis,
        draft: this.draft,
        junk: this.junk
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
     router.push({ name: 'MailDetail', params: { mailId: row.id } });
     // 如果邮件未读，设置邮件为已读
      if (row.read == 0 || row.read == null) {
        const mailId = row.id
        this.setMailRead(mailId);
      }
    },
    setMailRead(mailId){
      axios({
        method: "put",
        url: `/mail/read/${mailId}`,
        }).then((res) => {
          if (res.status === 200) {
            console.log('设置邮件为已读成功');
            this.showSuccessToast('设置邮件为已读成功');
            this.getEmails();
          } else {
            console.log('设置邮件为已读失败' + mailId);
            this.showErrorToast('设置邮件为已读失败');
          }
        }).catch(error => {
          console.error('请求设置邮件为已读失败', error);
          console.log('设置邮件为已读失败' + mailId);
          this.showErrorToast('请求设置邮件为已读失败');
        });
    },
    showSuccessToast(message) {
      // if (this.isToastShowing) {
      //   this.toast.clear();
      // }
      // this.isToastShowing = true;
      this.toast.success(message, {
        timeout: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        position: 'top-right',
        // onClose: () => { this.isToastShowing = false; }  // 提示关闭时重置标志
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
    // if (this.isToastShowing) {
    //   this.toast.dismiss(this.toast);
    // }
    // this.isToastShowing = true;
    this.toast.error(message, {
      timeout: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      position: 'top-right',
      // onClose: () => { this.isToastShowing = false; }  // 提示关闭时重置标志
    });
      //  ElMessage({
      //   message: message,
      //   type: 'error',
      //   duration: 3000,
      //   showClose: true,
      //   center: true,
      // });
    },
  handleSelectionChange(selection){
        this.Emailsbeingchosen=[];
        selection.forEach(row=>{
            this.Emailsbeingchosen.push(row.id);
        })
  },
      handleDelete(){
        // 判断当前所处的页面是否是垃圾箱页面
        const ids=this.Emailsbeingchosen
        if (this.$route.name === 'JunkMailBox') {
          // 询问用户是否选择永久删除
          this.$confirm('此操作将永久删除选中的邮件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteEmails(ids);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          // 后端会自动识别邮件是否被标记为废弃并将邮件移动到垃圾箱
          this.deleteEmails(ids);
        }
      },
      deleteEmails(ids) {
        // 使用 encodeURIComponent 确保每个ID都被正确编码
        const encodedIds = ids.map(id => encodeURIComponent(id.toString().trim()));

        axios({
          method: "delete",
          url: "/mail/delete",
          params: {
            // 直接传递编码后的ID数组
            'ids': encodedIds,
          },
          paramsSerializer: params => {
            // 使用自定义序列化函数来构造查询字符串
            return Object.keys(params)
              .map(key => `${key}=${params[key].join(',')}`)
              .join('&');
          }
        }).then((res) => {
          if (res.status === 200) {
            // 处理成功的响应
            console.log('删除邮件成功');
            this.toast.success('删除邮件成功', {
              timeout: 1000,
              closeOnClick: true,
              pauseOnHover: true,
              position: 'top-right',
            });
            this.getEmails();
          }
        }).catch(error => {
          // 处理错误
          console.error("Error deleting emails:", error);
        });
      },
      handleStar(a){
        const ids=a
        axios({
          method: "put",
          url: "/mail/star",
          params:{
            ids,
          }
      }).then((res) =>
      {
        if (res.status === 200)
        {
          this.getEmails()
        } else
        {
          console.log('删除失败' + res.data.message);
        }
      })
       },
      handleCancelStar(a){
        const ids=a
        axios({
                    method: "put",
                    url: "/mail/cancelstar",
                    params:{
                      ids,
                    }
                }).then((res) =>
                {
                    if (res.status === 200)
                    {
                        this.getEmails()
                        
                    } else
                    {
                        console.log('删除失败' + res.data.message);
                       
                    }
                })
        
      },
      getRowStyle(row) {
        if (row.row.read == 1) {
          return { backgroundColor: 'white' }; // 已读邮件的背景色
        } else{
          return { backgroundColor: 'lightgray' }; // 未读邮件的背景色
        }
      },
    },
  
  
  mounted() {
    console.log("组件挂载"); // 添加日志
    this.init();
  }
}
</script>

<style scoped>
 .star-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.star-container svg {
  margin-left: auto;
}
</style>
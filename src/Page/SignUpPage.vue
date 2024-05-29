<script setup>
    import { ref} from "vue";
    import {UserRegister} from "@/services/SignAndLogin";
    
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('')
    const phonenumber = ref('')
    const verification_code = ref('')
    let same = ref(false)
    const signUp = () =>
    {
            // 调用服务中的方法
            const response = UserRegister(username, password);
           
      
        console.log("返回内容"+response.data)
            console.log("请求失败")
       
    };
    const ifsame = () =>
    {
        same.value = password.value === confirmPassword.value
    }
    const ask_for_send_verification_code = () =>
    {
        console.log('点击了发送验证码按钮')
       
    }
   
</script>
<template>
  
  <div>
    <el-form >
      <el-form-item label="用户名称" >
        <el-input v-model="username" placeholder="这里输入用户名。。"></el-input>
      </el-form-item>

      <el-form-item label="密码" >
        <el-input type="password" v-model="password" placeholder="密码不少于6位，其他要求待添加"  show-password/>
      </el-form-item>

      <el-form-item   label="确认密码">
        <el-input   type="password" v-model="confirmPassword" placeholder="待添加" @input="ifsame"
        ></el-input>
        <el-form-item v-if="!same && confirmPassword !== ''">
          <p>输入的两次密码需相同</p>
        </el-form-item>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="phonenumber" placeholder="请输入11位的手机号！"></el-input>
      </el-form-item>

      <el-form-item label="验证码">
        <el-input v-model="verification_code" placeholder="验证码"></el-input>
        <el-button type="primary" @click="ask_for_send_verification_code">发送验证码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="signUp()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
</style>
<script setup>
    import {ref} from "vue";
    import SignAndLogin from "@/services/SignAndLogin";
    import router from "@/router";
    const emailAddress = ref('');
    const validofemailAddress=ref(false)
    const password = ref('');
      const validofpassword=ref(false)
    const Login = async () =>
    {
        try
        {
            // 调用服务中的方法
            const response = await SignAndLogin.UserLogin(emailAddress, password);
            console.log(response)
        } catch (error)
        {
            console.log(error)
        }
    }
    const checkTheEmailAddress=()=>{
        let emailaddress=emailAddress.value;
      
       validofemailAddress.value=emailaddress.split('@').pop().toLowerCase().split('.').pop()==='com'
        
    }
    const checkThePassword=()=>{
        let passWord=password.value
       validofpassword.value=passWord.length>=6
       
       
    }
    const turnToSignUpPage=()=>{
          
          router.push({path:'/SignUp'})
          
    }
</script>
<template>
    <div>
        <el-form>
            <el-form-item label="邮箱地址">
                <el-input v-model="emailAddress" @input="checkTheEmailAddress"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="password" placeholder="密码不少于6位，其他要求待添加" @input="checkThePassword"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="Login()">登录</el-button>
            </el-form-item>
        </el-form>
        <div><span>还未注册？</span><span @click="turnToSignUpPage">点击这里去注册</span></div>
    </div>
</template>
<style scoped>
</style>
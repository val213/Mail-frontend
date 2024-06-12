<template>
    <div class="signUp">
        <div class="container" id="container">
          <div class="form-container">
            <form>
              <h1 class="title">注 册</h1>
              <span></span>
              <input type="text" placeholder="用户名" v-model="username"/>
              <input type="password" placeholder="密码" v-model="password"/>
              <input type="password" placeholder="确认密码" v-model="confirmPassword" @input="ifSame"/>
              <input type="text" placeholder="手机号" v-model="telephone"/>
              <div class="phone">
                <input type="text" placeholder="验证码" v-model="verification_code"/>
                <button class="sendCode" @click="ask_for_send_verification_code">发送验证码</button>
              </div>
              <div class="signUpBtn" @click="signUp()" >注册</div>
              <button class="goToLogin" @click="turnToLoginPage">已有账号？去登陆</button>
            </form>
          </div>
          <div class="pic-container">
                <img class="logo" src="@/assets/logo.png" alt="" />
                <p>「 更便捷的邮箱系统 」</p>
                <span>Version 1.0.0</span>
          </div>
        </div>
    </div>
  </template>

<script setup>
    import { ref} from "vue";
    import {UserRegister} from "@/services/SignAndLogin";
    import {SendVerificationcode} from "@/services/SignAndLogin";
    import router from "@/router";
    import { useToast } from 'vue-toastification';
    
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('')
    const telephone = ref('')
    const verifycode = ref('')
    const toast = useToast();

    let same = ref(false)
    const signUp = () =>
    {
            // 调用服务中的方法
            const response = UserRegister(username, password,telephone,verifycode);
           if(response.data === 'success')
           {
             toast.success('注册成功');
           }
           else{
             toast.error('注册失败');
           }
            console.log("返回内容"+response.data)
           
       
    };
    const ifSame = () =>
    {
        same.value = password.value === confirmPassword.value
    }
    const ask_for_send_verification_code = () =>
    {
        console.log('点击了发送验证码按钮'+telephone.value);
        const response = SendVerificationcode(telephone);
        if (response.data === 'success')
        {
            console.log('发送验证码成功');
            toast.success('发送验证码成功');
        }
        else
        {
            console.log('发送验证码失败');
            toast.error('发送验证码失败');

            
        }
       
    }
    const turnToLoginPage=()=>{
      
      router.push({path:'/Login'})
      
    }
</script>

<style  scoped>
  .signUp {
    font-family: "Montserrat", sans-serif;
    background: #f6f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(45deg,rgb(155, 231, 243),rgb(196, 196, 242));
    background-size: cover;
  }

  .logo {
    width: 100%;
    height: auto;
  }

  .title {
    font-weight: bold;
    margin: 0;
    color: beige;
  }
  
  p {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  
  span {
    font-size: 12px;
    color: rgb(16, 16, 13);
  }
  
  a {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  
  .container {
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    opacity: 0.8;
  }
  
  .form-container form {
    background: rgba(45, 52, 54, 1);
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }
  
  .signUpBtn {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #1BBFB4;
    background: #1BBFB4;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    margin-top: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .goToLogin {
    cursor: pointer;
    border-radius: 15px;
    border: 1px solid #77d6ff;
    background: #77d6ff;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    padding: 8px 40px;
    margin-top: 15px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  input[type="text"] {
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: "PLay", sans-serif;
    font-size: 16px;
  
    padding: 10px 0;
    outline: none;
    color: #fff;
    font-weight: bold;
  }
  
  input[type="password"] {
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: "PLay", sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
    outline: none;
    color: #fff;
  }

  .phone {  
    display: flex;  
    align-items: center; 
  }  
  
  .phone input[type="text"] {  
    flex: 1; /* 让输入框占据尽可能多的空间 */  
    margin-right: 10px; /* 根据需要调整输入框和按钮之间的间距 */  
  }  
  
  .sendCode {      
    cursor: pointer;
    border-radius: 15px;
    border: 1px solid #77d6ff;
    background: #77d6ff;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    padding: 8px 20px;
    margin-top: 15px;
    letter-spacing: 1px;
    text-transform: uppercase; 
  }
  
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    width: 50%;
  }
  
  .pic-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    display: flex;  
    flex-direction: column;  
    align-items: center;  
    justify-content: center; 
    text-align: center;
  }

  </style>
  
<template>
    <div class="login">
        <div class="container" id="container">
          <div class="form-container">
            <form>
              <h1 class="title">登 录</h1>
              <span></span>
              <input type="email" placeholder="邮箱账号" v-model="emailAddress"  @input="checkTheEmailAddress"/>
              <input type="password" placeholder="密码" v-model="password" @input="checkThePassword"/>
              <div class="loginBtn" @click="Login()" >登录</div>
              <button class="goToSignUp" @click="turnToSignUpPage">还未注册？去注册</button>
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
import {ref} from "vue";
import { UserLogin } from '@/services/SignAndLogin';
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
        const response = await UserLogin(emailAddress, password);
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

<style  scoped>
  .login {
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
  
  .loginBtn {
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

  .goToSignUp {
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
    width: 240px;
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
    width: 240px;
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
  
  input[type="email"] {
    width: 240px;
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
  
  .button:active {
    transform: scale(0.95);
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
  
<template>  
<div class="container">
    <div class="user-profile">  
      <h2>用户个人信息</h2>  
      <form @submit.prevent="updateProfile">  
        <div>  
          <label for="username">用户名:</label>  
          <input type="text" id="username" v-model="userInfo.username" disabled>  
        </div>  
        <div>  
          <label for="email">邮箱:</label>  
          <input type="email" id="email" v-model="userInfo.email" disabled>  
        </div>  
        <!-- 其他的个人信息字段，如姓名、地址等 -->  
    
        <button type="submit" :disabled="!isEditable">保存更改</button>  
        <button @click="toggleEditability">编辑</button>  
        <button @click="toLogin">退出登录</button>  
        <!-- 这里接口还未完善 -->
      </form>  
    </div>  
</div>
  </template>  
    
  <script>  
    import router from "@/router";
  export default {  
    data() {  
      return {  
        userInfo: {  
          username: '张三',  
          email: 'zhangsan@example.com',  
          // 其他...  
        },  
        isEditable: false, // 控制表单是否可编辑  
      };  
    },  
    methods: {  
      toggleEditability() {  
        this.isEditable = !this.isEditable;  
        // 如果表单变为可编辑，可能需要重置一些字段或进行其他逻辑处理  
      },  
      updateProfile() {  
        // 这里应该是发送请求到后端更新用户信息的逻辑  
        // 发送请求后，可能需要重置 isEditable 为 false  
        // 接口未完善
        this.isEditable = false;  
      },  
      toLogin() {
        router.push({path:'/Login'})
      }
    },  
  };  
  </script>  
    
    <style scoped> 
    .container {
        display: flex;  
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
    }

    .user-profile {  
      max-width: 600px;  
      margin: 0 auto;  
      padding: 20px;  
      background-color: #fff;  
      border-radius: 5px;  
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
      width: 500px;
      height: auto;
    }  
      
    h2 {  
      text-align: center;  
      margin-bottom: 20px;  
    }  
      
    form {  
      display: flex;  
      flex-direction: column;  
    }  
      
    form div {  
      margin-bottom: 15px;  
    }  
      
    label {  
      display: block;  
      margin-bottom: 5px;  
    }  
      
    input[type="text"],  
    input[type="email"] {  
      width: 100%;  
      padding: 8px;  
      border: 1px solid #ccc;  
      border-radius: 4px;  
      box-sizing: border-box;  
    }  
      
    input[disabled] {  
      background-color: #f0f0f0;  
    }  
      
    button {  
      padding: 10px 15px;  
      background-color: #cbe6ff;  
      color: white;  
      border: none;  
      border-radius: 4px;  
      cursor: pointer;  
      margin-top: 10px;  
    }  
      
    button:hover {  
      background-color: #a8d4fc;  
    }  
      
    button:disabled {  
      background-color: #ccc;  
      cursor: not-allowed;  
    }  
    </style>
<!-- eslint-disable vue/multi-word-component-names -->
<template>  
    <header class="header">  
      <!-- 横幅或导航栏内容 -->  
      <h1>这是头部</h1>
      <button class="login" @click="clickonLogin">登录/注册</button>
    </header>  
</template>  
    
<script>  
export default {  
  methods: {
      clickonLogin(){
          this.$router.push({path:'/Login'})
          
          
      },
  
  }  
}  
</script> 

<style scoped>  
  .header {  
    height: 60px; 
    background-color: #f8f9fa;
    display: flex;  
    align-items: center;  
    justify-content: center;
    /* border-color: black;
    border-width: 5px;
    border-style: solid; */
  }  
  .login {
    margin-left: auto;
  }
</style>
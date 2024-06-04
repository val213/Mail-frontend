<style scoped>
  .sidebar {
    width: 200px;
    height: 100%;
    background-color: #dee2e6;
    position: fixed;
    left: 0;
    /* border-color: black;
    border-width: 5px;
    border-style: solid; */
  }
</style>
<template>  
    <aside class="sidebar">  
      <!-- 侧边栏内容 -->  
    
      
      
        <div><router-link to="writeEmail">写信</router-link></div>
              <div>  <router-link to="EmailHaveSent">写信箱</router-link></div>
             <div>  <router-link to="EmailHaveReceived">收信箱</router-link></div>
              <div>  <router-link to="StarEmail">星标邮件</router-link></div>
               <div> <router-link to="DraftBox">草稿箱</router-link></div>
             
      <div> <router-link to="JunkMailBox">垃圾箱</router-link>   </div>
      
    </aside>  
</template>
<script >
  export default {
        name: "SideBar"
    }

    
    
    
    
    
</script>
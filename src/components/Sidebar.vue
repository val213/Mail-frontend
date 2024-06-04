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
      <el-menu>
        <el-menu-item index="1" @click="$router.push('writeEmail')">写信</el-menu-item>
        <el-menu-item index="2" @click="$router.push('EmailHaveSent')">写信箱</el-menu-item>
        <el-menu-item index="3" @click="$router.push('EmailHaveReceived')">收信箱</el-menu-item>
        <el-menu-item index="4" @click="$router.push('StarEmail')">星标邮件</el-menu-item>
        <el-menu-item index="5" @click="$router.push('DraftBox')">草稿箱</el-menu-item>
        <el-menu-item index="6" @click="$router.push('JunkMailBox')">垃圾箱</el-menu-item>
      </el-menu>
      
    </aside>  
</template>
<script >
  export default {
        name: "SideBar"
    }

    
    
    
    
    
</script>
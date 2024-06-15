<style scoped>
  .sidebar {
    width: 200px;
    height: 100%;
    background-color: #ffffff;
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
        
        <el-menu-item index="1" @click="$router.push({name:'writeEmail'})">写信</el-menu-item>
        <el-menu-item index="2" @click="$router.push({name:'EmailHaveSent'})">已发送</el-menu-item>
        <el-menu-item index="3" @click="$router.push({name:'EmailHaveReceived'});havenew=false">收信箱
            <span v-if="havenew===true" style="background-color: #e8375a;border-radius: 10px;font-size: 10px;color:
            white">new!</span></el-menu-item>
        <el-menu-item index="4" @click="$router.push({name:'StarEmail'})">星标邮件</el-menu-item>
        <el-menu-item index="5" @click="$router.push({name:'DraftBox'})">草稿箱</el-menu-item>
        <el-menu-item index="6" @click="$router.push({name:'JunkMailBox'})">垃圾箱</el-menu-item>
      </el-menu>
      
    </aside>  
</template>
<script >
    import emitter from '@/services/event_bus.js'
  export default {
        name: "SideBar",
      data(){
            return{
                havenew:false
                
                
                
                
            }
            
      },
      
      
      
      
      
      
      
      
      
      
      
      
      
      created()
      {
          emitter.on('new',(data)=>{
                
                if(data===1)
                {
                    this.havenew=true;
                    
                }
              
                
                
            })
          
          
      }
  }

    
    
    
    
    
</script>
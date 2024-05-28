<script >
    import Header from "@/components/Header.vue";
    import Sidebar from "@/components/Sidebar.vue";
    import MainContent from "@/components/MainContent.vue";
    
    export default {
  components:{MainContent, Sidebar, Header}
    
    }
</script>
<template>
 
      <Header/>
      <Sidebar/>
    <MainContent/>
    
</template>
<style scoped>
</style>
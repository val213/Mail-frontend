<template>


    


 
 <Header/>


 <Sidebar/>
    <MainContent/>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import MainContent from "@/components/MainContent.vue";


export default {
  components: {
      MainContent,
    Header,
    Sidebar,

  }
}
</script>

<style scoped>

</style>

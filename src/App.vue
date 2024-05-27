<template>
    <div class="app">
        <Header /> 
        <Sidebar />
        <MainContent />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    MainContent
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  /* border-color: aqua;
  border-width: 5px;
  border-style: solid; */
}
</style>

<template>
    <RouterView name:WelcomePage></RouterView>

</template>

<script setup>
import {  RouterView } from 'vue-router'
//开局用RouterView 加name:‘//相当于一个路由的标签，用来代指这个路由’实现绕开显示app.vue而显示我需要的页面
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

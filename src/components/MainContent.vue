<template>
  <div class="container">
    <main class="main-content">
      <!-- 主要内容 -->
        <router-view name="Main"/>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.main-content {
  margin-left: 200px; /* 给侧边栏留出空间 */
  flex: 1; /* 让主要内容区域占据剩余空间 */
  /* 其他样式，如宽度、高度等 */
}
</style>

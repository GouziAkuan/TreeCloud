<script setup></script>
<template>
  <div class="logo-box">
    <!-- logo部分 -->
    <el-col class="logo-box">
      <el-image src="/src/assets/images/logo.jpg" class="logo" :fit="cover" />
      <h3 class="logo-title">云端林场后台管理系统</h3>
    </el-col>
  </div>
</template>
<style scoped>
.logo-box {
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.logo {
  width: 5rem;
  height: 5rem;
}

.logo-title {
  font-size: 1.8rem;
}
</style>

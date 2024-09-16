<script setup></script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="1-1"
    text-color="#fff"
    router
  >
    <!-- 树种中心 -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Briefcase /></el-icon>
        <span>树种中心</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1" route="/adminTreeType/treeTypeCenter">树种管理</el-menu-item>
        <el-menu-item index="1-2" route="/adminTreeType/addTreeType">新增树种</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 树木中心 -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>树木中心</span>
      </template>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="2-1" route="/adminTree/treeCenter">树木管理</el-menu-item>
        <el-menu-item index="2-2" route="/adminTree/addTree">新增树木</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 领养中心 -->
    <el-sub-menu index="3">
      <template #title>
        <el-icon><List /></el-icon>
        <span>领养中心</span>
      </template>
      <el-menu-item-group title="Group Three">
        <el-menu-item index="3-1" route="/adminAdopt/adoptCenter">领养管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>

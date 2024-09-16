<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["clickbtn"]);
const btnclick = () => {
  emit("clickbtn");
};
</script>

<template>
  <view class="treelist-item">
    <view class="item-top">
      <view class="list-text">
        <slot name="left">
          <p>油松</p>
          <!-- <p class="two">别名:</p> -->
          <p>总数：11颗</p>
          <p>剩余数量：</p>
          <p>10颗</p>
        </slot>
      </view>

      <view class="treelist-image">
        <slot name="image">
          <image src="https://s21.ax1x.com/2024/09/15/pAuDlAs.jpg"></image>
        </slot>
      </view>
    </view>
    <view class="btn" @click="btnclick">
      <p><slot name="btn">去领养</slot></p>
    </view>
  </view>
</template>

<style scoped>
@import url("../../static/css/treecard.css");
</style>

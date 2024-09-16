<script setup>
import AutoBackVue from "../../../components/AutoBack.vue";
import CenterCard from "../../../components/user/center/CenterCard.vue";
import { NewAccesstoken } from "../../../common/request";
import { BaseUrl } from "../../../common/request";
import { useTokenStore } from "@/store/token";
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const toUpadte = () => {
  const userInfoStr = encodeURIComponent(JSON.stringify(userInfo.value));
  uni.navigateTo({
    url: `/pages/user/UpdateInfo/UpdateInfo?userInfoStr=${userInfoStr}`,
  });
};

const toUserlist = () => {
  uni.navigateTo({
    url: "/pages/user/UserList/UserList",
  });
};

const tokenStore = useTokenStore();

const userInfo = ref({
  username: "默认",
  avatar: `${BaseUrl}/static/mrtx.png`,
  phone: "",
});

// 获取用户信息
const getUserInfo = async () => {
  uni.showLoading({
    title: "加载中",
  });
  const verify = await NewAccesstoken(tokenStore.Accesstoken);
  if (verify) {
    try {
      const res = await uni.request({
        url: `${BaseUrl}/user/getUserInfo`,
        method: "GET",
        header: {
          authorization: `Bearer ${tokenStore.Accesstoken}`,
        },
      });
      console.log(res);
      if (res.data.status !== 200) {
        throw new Error();
      }
      userInfo.value = res.data.data;
    } catch (e) {
      uni.hideLoading();
      uni.showToast({
        title: `请求错误`,
        icon: "error",
      });
    }
  }
  uni.hideLoading();
};

onShow(() => {
  getUserInfo();
});

const load = () => {};
</script>

<template>
  <view class="page">
    <AutoBackVue />
    <image
      class="bg-img"
      src="https://s21.ax1x.com/2024/09/15/pAuDmjS.jpg"
    ></image>
    <!-- 头像 昵称 部分 -->
    <uni-row>
      <uni-col>
        <view class="user-info">
          <view class="user-info__avatar">
            <image
              :src="userInfo.avatar"
              @load="load"
              mode="aspectFill"
            ></image>
          </view>
          <view class="user-info__nickname">
            <text>{{ userInfo.username }}</text>
            <!-- 修改图标 -->
            <image
              src="https://s21.ax1x.com/2024/09/15/pAuDM7j.png"
              @click="toUpadte"
              mode="scaleToFill"
            ></image>
          </view>
        </view>
      </uni-col>
    </uni-row>

    <!-- 功能小卡片 -->
    <uni-row>
      <uni-col span="22" offset="1">
        <view class="gn-card">
          <CenterCard @cardclick="toUserlist">
            <template #title><p>我的认养</p></template>
            <template #text><p>我的树木</p></template>
            <template #image>
              <image
                src="https://s21.ax1x.com/2024/09/15/pAuyZ1x.png"
                class="card-img"
              ></image>
            </template>
          </CenterCard>
          <!-- 来一个默认的为了flex布局 -->
          <CenterCard />
        </view>
      </uni-col>
    </uni-row>
  </view>
</template>

<style scoped>
@import url("../../../static/css/center.css");
</style>

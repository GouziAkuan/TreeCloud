<script setup>
import StatusBar from '../../components/StatusBar.vue';
import { useTokenStore } from '@/store/token';
import { ref } from 'vue';
import { NewAccesstoken } from '../../common/request';
import { onLoad } from '@dcloudio/uni-app';
import { computed } from 'vue';
import { medalStore } from '../../store/medal';

const tokenStore = useTokenStore();
const medal = medalStore();

// 控制组件显示和样式
const showxz = ref(false);

const know = () => {
	showxz.value = false;
	medal.clearMedalInfo();
};

const toCenter = () => {
	uni.navigateTo({
		url: '/pages/user/center/center'
	});
};

const toTree = () => {
	uni.navigateTo({
		url: '/pages/tree/TreeList/TreeList'
	});
};
// 自动登录
const autoLogin = async () => {
	// 是否登录过
	if (tokenStore.RefreshToken) {
		// 如果登录过，则自动登录
		// 调用刷新token接口
		const refreshRes = await NewAccesstoken();
		if (refreshRes) {
			uni.showToast({
				title: '登录成功',
				icon: 'success'
			});
		}
	} else {
		// 如果未登录过，则跳转到登录页面
		uni.navigateTo({
			url: '/pages/user/login/login'
		});
		uni.showToast({
			title: '未登录',
			icon: 'error',
			duration: 2000
		});
	}
};

onLoad((options) => {
	// 避免从领养页面过来还跳自动登录
	if (options.AutoLogin !== 'false') {
		autoLogin();
	} else {
		// 控制勋章显示
		if (medal.medalInfo.adoptionID !== '') {
			showxz.value = true;
		}
	}
});
</script>

<template>
	<view class="page">
		<StatusBar />
		<image class="bg-img" src="https://s21.ax1x.com/2024/09/15/pAuD3hq.jpg"></image>
		<!-- 树林信息 -->
		<uni-row>
			<uni-col span="20" offset="2">
				<view class="tree">
					<view class="tree-top">
						<view class="main">
							<view class="sb">
								<image src="https://s21.ax1x.com/2024/09/15/pAuyZ1x.png"></image>
								<text>树木种类</text>
							</view>
							<text class="dada">18种</text>
						</view>
						<view class="main">
							<view class="sb">
								<image src="https://s21.ax1x.com/2024/09/15/pAuymjK.png"></image>
								<text>树木数量</text>
							</view>
							<text class="dada">70颗</text>
						</view>
					</view>
				</view>
				<view class="tree-btn" @click="toTree">
					<text>欣赏有意思的树~</text>
				</view>
			</uni-col>
		</uni-row>

		<!-- 种树按钮 -->
		<uni-row>
			<uni-col span="20" offset="2">
				<view class="btn">
					<view class="zs-btn" @click="toTree">
						<image src="https://s21.ax1x.com/2024/09/15/pAuyV91.png"></image>
						<p>我要领养</p>
					</view>

					<view class="zs-btn" @click="toCenter">
						<image src="https://s21.ax1x.com/2024/09/15/pAuykN9.png"></image>
						<p>个人中心</p>
					</view>
				</view>
			</uni-col>
		</uni-row>

		<!-- 领取勋章 -->
		<view class="xunzang-box" v-if="showxz">
			<view class="xunzang">
				<view class="xunzhang-main">
					<p class="xz-title">环保勋章</p>

					<view class="xz-img">
						<image mode="aspectFill" :src="medal.medalInfo.avatar"></image>
					</view>
					<view class="xz-content">
						<p class="xz-p">感谢你和云端林场用户一起支持了对林场的保护!</p>
					</view>
					<view class="info">
						<view class="infoitem">
							<text>昵称：</text>
							<text class="tbg">{{ medal.medalInfo.nickName }}</text>
						</view>
						<view class="infoitem">
							<text>证书编号：</text>
							<text class="tbg">{{ medal.medalInfo.adoptionID }}</text>
						</view>
						<view class="infoitem">
							<text>树的类型：</text>
							<text class="tbg">{{ medal.medalInfo.treeType }}</text>
						</view>
					</view>
				</view>
				<p class="konw" @click="know">知道了</p>
			</view>
		</view>
	</view>
</template>

<style scoped>
@import url('../../static/css/index.css');
</style>

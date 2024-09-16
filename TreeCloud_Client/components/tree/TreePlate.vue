<script setup></script>

<template>
	<uni-row>
		<uni-col span="22" offset="1">
			<view class="tree-detail">
				<view class="title">
					<p class="title-text">树木铭牌</p>
					<p class="mp-p">
						树林名称
						<span class="mp-span">“海澄长寿林”古树生态科普基地</span>
					</p>
					<p class="mp-p">
						地址
						<span class="mp-span activeone">珠海市金湾区三灶镇海澄村</span>
					</p>
					<slot>
						<p class="mp-p">
							树种
							<span class="mp-span">树木名字</span>
						</p>
						<p class="mp-p">
							总数
							<span class="mp-span num">10 颗</span>
						</p>
						<p class="mp-p">
							剩余数量
							<span class="mp-span sy">9 颗</span>
						</p>
					</slot>
				</view>
			</view>
		</uni-col>
	</uni-row>
</template>

<style>
/* 树木铭牌 */
.mp-p {
	margin: 25rpx 0;
	font-size: 14px;
	color: #85898b;
}

.mp-span {
	color: black;
	font-weight: 700;
	margin-left: 15rpx;
}

.activeone {
	color: #4ab185;
}

.num {
	font-size: 13px;
	padding: 5rpx 10rpx;
	background-color: #e7f5fe;
	color: #458dda;
	border: 1px solid #458dda;
	text-align: center;
	border-radius: 5px;
	margin-bottom: 25rpx;
}

.sy {
	font-size: 13px;
	padding: 5rpx 10rpx;
	background-color: #ffe5e4;
	color: #cf6c69;
	border: 1px solid #cf7269;
	text-align: center;
	border-radius: 5px;
	margin-bottom: 20rpx;
}

.tree-detail {
	margin-top: 25rpx;
	padding: 35rpx;
	background-color: white;
	border-radius: 5px;
	margin-bottom: 15rpx;
	height: fit-content;
}

.title-text {
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 20rpx;
}
</style>

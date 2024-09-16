// token的pinia模块
import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const useTokenStore = defineStore('token', () => {
	// Accesstoken
	const Accesstoken = ref('')
	// RefreshToken
	const RefreshToken = ref('')
	// 保存Accesstoken
	const saveToken = (token) => {
		Accesstoken.value = token
	}
	// 保存RefreshToken
	const saveRefreshToken = (token) => {
		RefreshToken.value = token
	}
	return {
		Accesstoken,
		RefreshToken,
		saveToken,
		saveRefreshToken
	}
}, {
	unistorage: true, // 开启后对 state 的数据读写都将持久化
}, )
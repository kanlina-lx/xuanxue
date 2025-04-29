<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化全局数据
			this.initGlobalData()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initGlobalData() {
				// 从本地存储获取用户信息
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo) {
					this.globalData.userInfo = userInfo
				}
			}
		},
		globalData: {
			userInfo: null
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
		color: #fff;
	}
</style>

<template>
	<view class="container">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-header">
				<view class="avatar">
					<text class="avatar-text">{{userInitial}}</text>
				</view>
				<view class="user-info">
					<text class="name">{{formData.name || '未设置'}}</text>
					<text class="gender">{{formData.gender === 'male' ? '男' : formData.gender === 'female' ? '女' : '未设置'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 信息编辑卡片 -->
		<view class="form-card">
			<view class="card-header">
				<text class="title">个人信息</text>
				<text class="subtitle">完善信息以获得更准确的运势分析</text>
			</view>
			
			<view class="form-content">
				<view class="form-item">
					<text class="label">姓名</text>
					<input type="text" v-model="formData.name" placeholder="请输入姓名" />
				</view>
				
				<view class="form-item">
					<text class="label">性别</text>
					<view class="radio-group">
						<view class="radio-item" :class="{'active': formData.gender === 'male'}" @click="formData.gender = 'male'">
							<text>男</text>
						</view>
						<view class="radio-item" :class="{'active': formData.gender === 'female'}" @click="formData.gender = 'female'">
							<text>女</text>
						</view>
					</view>
				</view>
				
				<view class="form-item">
					<text class="label">出生日期</text>
					<picker mode="date" :value="formData.birthDate" @change="onDateChange">
						<view class="picker">{{formData.birthDate || '请选择出生日期'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label">出生时间</text>
					<picker mode="time" :value="formData.birthTime" @change="onTimeChange">
						<view class="picker">{{formData.birthTime || '请选择出生时间'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label">出生地点</text>
					<input type="text" v-model="formData.birthPlace" placeholder="请输入出生地点" />
				</view>
			</view>
			
			<button class="submit-btn" @click="submitForm">保存信息</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				birthDate: '',
				birthTime: '',
				birthPlace: '',
				gender: '',
				name: ''
			}
		}
	},
	computed: {
		userInitial() {
			return this.formData.name ? this.formData.name.charAt(0) : '?'
		}
	},
	onLoad() {
		this.getUserInfo()
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			try {
				// 首先检查本地存储
				const localUserInfo = uni.getStorageSync('userInfo')
				if (localUserInfo) {
					this.formData = localUserInfo
					return
				}
				
				// 如果本地没有，则从数据库获取
				const db = uniCloud.database()
				const userInfo = uni.getStorageSync('userInfo')
				
				if (userInfo && userInfo._id) {
					const res = await db.collection('user').doc(userInfo._id).get()
					if (res.data && res.data.length > 0) {
						this.formData = res.data[0]
						// 保存到本地存储
						uni.setStorageSync('userInfo', this.formData)
					}
				}
			} catch (e) {
				console.error('获取用户信息失败：', e)
				uni.showToast({
					title: '获取用户信息失败',
					icon: 'none'
				})
			}
		},
		
		// 日期选择
		onDateChange(e) {
			this.formData.birthDate = e.detail.value
		},
		
		// 时间选择
		onTimeChange(e) {
			this.formData.birthTime = e.detail.value
		},
		
		// 提交表单
		async submitForm() {
			// 表单验证
			if (!this.validateForm()) {
				return
			}
			
			try {
				const db = uniCloud.database()
				let userInfo = uni.getStorageSync('userInfo')
				
				if (userInfo && userInfo._id) {
					// 更新用户信息
					await db.collection('user').doc(userInfo._id).update(this.formData)
				} else {
					// 创建新用户
					const res = await db.collection('user').add(this.formData)
					userInfo = {
						_id: res.id,
						...this.formData
					}
				}
				
				// 更新本地存储
				uni.setStorageSync('userInfo', userInfo)
				
				// 更新全局数据
				getApp().globalData.userInfo = userInfo
				
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
				
			} catch (e) {
				console.error('保存用户信息失败：', e)
				uni.showToast({
					title: '保存失败',
					icon: 'none'
				})
			}
		},
		
		// 表单验证
		validateForm() {
			if (!this.formData.name) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				})
				return false
			}
			
			if (!this.formData.gender) {
				uni.showToast({
					title: '请选择性别',
					icon: 'none'
				})
				return false
			}
			
			if (!this.formData.birthDate) {
				uni.showToast({
					title: '请选择出生日期',
					icon: 'none'
				})
				return false
			}
			
			if (!this.formData.birthTime) {
				uni.showToast({
					title: '请选择出生时间',
					icon: 'none'
				})
				return false
			}
			
			if (!this.formData.birthPlace) {
				uni.showToast({
					title: '请输入出生地点',
					icon: 'none'
				})
				return false
			}
			
			return true
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
	color: #fff;
	padding: 20rpx;
}

.user-card {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.user-header {
	display: flex;
	align-items: center;
	gap: 30rpx;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-text {
	font-size: 48rpx;
	font-weight: bold;
	color: #1a0b2e;
}

.user-info {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.name {
	font-size: 36rpx;
	font-weight: bold;
	color: #ffd700;
}

.gender {
	font-size: 24rpx;
	color: #e6d5ff;
}

.form-card {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.card-header {
	margin-bottom: 40rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #ffd700;
	display: block;
	margin-bottom: 10rpx;
}

.subtitle {
	font-size: 24rpx;
	color: #e6d5ff;
	opacity: 0.8;
}

.form-content {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.form-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.picker,
input {
	height: 80rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	padding: 0 20rpx;
	color: #fff;
	font-size: 28rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.picker {
	display: flex;
	align-items: center;
}

.radio-group {
	display: flex;
	gap: 20rpx;
}

.radio-item {
	flex: 1;
	height: 80rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e6d5ff;
	font-size: 28rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.radio-item.active {
	background: rgba(255,215,0,0.1);
	color: #ffd700;
	border-color: rgba(255,215,0,0.3);
}

.submit-btn {
	margin-top: 40rpx;
	height: 80rpx;
	background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
	color: #1a0b2e;
	font-size: 32rpx;
	font-weight: bold;
	border-radius: 15rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.submit-btn:active {
	opacity: 0.9;
}
</style> 
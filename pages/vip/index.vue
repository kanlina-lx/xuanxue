<template>
	<view class="container">
		<view class="vip-header">
			<image class="vip-bg" src="/static/vip-bg.png" mode="aspectFill"></image>
			<view class="user-info">
				<image class="avatar" src="/static/default-avatar.png"></image>
				<view class="info">
					<text class="nickname">未登录用户</text>
					<text class="vip-status">普通用户</text>
				</view>
			</view>
		</view>
		
		<view class="vip-benefits">
			<view class="section-title">会员特权</view>
			<view class="benefits-list">
				<view class="benefit-item">
					<image src="/static/icons/benefit1.png" mode="aspectFit"></image>
					<text>专业运势分析</text>
				</view>
				<view class="benefit-item">
					<image src="/static/icons/benefit2.png" mode="aspectFit"></image>
					<text>每日运势提醒</text>
				</view>
				<view class="benefit-item">
					<image src="/static/icons/benefit3.png" mode="aspectFit"></image>
					<text>专属运势报告</text>
				</view>
				<view class="benefit-item">
					<image src="/static/icons/benefit4.png" mode="aspectFit"></image>
					<text>玄学知识课程</text>
				</view>
			</view>
		</view>
		
		<view class="vip-packages">
			<view class="section-title">会员套餐</view>
			<view class="package-list">
				<view class="package-item" @click="selectPackage(1)">
					<view class="package-header">
						<text class="package-name">月度会员</text>
						<text class="package-price">¥19.9</text>
					</view>
					<text class="package-desc">解锁所有基础功能</text>
				</view>
				<view class="package-item" @click="selectPackage(2)">
					<view class="package-header">
						<text class="package-name">季度会员</text>
						<text class="package-price">¥49.9</text>
					</view>
					<text class="package-desc">赠送专属运势报告</text>
				</view>
				<view class="package-item" @click="selectPackage(3)">
					<view class="package-header">
						<text class="package-name">年度会员</text>
						<text class="package-price">¥159.9</text>
					</view>
					<text class="package-desc">赠送玄学知识课程</text>
				</view>
			</view>
		</view>
		
		<view class="payment-methods">
			<view class="section-title">支付方式</view>
			<view class="method-list">
				<view class="method-item" @click="selectMethod('wechat')">
					<image src="/static/icons/wechat.png" mode="aspectFit"></image>
					<text>微信支付</text>
					<text class="check" v-if="selectedMethod === 'wechat'">✓</text>
				</view>
				<view class="method-item" @click="selectMethod('alipay')">
					<image src="/static/icons/alipay.png" mode="aspectFit"></image>
					<text>支付宝</text>
					<text class="check" v-if="selectedMethod === 'alipay'">✓</text>
				</view>
			</view>
		</view>
		
		<view class="pay-button" @click="handlePay">
			<text>立即开通</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedPackage: 0,
			selectedMethod: 'wechat'
		}
	},
	methods: {
		selectPackage(index) {
			this.selectedPackage = index
		},
		selectMethod(method) {
			this.selectedMethod = method
		},
		handlePay() {
			if (this.selectedPackage === 0) {
				uni.showToast({
					title: '请选择会员套餐',
					icon: 'none'
				})
				return
			}
			
			// 这里调用支付接口
			uni.showLoading({
				title: '支付中...'
			})
			
			// 模拟支付过程
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
			}, 1500)
		}
	}
}
</script>

<style>
.container {
	background-color: #F5F5F5;
	min-height: 100vh;
}

.vip-header {
	position: relative;
	height: 200px;
}

.vip-bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

.user-info {
	position: absolute;
	bottom: 20px;
	left: 20px;
	display: flex;
	align-items: center;
}

.avatar {
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 15px;
}

.info {
	display: flex;
	flex-direction: column;
}

.nickname {
	font-size: 18px;
	color: #fff;
	margin-bottom: 5px;
}

.vip-status {
	font-size: 14px;
	color: #FFD700;
}

.section-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin: 20px 0 15px 20px;
}

.benefits-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0 15px;
}

.benefit-item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.benefit-item image {
	width: 40px;
	height: 40px;
	margin-bottom: 10px;
}

.benefit-item text {
	font-size: 12px;
	color: #666;
}

.package-list {
	padding: 0 15px;
}

.package-item {
	background-color: #fff;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 15px;
}

.package-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.package-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.package-price {
	font-size: 18px;
	color: #8B4513;
	font-weight: bold;
}

.package-desc {
	font-size: 14px;
	color: #666;
}

.method-list {
	padding: 0 15px;
}

.method-item {
	background-color: #fff;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 15px;
	display: flex;
	align-items: center;
}

.method-item image {
	width: 30px;
	height: 30px;
	margin-right: 15px;
}

.method-item text {
	font-size: 16px;
	color: #333;
}

.check {
	margin-left: auto;
	color: #8B4513;
	font-size: 20px;
}

.pay-button {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	background-color: #8B4513;
	display: flex;
	justify-content: center;
	align-items: center;
}

.pay-button text {
	color: #fff;
	font-size: 16px;
	font-weight: bold;
}
</style> 
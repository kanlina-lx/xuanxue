<template>
	<view class="container">
		<view class="title">指南针命理</view>
		<!-- 点击效果 -->
		<view class="click-effect" v-for="(effect, index) in clickEffects" :key="index"
			:style="{
				left: effect.x + 'px',
				top: effect.y + 'px',
				transform: 'scale(' + effect.scale + ')',
				opacity: effect.opacity
			}">
			<view class="ripple"></view>
			<view class="sparkles">
				<view class="sparkle" v-for="(sparkle, sIndex) in 8" :key="sIndex"
					:style="{ transform: 'rotate(' + (sIndex * 45) + 'deg)' }">
				</view>
			</view>
		</view>
		
		<!-- 流星背景 -->
		<view class="meteor-container">
			<view class="meteor" v-for="(item, index) in 15" :key="index" 
				:style="{ 
					left: Math.random() * 100 + '%',
					top: Math.random() * 100 + '%',
					animationDelay: Math.random() * 5 + 's',
					animationDuration: Math.random() * 2 + 2 + 's',
					transform: 'rotate(' + (Math.random() * 60 - 30) + 'deg)'
				}">
				<view class="meteor-tail"></view>
			</view>
		</view>
		
		<!-- 星空背景 -->
		<view class="stars">
			<view class="star" v-for="(item, index) in 50" :key="'star'+index"
				:style="{
					left: Math.random() * 100 + '%',
					top: Math.random() * 100 + '%',
					animationDelay: Math.random() * 3 + 's',
					transform: 'scale(' + (Math.random() * 0.5 + 0.5) + ')'
				}">
			</view>
		</view>
		
		<!-- 顶部banner -->
		<view class="banner">
			<image src="/static/images/banner.png" mode="aspectFill" class="banner-image"></image>
			<view class="banner-content">
				<view class="banner-title">指南针命理</view>
				<view class="banner-desc">探索命运奥秘，指引人生方向</view>
			</view>
		</view>
		
		<!-- 功能入口 -->
		<view class="function-grid">
			<view class="function-item" v-for="(item, index) in functionList" :key="index" 
				@click="handleClick($event, item.path)">
				<view class="function-icon">
					<image :src="item.icon" mode="aspectFit"></image>
				</view>
				<view class="function-name">{{item.name}}</view>
			</view>
		</view>
		
		<!-- 今日运势 -->
		<view class="today-fortune">
			<view class="fortune-header">
				<text class="fortune-title">今日运势</text>
				<text class="fortune-date">{{currentDate}}</text>
			</view>
			<view class="fortune-content">
				<view class="fortune-item" v-for="(item, index) in fortuneList" :key="index">
					<image :src="item.icon" mode="aspectFit" class="fortune-icon"></image>
					<view class="fortune-info">
						<text class="fortune-name">{{item.name}}</text>
						<text class="fortune-value">{{item.value}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentDate: '',
				functionList: [
					{
						name: '今日运势',
						icon: '/static/images/fortune.png',
						path: '/pages/daily/index'
					},
					{
						name: '正缘分析',
						icon: '/static/images/love.png',
						path: '/pages/love/index'
					},
					{
						name: '生辰四柱',
						icon: '/static/images/birth.png',
						path: '/pages/birth/index'
					},
					{
						name: '十神分析',
						icon: '/static/images/gods.png',
						path: '/pages/gods/index'
					},
					{
						name: '周易占卜',
						icon: '/static/images/zhouyi.png',
						path: '/pages/iching/index'
					},
					{
						name: '周公解梦',
						icon: '/static/images/dream.png',
						path: '/pages/dream/index'
					},
					{
						name: '星座运势',
						icon: '/static/images/star.png',
						path: '/pages/star/index'
					},
					{
						name: '塔罗占卜',
						icon: '/static/images/tarot.png',
						path: '/pages/tarot/index'
					}
				],
				fortuneList: [
					{
						name: '财运',
						value: '★★★★☆',
						icon: '/static/images/money.png'
					},
					{
						name: '事业',
						value: '★★★☆☆',
						icon: '/static/images/career.png'
					},
					{
						name: '感情',
						value: '★★★★★',
						icon: '/static/images/love.png'
					},
					{
						name: '健康',
						value: '★★★☆☆',
						icon: '/static/images/health.png'
					}
				],
				clickEffects: []
			}
		},
		onLoad() {
			this.getCurrentDate()
		},
		methods: {
			getCurrentDate() {
				const date = new Date()
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				this.currentDate = `${year}年${month}月${day}日`
			},
			navigateTo(path) {
				uni.navigateTo({
					url: path
				})
			},
			handleClick(event, path) {
				// 创建点击效果
				const effect = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
					scale: 0,
					opacity: 1
				}
				this.clickEffects.push(effect)
				
				// 动画效果
				setTimeout(() => {
					effect.scale = 1
					effect.opacity = 0
				}, 50)
				
				// 3秒后移除效果
				setTimeout(() => {
					this.clickEffects = this.clickEffects.filter(e => e !== effect)
				}, 3000)
				
				// 导航
				this.navigateTo(path)
			},
			// 跳转到今日运势
			goToDaily() {
				uni.navigateTo({
					url: '/pages/daily/index'
				})
			},
			
			// 跳转到正缘分析
			goToLove() {
				uni.navigateTo({
					url: '/pages/love/index'
				})
			},
			
			// 跳转到生辰四柱
			goToBirth() {
				uni.navigateTo({
					url: '/pages/birth/index'
				})
			},
			
			// 跳转到十神分析
			goToGods() {
				uni.navigateTo({
					url: '/pages/gods/index'
				})
			},
			
			// 跳转到周易占卜
			goToIching() {
				uni.navigateTo({
					url: '/pages/iching/index'
				})
			},
			
			// 跳转到周公解梦
			goToDream() {
				uni.navigateTo({
					url: '/pages/dream/index'
				})
			},
			
			// 跳转到星座运势
			goToStar() {
				uni.navigateTo({
					url: '/pages/star/index'
				})
			},
			
			// 跳转到塔罗占卜
			goToTarot() {
				uni.navigateTo({
					url: '/pages/tarot/index'
				})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
		color: #fff;
		position: relative;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
	
	page {
		background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
		height: 100%;
		width: 100%;
	}
	
	.meteor-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
	}
	
	.meteor {
		position: absolute;
		width: 4rpx;
		height: 4rpx;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 4rpx rgba(255,255,255,0.1),
					0 0 0 8rpx rgba(255,255,255,0.1),
					0 0 20rpx rgba(255,255,255,0.2),
					0 0 40rpx rgba(255,255,255,0.1);
		animation: meteor 4s linear infinite;
		opacity: 0;
	}
	
	.meteor-tail {
		position: absolute;
		width: 100rpx;
		height: 2rpx;
		background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
		transform-origin: left center;
		animation: tail 4s linear infinite;
	}
	
	.stars {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
	}
	
	.star {
		position: absolute;
		width: 4rpx;
		height: 4rpx;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 2rpx rgba(255,255,255,0.1),
					0 0 0 4rpx rgba(255,255,255,0.1),
					0 0 10rpx rgba(255,255,255,0.2);
		animation: twinkle 3s ease-in-out infinite;
	}
	
	@keyframes meteor {
		0% {
			transform: translateX(0) translateY(0);
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			transform: translateX(500rpx) translateY(500rpx);
			opacity: 0;
		}
	}
	
	@keyframes tail {
		0% {
			transform: scaleX(0);
			opacity: 1;
		}
		100% {
			transform: scaleX(1);
			opacity: 0;
		}
	}
	
	@keyframes twinkle {
		0%, 100% {
			opacity: 0.2;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}
	
	.banner {
		position: relative;
		height: 400rpx;
		overflow: hidden;
		z-index: 1;
	}
	
	.banner-image {
		width: 100%;
		height: 100%;
	}
	
	.banner-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(26,11,46,0.3), rgba(26,11,46,0.7));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.banner-title {
		font-size: 48rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
		color: #ffd700;
	}
	
	.banner-desc {
		font-size: 28rpx;
		opacity: 0.9;
		color: #e6d5ff;
	}
	
	.function-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20rpx;
		padding: 30rpx;
		margin-top: -50rpx;
		position: relative;
		z-index: 1;
	}
	
	.function-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		background-color: rgba(255,255,255,0.05);
		border-radius: 20rpx;
		backdrop-filter: blur(10rpx);
		transition: all 0.3s;
		border: 1rpx solid rgba(255,215,0,0.1);
		position: relative;
		overflow: hidden;
	}
	
	.function-item:active {
		transform: scale(0.95);
		background-color: rgba(255,215,0,0.1);
		border-color: rgba(255,215,0,0.3);
		box-shadow: 0 0 20rpx rgba(255,215,0,0.2);
	}
	
	.function-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 10rpx;
	}
	
	.function-icon image {
		width: 100%;
		height: 100%;
	}
	
	.function-name {
		font-size: 24rpx;
		color: #e6d5ff;
	}
	
	.today-fortune {
		margin: 30rpx;
		padding: 30rpx;
		background-color: rgba(255,255,255,0.05);
		border-radius: 20rpx;
		backdrop-filter: blur(10rpx);
		border: 1rpx solid rgba(255,215,0,0.1);
		position: relative;
		z-index: 1;
		overflow: hidden;
	}
	
	.fortune-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.fortune-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #ffd700;
	}
	
	.fortune-date {
		font-size: 24rpx;
		opacity: 0.8;
		color: #e6d5ff;
	}
	
	.fortune-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}
	
	.fortune-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: rgba(255,255,255,0.03);
		border-radius: 15rpx;
		border: 1rpx solid rgba(255,215,0,0.05);
	}
	
	.fortune-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
	
	.fortune-info {
		flex: 1;
	}
	
	.fortune-name {
		font-size: 24rpx;
		opacity: 0.8;
		color: #e6d5ff;
	}
	
	.fortune-value {
		font-size: 28rpx;
		color: #ffd700;
	}
	
	.click-effect {
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		pointer-events: none;
		z-index: 10;
		transform-origin: center;
		transition: all 0.5s ease-out;
	}
	
	.ripple {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%);
		animation: ripple 1s ease-out forwards;
	}
	
	.sparkles {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.sparkle {
		position: absolute;
		width: 4rpx;
		height: 4rpx;
		background: #ffd700;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform-origin: 0 0;
		animation: sparkle 1s ease-out forwards;
	}
	
	@keyframes ripple {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
	
	@keyframes sparkle {
		0% {
			transform: translate(0, 0) scale(1);
			opacity: 1;
		}
		100% {
			transform: translate(50rpx, 50rpx) scale(0);
			opacity: 0;
		}
	}
	
	.fortune-item:active {
		transform: scale(0.98);
		background-color: rgba(255,215,0,0.05);
		border-color: rgba(255,215,0,0.2);
		box-shadow: 0 0 15rpx rgba(255,215,0,0.1);
	}
</style>

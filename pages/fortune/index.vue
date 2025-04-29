<template>
	<view class="container">
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
		
		<!-- 运势卡片 -->
		<view class="fortune-card">
			<view class="card-header">
				<text class="date">{{currentDate}}</text>
				<text class="lunar">{{lunarDate}}</text>
			</view>
			<view class="card-content">
				<view class="fortune-item">
					<text class="label">整体运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" 
							:class="{'active': index < fortune.overall}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">爱情运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" 
							:class="{'active': index < fortune.love}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">事业运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" 
							:class="{'active': index < fortune.career}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">财运</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" 
							:class="{'active': index < fortune.wealth}">★</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 运势详情 -->
		<view class="fortune-detail">
			<view class="detail-item">
				<text class="title">今日运势解析</text>
				<text class="content">{{fortune.detail}}</text>
			</view>
			<view class="detail-item">
				<text class="title">幸运数字</text>
				<view class="lucky-numbers">
					<text class="number" v-for="(num, index) in fortune.luckyNumbers" :key="index">{{num}}</text>
				</view>
			</view>
			<view class="detail-item">
				<text class="title">幸运颜色</text>
				<view class="lucky-colors">
					<view class="color-item" v-for="(color, index) in fortune.luckyColors" :key="index"
						:style="{backgroundColor: color}"></view>
				</view>
			</view>
		</view>
		
		<!-- 运势提醒 -->
		<view class="reminder-section">
			<text class="title">今日提醒</text>
			<view class="reminder-list">
				<view class="reminder-item" v-for="(item, index) in fortune.reminders" :key="index">
					<text class="icon">{{item.type === 'good' ? '✓' : '!'}}</text>
					<text class="text">{{item.content}}</text>
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
			lunarDate: '',
			fortune: {
				overall: 4,
				love: 3,
				career: 4,
				wealth: 3,
				detail: '今天整体运势不错，工作上会有新的机会出现，建议保持积极的态度。感情方面需要多沟通，避免误会。财运方面要谨慎投资，避免冲动消费。',
				luckyNumbers: [3, 7, 9],
				luckyColors: ['#FFD700', '#FF69B4', '#87CEEB'],
				reminders: [
					{type: 'good', content: '适合进行重要决策'},
					{type: 'good', content: '贵人运旺盛，多与人交流'},
					{type: 'bad', content: '注意控制情绪，避免冲动'}
				]
			},
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
			// 这里可以调用农历转换接口获取农历日期
			this.lunarDate = '农历二月初五'
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
	padding: 20rpx;
}

.meteor-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 0;
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

.fortune-card {
	background: linear-gradient(135deg, #8B4513, #A0522D);
	border-radius: 20rpx;
	padding: 30rpx;
	color: #fff;
	margin-bottom: 30rpx;
	position: relative;
	z-index: 1;
}

.card-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
}

.date {
	font-size: 32rpx;
	font-weight: bold;
}

.lunar {
	font-size: 24rpx;
	opacity: 0.8;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.fortune-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.label {
	font-size: 28rpx;
}

.stars {
	display: flex;
}

.star {
	color: #ccc;
	margin-left: 10rpx;
}

.star.active {
	color: #FFD700;
}

.fortune-detail {
	background: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	position: relative;
	z-index: 1;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.detail-item {
	margin-bottom: 30rpx;
}

.detail-item:last-child {
	margin-bottom: 0;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
	color: #ffd700;
}

.content {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
}

.lucky-numbers {
	display: flex;
	gap: 20rpx;
}

.number {
	width: 60rpx;
	height: 60rpx;
	background: #8B4513;
	color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}

.lucky-colors {
	display: flex;
	gap: 20rpx;
}

.color-item {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
}

.reminder-section {
	background: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	position: relative;
	z-index: 1;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.reminder-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-top: 20rpx;
}

.reminder-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.icon {
	width: 40rpx;
	height: 40rpx;
	background: #8B4513;
	color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
}

.text {
	font-size: 28rpx;
	color: #e6d5ff;
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
</style> 
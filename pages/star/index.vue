<template>
	<view class="container">
		<!-- 星座选择 -->
		<view class="select-card">
			<view class="card-header">
				<text class="title">星座运势</text>
				<text class="subtitle">请选择您的星座</text>
			</view>
			<view class="select-content">
				<picker :value="starIndex" :range="stars" @change="onStarChange">
					<view class="picker">{{stars[starIndex] || '请选择星座'}}</view>
				</picker>
				<button class="submit-btn" @click="checkFortune">查看运势</button>
			</view>
		</view>
		
		<!-- 运势分析 -->
		<view class="fortune-card" v-if="showResult">
			<view class="card-header">
				<text class="title">今日运势</text>
				<text class="subtitle">{{stars[starIndex]}} · {{fortune.date}}</text>
			</view>
			<view class="fortune-content">
				<view class="fortune-item">
					<text class="label">整体运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" :class="{'active': index < fortune.overall}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">爱情运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" :class="{'active': index < fortune.love}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">事业运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" :class="{'active': index < fortune.career}">★</text>
					</view>
				</view>
				<view class="fortune-item">
					<text class="label">财运运势</text>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" :class="{'active': index < fortune.wealth}">★</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 详细分析 -->
		<view class="analysis-card" v-if="showResult">
			<view class="card-header">
				<text class="title">运势分析</text>
			</view>
			<view class="analysis-content">
				<view class="analysis-item">
					<text class="label">整体分析</text>
					<text class="value">{{fortune.analysis}}</text>
				</view>
				<view class="analysis-item">
					<text class="label">幸运数字</text>
					<view class="tags">
						<text class="tag" v-for="(num, index) in fortune.luckyNumbers" :key="index">{{num}}</text>
					</view>
				</view>
				<view class="analysis-item">
					<text class="label">幸运颜色</text>
					<view class="tags">
						<text class="tag" v-for="(color, index) in fortune.luckyColors" :key="index">{{color}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 建议提醒 -->
		<view class="advice-card" v-if="showResult">
			<view class="card-header">
				<text class="title">今日建议</text>
			</view>
			<view class="advice-content">
				<view class="advice-item" v-for="(item, index) in fortune.advice" :key="index">
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
			starIndex: 0,
			stars: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
			showResult: false,
			fortune: {
				date: '2024-03-20',
				overall: 4,
				love: 3,
				career: 4,
				wealth: 3,
				analysis: '今日整体运势较好，适合开展新项目。感情方面需要多沟通，事业上有贵人相助。',
				luckyNumbers: [3, 7, 9],
				luckyColors: ['金色', '紫色'],
				advice: [
					{type: 'good', content: '适合参加社交活动'},
					{type: 'good', content: '可以尝试新事物'},
					{type: 'bad', content: '避免冲动消费'}
				]
			}
		}
	},
	methods: {
		onStarChange(e) {
			this.starIndex = e.detail.value
		},
		checkFortune() {
			this.showResult = true
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

.select-card,
.fortune-card,
.analysis-card,
.advice-card {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.card-header {
	margin-bottom: 30rpx;
}

.title {
	font-size: 32rpx;
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

.select-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.picker {
	height: 80rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	padding: 0 20rpx;
	color: #fff;
	font-size: 28rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
	display: flex;
	align-items: center;
}

.submit-btn {
	width: 100%;
	height: 80rpx;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 10rpx;
	color: #1a0b2e;
	font-size: 28rpx;
	font-weight: bold;
}

.fortune-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.fortune-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.stars {
	display: flex;
	gap: 10rpx;
}

.star {
	font-size: 32rpx;
	color: rgba(255,255,255,0.2);
}

.star.active {
	color: #ffd700;
}

.analysis-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.analysis-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.tag {
	padding: 10rpx 20rpx;
	background: rgba(255,215,0,0.1);
	color: #ffd700;
	border-radius: 30rpx;
	font-size: 24rpx;
	border: 1rpx solid rgba(255,215,0,0.2);
}

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.value {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
}

.advice-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.advice-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	border: 1rpx solid rgba(255,215,0,0.05);
}

.advice-item .icon {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	background: rgba(255,215,0,0.1);
	color: #ffd700;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	font-size: 24rpx;
	border: 1rpx solid rgba(255,215,0,0.2);
}

.advice-item .text {
	font-size: 28rpx;
	color: #e6d5ff;
}
</style> 
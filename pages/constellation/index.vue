<template>
	<view class="container">
		<!-- 星座选择 -->
		<view class="constellation-select">
			<view class="select-title">选择你的星座</view>
			<view class="constellation-list">
				<view class="constellation-item" 
					v-for="(item, index) in constellations" 
					:key="index"
					:class="{'active': currentConstellation === item.name}"
					@click="selectConstellation(item)">
					<image :src="item.icon" mode="aspectFit" class="constellation-icon"></image>
					<text class="constellation-name">{{item.name}}</text>
					<text class="constellation-date">{{item.date}}</text>
				</view>
			</view>
		</view>
		
		<!-- 运势展示 -->
		<view class="fortune-show" v-if="currentConstellation">
			<view class="fortune-header">
				<text class="title">{{currentConstellation}}今日运势</text>
				<text class="date">{{currentDate}}</text>
			</view>
			
			<view class="fortune-content">
				<view class="fortune-card">
					<view class="card-title">整体运势</view>
					<view class="stars">
						<text class="star" v-for="(star, index) in 5" :key="index" 
							:class="{'active': index < constellationFortune.overall}">★</text>
					</view>
					<text class="fortune-text">{{constellationFortune.overallText}}</text>
				</view>
				
				<view class="fortune-grid">
					<view class="grid-item">
						<text class="item-title">爱情运势</text>
						<view class="stars">
							<text class="star" v-for="(star, index) in 5" :key="index" 
								:class="{'active': index < constellationFortune.love}">★</text>
						</view>
						<text class="item-text">{{constellationFortune.loveText}}</text>
					</view>
					<view class="grid-item">
						<text class="item-title">事业运势</text>
						<view class="stars">
							<text class="star" v-for="(star, index) in 5" :key="index" 
								:class="{'active': index < constellationFortune.career}">★</text>
						</view>
						<text class="item-text">{{constellationFortune.careerText}}</text>
					</view>
					<view class="grid-item">
						<text class="item-title">财运</text>
						<view class="stars">
							<text class="star" v-for="(star, index) in 5" :key="index" 
								:class="{'active': index < constellationFortune.wealth}">★</text>
						</view>
						<text class="item-text">{{constellationFortune.wealthText}}</text>
					</view>
					<view class="grid-item">
						<text class="item-title">健康运势</text>
						<view class="stars">
							<text class="star" v-for="(star, index) in 5" :key="index" 
								:class="{'active': index < constellationFortune.health}">★</text>
						</view>
						<text class="item-text">{{constellationFortune.healthText}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 运势详情 -->
		<view class="fortune-detail" v-if="currentConstellation">
			<view class="detail-item">
				<text class="title">今日运势解析</text>
				<text class="content">{{constellationFortune.detail}}</text>
			</view>
			<view class="detail-item">
				<text class="title">幸运数字</text>
				<view class="lucky-numbers">
					<text class="number" v-for="(num, index) in constellationFortune.luckyNumbers" :key="index">{{num}}</text>
				</view>
			</view>
			<view class="detail-item">
				<text class="title">幸运颜色</text>
				<view class="lucky-colors">
					<view class="color-item" v-for="(color, index) in constellationFortune.luckyColors" :key="index"
						:style="{backgroundColor: color}"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { images } from '@/utils/images.js'

export default {
	data() {
		return {
			currentDate: '',
			currentConstellation: '',
			constellations: [
				{name: '白羊座', date: '3.21-4.19', icon: images.constellation.aries},
				{name: '金牛座', date: '4.20-5.20', icon: images.constellation.taurus},
				{name: '双子座', date: '5.21-6.21', icon: images.constellation.gemini},
				{name: '巨蟹座', date: '6.22-7.22', icon: images.constellation.cancer},
				{name: '狮子座', date: '7.23-8.22', icon: images.constellation.leo},
				{name: '处女座', date: '8.23-9.22', icon: images.constellation.virgo},
				{name: '天秤座', date: '9.23-10.23', icon: images.constellation.libra},
				{name: '天蝎座', date: '10.24-11.22', icon: images.constellation.scorpio},
				{name: '射手座', date: '11.23-12.21', icon: images.constellation.sagittarius},
				{name: '摩羯座', date: '12.22-1.19', icon: images.constellation.capricorn},
				{name: '水瓶座', date: '1.20-2.18', icon: images.constellation.aquarius},
				{name: '双鱼座', date: '2.19-3.20', icon: images.constellation.pisces}
			],
			constellationFortune: {
				overall: 4,
				overallText: '整体运势不错，适合开展新计划',
				love: 3,
				loveText: '感情运势平稳，需要多沟通',
				career: 4,
				careerText: '事业上有新的机会出现',
				wealth: 3,
				wealthText: '财运一般，建议理性消费',
				health: 4,
				healthText: '健康状况良好，注意作息规律',
				detail: '今天整体运势不错，工作上会有新的机会出现，建议保持积极的态度。感情方面需要多沟通，避免误会。财运方面要谨慎投资，避免冲动消费。',
				luckyNumbers: [3, 7, 9],
				luckyColors: ['#FFD700', '#FF69B4', '#87CEEB']
			}
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
		selectConstellation(item) {
			this.currentConstellation = item.name
			// 这里可以调用API获取星座运势数据
		}
	}
}
</script>

<style>
.container {
	padding: 20rpx;
}

.constellation-select {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
}

.select-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
}

.constellation-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.constellation-item {
	width: calc(33.33% - 20rpx);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx;
	border-radius: 10rpx;
	background: #f8f8f8;
}

.constellation-item.active {
	background: #8B4513;
}

.constellation-item.active .constellation-name,
.constellation-item.active .constellation-date {
	color: #fff;
}

.constellation-icon {
	width: 80rpx;
	height: 80rpx;
	margin-bottom: 10rpx;
}

.constellation-name {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 5rpx;
}

.constellation-date {
	font-size: 24rpx;
	color: #666;
}

.fortune-show {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
}

.fortune-header {
	margin-bottom: 30rpx;
}

.fortune-header .title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	display: block;
}

.fortune-header .date {
	font-size: 24rpx;
	color: #666;
}

.fortune-card {
	background: linear-gradient(135deg, #8B4513, #A0522D);
	border-radius: 20rpx;
	padding: 30rpx;
	color: #fff;
	margin-bottom: 30rpx;
}

.card-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.fortune-text {
	font-size: 28rpx;
	line-height: 1.6;
	margin-top: 20rpx;
}

.fortune-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.grid-item {
	background: #f8f8f8;
	border-radius: 20rpx;
	padding: 20rpx;
}

.item-title {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	display: block;
}

.item-text {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
	display: block;
}

.fortune-detail {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
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
}

.content {
	font-size: 28rpx;
	line-height: 1.6;
	color: #666;
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

.stars {
	display: flex;
}

.star {
	color: #ccc;
	margin-right: 10rpx;
}

.star.active {
	color: #FFD700;
}
</style> 
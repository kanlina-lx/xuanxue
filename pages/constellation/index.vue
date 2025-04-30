<template>
	<view class="container">
		<!-- 流星背景 -->
		<view class="meteor-container">
			<view v-for="(meteor, index) in meteors" :key="index" 
				class="meteor" 
				:style="{
					left: meteor.x + 'px',
					top: meteor.y + 'px',
					transform: `scale(${meteor.size})`,
					opacity: meteor.opacity,
					animationDelay: meteor.delay + 's'
				}">
			</view>
		</view>
		
		<!-- 星空背景 -->
		<view class="star-field">
			<view v-for="(star, index) in stars" :key="index" 
				class="star" 
				:style="{
					left: star.x + 'px',
					top: star.y + 'px',
					transform: `scale(${star.size})`,
					opacity: star.opacity,
					animationDelay: star.delay + 's'
				}">
			</view>
		</view>
		
		<!-- 星座选择 -->
		<view class="constellation-select">
			<view class="title">选择你的星座</view>
			<view class="constellation-list">
				<view v-for="(item, index) in constellations" :key="index" 
					class="constellation-item" 
					:class="{ active: selectedConstellation === item.name }"
					@click="selectConstellation(item)">
					<image class="constellation-icon" :src="item.icon" mode="aspectFit"></image>
					<text class="constellation-name">{{ item.name }}</text>
					<text class="constellation-date">{{ item.date }}</text>
				</view>
			</view>
		</view>
		
		<!-- 运势展示 -->
		<view class="fortune-container" v-if="fortuneData">
			<view class="fortune-header">
				<image class="constellation-icon" :src="selectedConstellationInfo.icon" mode="aspectFit"></image>
				<view class="fortune-title">
					<text class="name">{{ selectedConstellationInfo.name }}</text>
					<text class="date">{{ selectedConstellationInfo.date }}</text>
				</view>
			</view>
			
			<view class="fortune-content">
				<view class="fortune-item">
					<text class="label">整体运势</text>
					<text class="value">{{ fortuneData.overall }}</text>
				</view>
				<view class="fortune-item">
					<text class="label">爱情运势</text>
					<text class="value">{{ fortuneData.love }}</text>
				</view>
				<view class="fortune-item">
					<text class="label">事业运势</text>
					<text class="value">{{ fortuneData.career }}</text>
				</view>
				<view class="fortune-item">
					<text class="label">财运运势</text>
					<text class="value">{{ fortuneData.wealth }}</text>
				</view>
				<view class="fortune-item">
					<text class="label">健康运势</text>
					<text class="value">{{ fortuneData.health }}</text>
				</view>
			</view>
			
			<view class="fortune-advice">
				<text class="title">今日建议</text>
				<text class="content">{{ fortuneData.advice }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedConstellation: '',
			selectedConstellationInfo: null,
			fortuneData: null,
			constellations: [
				{
					name: '白羊座',
					date: '3.21-4.19',
					icon: '/static/images/constellation/aries.png',
					startMonth: 3,
					startDay: 21,
					endMonth: 4,
					endDay: 19
				},
				{
					name: '金牛座',
					date: '4.20-5.20',
					icon: '/static/images/constellation/taurus.png',
					startMonth: 4,
					startDay: 20,
					endMonth: 5,
					endDay: 20
				},
				{
					name: '双子座',
					date: '5.21-6.21',
					icon: '/static/images/constellation/gemini.png',
					startMonth: 5,
					startDay: 21,
					endMonth: 6,
					endDay: 21
				},
				{
					name: '巨蟹座',
					date: '6.22-7.22',
					icon: '/static/images/constellation/cancer.png',
					startMonth: 6,
					startDay: 22,
					endMonth: 7,
					endDay: 22
				},
				{
					name: '狮子座',
					date: '7.23-8.22',
					icon: '/static/images/constellation/leo.png',
					startMonth: 7,
					startDay: 23,
					endMonth: 8,
					endDay: 22
				},
				{
					name: '处女座',
					date: '8.23-9.22',
					icon: '/static/images/constellation/virgo.png',
					startMonth: 8,
					startDay: 23,
					endMonth: 9,
					endDay: 22
				},
				{
					name: '天秤座',
					date: '9.23-10.23',
					icon: '/static/images/constellation/libra.png',
					startMonth: 9,
					startDay: 23,
					endMonth: 10,
					endDay: 23
				},
				{
					name: '天蝎座',
					date: '10.24-11.22',
					icon: '/static/images/constellation/scorpio.png',
					startMonth: 10,
					startDay: 24,
					endMonth: 11,
					endDay: 22
				},
				{
					name: '射手座',
					date: '11.23-12.21',
					icon: '/static/images/constellation/sagittarius.png',
					startMonth: 11,
					startDay: 23,
					endMonth: 12,
					endDay: 21
				},
				{
					name: '摩羯座',
					date: '12.22-1.19',
					icon: '/static/images/constellation/capricorn.png',
					startMonth: 12,
					startDay: 22,
					endMonth: 1,
					endDay: 19
				},
				{
					name: '水瓶座',
					date: '1.20-2.18',
					icon: '/static/images/constellation/aquarius.png',
					startMonth: 1,
					startDay: 20,
					endMonth: 2,
					endDay: 18
				},
				{
					name: '双鱼座',
					date: '2.19-3.20',
					icon: '/static/images/constellation/pisces.png',
					startMonth: 2,
					startDay: 19,
					endMonth: 3,
					endDay: 20
				}
			],
			stars: Array(100).fill().map(() => {
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				const windowHeight = uni.getSystemInfoSync().windowHeight;
				return {
					x: Math.random() * windowWidth,
					y: Math.random() * windowHeight,
					size: Math.random() * 1 + 0.5,
					opacity: Math.random() * 0.5 + 0.5,
					delay: Math.random() * 2
				};
			}),
			meteors: Array(5).fill().map(() => {
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				const windowHeight = uni.getSystemInfoSync().windowHeight;
				return {
					x: Math.random() * windowWidth,
					y: Math.random() * windowHeight,
					size: Math.random() * 1.5 + 0.5,
					opacity: Math.random() * 0.8 + 0.2,
					delay: Math.random() * 3
				};
			})
		}
	},
	onLoad() {
		// 获取用户生日（这里需要从用户信息中获取，暂时使用默认值）
		const birthday = uni.getStorageSync('userBirthday') || '2000-01-01';
		const [year, month, day] = birthday.split('-').map(Number);
		
		// 判断用户星座
		const userConstellation = this.getConstellationByDate(month, day);
		if (userConstellation) {
			this.selectConstellation(userConstellation);
		}
	},
	methods: {
		// 根据日期判断星座
		getConstellationByDate(month, day) {
			for (const constellation of this.constellations) {
				if (constellation.startMonth === constellation.endMonth) {
					// 同月的情况
					if (month === constellation.startMonth && 
						day >= constellation.startDay && 
						day <= constellation.endDay) {
						return constellation;
					}
				} else {
					// 跨月的情况
					if ((month === constellation.startMonth && day >= constellation.startDay) ||
						(month === constellation.endMonth && day <= constellation.endDay)) {
						return constellation;
					}
				}
			}
			return null;
		},
		async selectConstellation(constellation) {
			this.selectedConstellation = constellation.name;
			this.selectedConstellationInfo = constellation;
			
			try {
				// 调用云函数获取星座运势
				const { result } = await uniCloud.callFunction({
					name: 'constellation',
					data: {
						action: 'getFortune',
						constellation: constellation.name
					}
				});
				
				if (result.success) {
					this.fortuneData = result.data;
				} else {
					uni.showToast({
						title: result.error || '获取运势失败',
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('获取星座运势失败:', error);
				uni.showToast({
					title: '获取运势失败',
					icon: 'none'
				});
			}
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
	position: relative;
	overflow: hidden;
}

/* 流星背景 */
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

@keyframes meteor {
	0% {
		transform: translateX(-100rpx) translateY(-100rpx);
		opacity: 1;
	}
	70% {
		opacity: 1;
	}
	100% {
		transform: translateX(1000rpx) translateY(1000rpx);
		opacity: 0;
	}
}

/* 星空背景 */
.star-field {
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
	width: 2rpx;
	height: 2rpx;
	background: #fff;
	border-radius: 50%;
	box-shadow: 0 0 0 2rpx rgba(255,255,255,0.1),
				0 0 0 4rpx rgba(255,255,255,0.1),
				0 0 10rpx rgba(255,255,255,0.2);
	animation: twinkle 3s ease-in-out infinite;
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

/* 星座选择 */
.constellation-select {
	position: relative;
	z-index: 1;
	margin-bottom: 40rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	text-align: center;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255, 215, 0, 0.5);
}

.constellation-list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.constellation-item {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	transition: all 0.3s ease;
}

.constellation-item.active {
	background: rgba(255, 215, 0, 0.2);
	border: 1px solid #ffd700;
}

.constellation-icon {
	width: 80rpx;
	height: 80rpx;
}

.constellation-name {
	font-size: 28rpx;
	font-weight: bold;
}

.constellation-date {
	font-size: 24rpx;
	opacity: 0.8;
}

/* 运势展示 */
.fortune-container {
	position: relative;
	z-index: 1;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
	padding: 30rpx;
}

.fortune-header {
	display: flex;
	align-items: center;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.fortune-title {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.fortune-title .name {
	font-size: 36rpx;
	font-weight: bold;
	color: #ffd700;
}

.fortune-title .date {
	font-size: 24rpx;
	opacity: 0.8;
}

.fortune-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.fortune-item {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10rpx;
	padding: 20rpx;
}

.fortune-item .label {
	font-size: 28rpx;
	color: #ffd700;
	margin-bottom: 10rpx;
	display: block;
}

.fortune-item .value {
	font-size: 28rpx;
	line-height: 1.6;
}

.fortune-advice {
	background: rgba(255, 215, 0, 0.1);
	border-radius: 10rpx;
	padding: 20rpx;
}

.fortune-advice .title {
	font-size: 28rpx;
	color: #ffd700;
	margin-bottom: 10rpx;
	display: block;
}

.fortune-advice .content {
	font-size: 28rpx;
	line-height: 1.6;
}
</style> 
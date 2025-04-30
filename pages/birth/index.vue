<template>
	<view class="container">
		<!-- 用户信息检查 -->
		<view class="user-info-check" v-if="!userInfoComplete">
			<view class="check-content">
				<text class="check-title">信息不完整</text>
				<text class="check-desc">请先完善您的个人信息</text>
				<button class="check-btn" @click="goToUserCenter">去完善</button>
			</view>
		</view>

		<!-- 生辰四柱分析 -->
		<view class="analysis-container" v-else>
			<!-- 四柱展示 -->
			<view class="pillar-section" :class="{'fade-in': showPillars}">
				<view class="pillar-title">
					<text class="title-text">生辰四柱</text>
					<text class="title-desc">您的命理基础</text>
				</view>
				<view class="pillar-grid">
					<view class="pillar-item" v-for="(pillar, index) in pillars" :key="index" 
						:class="{'slide-in': showPillars}" :style="{animationDelay: index * 0.2 + 's'}">
						<view class="pillar-header">
							<text class="pillar-name">{{pillar.name}}</text>
							<text class="pillar-time">{{pillar.time}}</text>
						</view>
						<view class="pillar-content">
							<text class="pillar-value">{{pillar.value}}</text>
							<text class="pillar-element">{{pillar.element}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 五行分析 -->
			<view class="element-section" :class="{'fade-in': showElements}">
				<view class="element-title">
					<text class="title-text">五行分析</text>
					<text class="title-desc">您的五行属性</text>
				</view>
				<view class="element-content">
					<view class="element-item" v-for="(item, index) in elements" :key="index"
						:class="{'slide-in': showElements}" :style="{animationDelay: index * 0.2 + 's'}">
						<view class="element-info">
							<text class="element-name">{{item.name}}</text>
							<text class="element-value">{{item.value}}%</text>
						</view>
						<view class="element-progress">
							<view class="progress-bar" :style="{width: item.value + '%', backgroundColor: item.color}"></view>
						</view>
					</view>
				</view>
			</view>

			<!-- 命理分析 -->
			<view class="analysis-section" :class="{'fade-in': showAnalysis}">
				<view class="analysis-title">
					<text class="title-text">命理分析</text>
					<text class="title-desc">您的命理特点</text>
				</view>
				<view class="analysis-content">
					<view class="analysis-item" v-for="(item, key) in analysis" :key="key"
						:class="{'slide-in': showAnalysis}" :style="{animationDelay: key * 0.2 + 's'}">
						<text class="item-title">{{getAnalysisTitle(key)}}</text>
						<text class="item-content">{{item}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { calculatePillars } from '@/utils/pillarCalculator.js'

export default {
	data() {
		return {
			userInfoComplete: false,
			userInfo: null,
			pillars: [],
			elements: [],
			analysis: {
				character: '',
				career: '',
				love: '',
				health: ''
			},
			showPillars: false,
			showElements: false,
			showAnalysis: false
		}
	},
	onShow() {
		this.checkUserInfo()
	},
	methods: {
		checkUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
				this.userInfoComplete = true
				this.userInfo = userInfo
				this.calculatePillars()
			} else {
				this.userInfoComplete = false
			}
		},
		goToUserCenter() {
			uni.switchTab({
				url: '/pages/user/index'
			})
		},
		calculatePillars() {
			const { pillars, elements } = calculatePillars(this.userInfo.birthDate, this.userInfo.birthTime)
			this.pillars = pillars
			this.elements = elements
			
			// 设置动画延迟
			setTimeout(() => {
				this.showPillars = true
				setTimeout(() => {
					this.showElements = true
					setTimeout(() => {
						this.showAnalysis = true
					}, 500)
				}, 500)
			}, 100)
			
			// 根据五行属性生成分析结果
			this.generateAnalysis(elements)
		},
		getAnalysisTitle(key) {
			const titleMap = {
				character: '性格特点',
				career: '事业运势',
				love: '感情运势',
				health: '健康建议'
			}
			return titleMap[key]
		},
		generateAnalysis(elements) {
			// 找出主要五行属性
			const mainElement = elements.reduce((prev, current) => {
				return (prev.value > current.value) ? prev : current
			})
			
			// 根据主要五行生成分析结果
			const analysisMap = {
				'木': {
					character: '命主五行属木，性格温和善良，富有同情心。木主仁，为人正直，但有时过于理想化。',
					career: '事业发展宜选择与木相关的行业，如教育、医疗、环保等领域。',
					love: '感情运势较为稳定，但需注意避免过于理想化，学会包容和妥协。',
					health: '需注意肝胆系统的保养，建议多进行户外活动，保持心情愉悦。'
				},
				'火': {
					character: '命主五行属火，性格热情开朗，富有创造力。火主礼，为人热情，但需注意控制情绪。',
					career: '事业发展宜选择与火相关的行业，如文化、艺术、传媒等领域。',
					love: '感情运势较为顺利，但需注意与伴侣的沟通，避免因性格急躁而产生矛盾。',
					health: '需注意心脏和血液循环系统的保养，建议多进行有氧运动，保持心情愉悦。'
				},
				'土': {
					character: '命主五行属土，性格稳重踏实，富有责任感。土主信，为人诚信，但有时过于保守。',
					career: '事业发展宜选择与土相关的行业，如建筑、房地产、农业等领域。',
					love: '感情运势较为稳定，但需注意避免过于保守，学会表达情感。',
					health: '需注意脾胃系统的保养，建议保持规律作息，注意饮食健康。'
				},
				'金': {
					character: '命主五行属金，性格果断坚毅，富有正义感。金主义，为人正直，但有时过于固执。',
					career: '事业发展宜选择与金相关的行业，如金融、法律、科技等领域。',
					love: '感情运势较为顺利，但需注意避免过于固执，学会灵活变通。',
					health: '需注意呼吸系统的保养，建议多进行深呼吸练习，保持室内空气流通。'
				},
				'水': {
					character: '命主五行属水，性格聪明机智，富有智慧。水主智，为人聪慧，但有时过于敏感。',
					career: '事业发展宜选择与水相关的行业，如贸易、物流、旅游等领域。',
					love: '感情运势较为顺利，但需注意避免过于敏感，学会理性思考。',
					health: '需注意肾脏和泌尿系统的保养，建议多喝水，保持规律作息。'
				}
			}
			
			this.analysis = analysisMap[mainElement.name]
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

.user-info-check {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.check-content {
	text-align: center;
}

.check-title {
	font-size: 36rpx;
	color: #ffd700;
	margin-bottom: 20rpx;
	display: block;
}

.check-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	margin-bottom: 40rpx;
	display: block;
}

.check-btn {
	width: 200rpx;
	height: 80rpx;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 40rpx;
	color: #1a0b2e;
	font-size: 28rpx;
	font-weight: bold;
}

.analysis-container {
	display: flex;
	flex-direction: column;
	gap: 40rpx;
}

.pillar-section,
.element-section,
.analysis-section {
	background: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s ease;
}

.fade-in {
	opacity: 1;
	transform: translateY(0);
}

.slide-in {
	animation: slideIn 0.5s ease forwards;
	opacity: 0;
	transform: translateX(-20rpx);
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(-20rpx);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.pillar-title,
.element-title,
.analysis-title {
	margin-bottom: 30rpx;
}

.title-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #ffd700;
	display: block;
	margin-bottom: 10rpx;
}

.title-desc {
	font-size: 24rpx;
	color: #e6d5ff;
	opacity: 0.8;
}

.pillar-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.pillar-item {
	background: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	padding: 20rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.pillar-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.pillar-name {
	font-size: 28rpx;
	color: #ffd700;
}

.pillar-time {
	font-size: 24rpx;
	color: #e6d5ff;
}

.pillar-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.pillar-value {
	font-size: 36rpx;
	font-weight: bold;
	color: #fff;
}

.pillar-element {
	font-size: 24rpx;
	color: #e6d5ff;
}

.element-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.element-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.element-info {
	display: flex;
	justify-content: space-between;
}

.element-name {
	font-size: 28rpx;
	color: #e6d5ff;
}

.element-value {
	font-size: 28rpx;
	color: #ffd700;
}

.element-progress {
	height: 8rpx;
	background: rgba(255,255,255,0.1);
	border-radius: 4rpx;
	overflow: hidden;
}

.progress-bar {
	height: 100%;
	border-radius: 4rpx;
	transition: width 0.3s ease;
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

.item-title {
	font-size: 28rpx;
	color: #ffd700;
}

.item-content {
	font-size: 26rpx;
	color: #e6d5ff;
	line-height: 1.6;
}
</style> 
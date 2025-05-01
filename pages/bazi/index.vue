<template>
	<view class="container">
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="i in 200" :key="'star-' + i" :style="getStarStyle(i)"></view>
		</view>

		<!-- 用户信息检查 -->
		<view class="user-info-check" v-if="!userInfoComplete">
			<view class="check-content">
				<text class="check-title">信息不完整</text>
				<text class="check-desc">请先完善您的个人信息</text>
				<button class="check-btn" @click="goToUserCenter">去完善</button>
			</view>
		</view>

		<!-- 生辰八字分析 -->
		<view class="analysis-container" v-else>
			<!-- 八字分析 -->
			<view class="analysis-box" v-if="currentStep === 0" :key="'bazi-analysis-' + lastUpdateTime">
				<view class="analysis-title">生辰八字</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in analysisLines" :key="'analysis-line-' + index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="bazi-grid">
						<view class="bazi-cell" v-for="(pillar, index) in pillars" :key="'pillar-' + index"
							:class="{ 'show': pillar.show }">
							<text class="cell-title">{{pillar.name}}</text>
							<text class="cell-value">{{pillar.value}}</text>
							<text class="cell-element">{{pillar.element}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 五行分析 -->
			<view class="analysis-box" v-if="currentStep === 1" :key="'element-analysis-' + lastUpdateTime">
				<view class="analysis-title">五行分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in elementLines" :key="'element-line-' + index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="element-grid">
						<view class="element-cell" v-for="(value, element) in elements" :key="'element-cell-' + element"
							:class="{ 'show': true }">
							<text class="element-name">{{element}}</text>
							<text class="element-value">{{value.toFixed(1)}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 命盘分析 -->
			<view class="analysis-box" v-if="currentStep === 2" :key="'chart-analysis-' + lastUpdateTime">
				<view class="analysis-title">命盘分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in chartLines" :key="'chart-line-' + index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="chart-grid">
						<view class="chart-cell" v-for="(value, key) in chart" :key="'chart-cell-' + key"
							:class="{ 'show': true }">
							<text class="chart-name">{{getChartTitle(key)}}</text>
							<text class="chart-desc">{{value}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 最终报告 -->
			<view class="final-report" v-if="showReport" :key="'final-report-' + lastUpdateTime">
				<view class="report-content">
					<view class="report-item" :class="{ 'show': reportItem.show }" v-for="(reportItem, index) in reportItems" :key="'report-item-' + index">
						<text class="report-title" v-if="index === 0">生辰八字报告</text>
						<text class="report-summary" v-if="index === 1">{{chart.overall}}</text>
						<view class="section-items" v-if="index === 2">
							<text class="section-title">详细分析</text>
							<view class="section-item" v-for="(value, key) in chart" :key="'section-item-' + key" v-if="key !== 'overall'">
								<text class="item-title">{{getChartTitle(key)}}</text>
								<text class="item-desc">{{value}}</text>
							</view>
						</view>
						<text class="report-conclusion" v-if="index === 3">祝您生活愉快！</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { calculateBazi } from '@/utils/baziCalculator.js'

export default {
	data() {
		return {
			userInfoComplete: false,
			userInfo: null,
			currentStep: 0,
			pillars: [],
			elements: {},
			chart: {
				overall: '',
				personality: '',
				career: '',
				wealth: '',
				love: '',
				health: ''
			},
			analysisLines: [
				{ text: '正在分析八字...', show: false },
				{ text: '正在计算天干地支...', show: false },
				{ text: '正在生成命盘...', show: false }
			],
			elementLines: [
				{ text: '正在分析五行...', show: false },
				{ text: '正在计算旺衰...', show: false },
				{ text: '正在生成运势...', show: false }
			],
			chartLines: [
				{ text: '正在分析命盘...', show: false },
				{ text: '正在计算吉凶...', show: false },
				{ text: '正在生成建议...', show: false }
			],
			showReport: false,
			reportItems: [
				{ show: false },
				{ show: false },
				{ show: false },
				{ show: false }
			],
			lastUpdateTime: null
		}
	},
	onShow() {
		this.checkUserInfo()
	},
	watch: {
		'userInfo.birthDate': {
			handler(newVal) {
				if (newVal) {
					this.resetAnalysis()
					this.startAnalysis()
				}
			},
			deep: true
		}
	},
	methods: {
		resetAnalysis() {
			this.currentStep = 0
			this.pillars = []
			this.elements = {}
			this.chart = {
				overall: '',
				personality: '',
				career: '',
				wealth: '',
				love: '',
				health: ''
			}
			this.showReport = false
			this.reportItems = this.reportItems.map(() => ({ show: false }))
			this.lastUpdateTime = new Date().getTime()
		},
		checkUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
				this.userInfoComplete = true
				this.userInfo = userInfo
				this.resetAnalysis()
				this.startAnalysis()
			} else {
				this.userInfoComplete = false
			}
		},
		goToUserCenter() {
			uni.switchTab({
				url: '/pages/user/index'
			})
		},
		startAnalysis() {
			this.analyzePillars()
		},
		analyzePillars() {
			// 重置分析线状态
			this.analysisLines = this.analysisLines.map(line => ({ ...line, show: false }))
			
			// 显示八字分析线
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算八字
			setTimeout(() => {
				const { pillars } = calculateBazi(this.userInfo.birthDate)
				this.pillars = pillars.map(pillar => ({ ...pillar, show: false }))
				
				// 显示八字结果
				this.pillars.forEach((pillar, index) => {
					setTimeout(() => {
						this.$set(this.pillars, index, { ...pillar, show: true })
					}, index * 200)
				})
				
				setTimeout(() => {
					this.currentStep = 1
					this.analyzeElements()
				}, 2000)
			}, 1500)
		},
		analyzeElements() {
			// 重置五行分析线状态
			this.elementLines = this.elementLines.map(line => ({ ...line, show: false }))
			
			// 显示五行分析线
			this.elementLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.elementLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算五行分布
			setTimeout(() => {
				const { elements } = calculateBazi(this.userInfo.birthDate)
				this.elements = elements
				
				setTimeout(() => {
					this.currentStep = 2
					this.analyzeChart()
				}, 2000)
			}, 1500)
		},
		analyzeChart() {
			// 重置命盘分析线状态
			this.chartLines = this.chartLines.map(line => ({ ...line, show: false }))
			
			// 显示命盘分析线
			this.chartLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.chartLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算命盘
			setTimeout(() => {
				const { chart } = calculateBazi(this.userInfo.birthDate)
				this.chart = chart
				
				// 显示最终报告
				setTimeout(() => {
					this.showReport = true
					this.reportItems.forEach((item, index) => {
						setTimeout(() => {
							this.$set(this.reportItems, index, { ...item, show: true })
						}, index * 500)
					})
				}, 2000)
			}, 1500)
		},
		getChartTitle(key) {
			const titleMap = {
				overall: '整体命盘',
				personality: '性格特点',
				career: '事业运势',
				wealth: '财运分析',
				love: '感情运势',
				health: '健康建议'
			}
			return titleMap[key]
		},
		getStarStyle(index) {
			const x = Math.random() * 100
			const y = Math.random() * 100
			const size = Math.random() * 2 + 1
			const delay = Math.random() * 2
			
			return {
				left: `${x}%`,
				top: `${y}%`,
				width: `${size}rpx`,
				height: `${size}rpx`,
				animationDelay: `${delay}s`
			}
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: #000;
	color: #fff;
	padding: 20rpx;
	position: relative;
	overflow: hidden;
}

.star-field {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background: radial-gradient(circle at center, #000 0%, #1a0b2e 100%);
	pointer-events: none;
}

.stars {
	position: absolute;
	width: 2rpx;
	height: 2rpx;
	background: #fff;
	border-radius: 50%;
	animation: twinkle 2s infinite;
	box-shadow: 0 0 5rpx #fff;
}

@keyframes twinkle {
	0%, 100% { opacity: 0.2; transform: scale(1); }
	50% { opacity: 1; transform: scale(1.5); }
}

.user-info-check {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 2;
}

.check-content {
	text-align: center;
}

.check-title {
	font-size: 36rpx;
	color: #ffd700;
	margin-bottom: 20rpx;
	display: block;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.check-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	margin-bottom: 40rpx;
	display: block;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.check-btn {
	width: 200rpx;
	height: 80rpx;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 40rpx;
	color: #1a0b2e;
	font-size: 28rpx;
	font-weight: bold;
	box-shadow: 0 0 20rpx rgba(255,215,0,0.5);
}

.analysis-container {
	position: relative;
	z-index: 2;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.analysis-box {
	width: 500rpx;
	height: 500rpx;
	background: transparent;
	border-radius: 20rpx;
	padding: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: visible;
}

.analysis-title {
	font-size: 42rpx;
	color: #ffd700;
	margin-bottom: 50rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	position: relative;
	z-index: 2;
	animation: titleGlow 2s infinite;
	width: 100%;
	text-align: center;
}

@keyframes titleGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8), 0 0 30rpx rgba(255,215,0,0.6); }
}

.analysis-content {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	position: relative;
	z-index: 2;
	margin-top: 30rpx;
	width: 100%;
}

.analysis-line {
	color: #ffd700;
	font-size: 36rpx;
	margin-bottom: 30rpx;
	opacity: 0;
	transform: translateX(-20rpx);
	transition: all 0.3s ease;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	position: relative;
	width: 100%;
	text-align: center;
}

.analysis-line.show {
	opacity: 1;
	transform: translateX(0);
	animation: textGlow 2s infinite;
}

@keyframes textGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.bazi-grid,
.element-grid,
.chart-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.bazi-cell,
.element-cell,
.chart-cell {
	background: transparent;
	border-radius: 10rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: scale(0.8);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.bazi-cell.show,
.element-cell.show,
.chart-cell.show {
	opacity: 1;
	transform: scale(1);
	animation: cellGlow 2s infinite;
}

@keyframes cellGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.cell-title,
.element-name,
.chart-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.cell-value,
.element-value,
.chart-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.cell-element {
	font-size: 24rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	margin-top: 10rpx;
}

.final-report {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	z-index: 3;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}

.report-content {
	width: 80%;
	max-height: 80%;
	overflow-y: auto;
	padding: 40rpx;
	background: transparent;
	border-radius: 20rpx;
}

.report-item {
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s ease;
	margin-bottom: 40rpx;
}

.report-item.show {
	opacity: 1;
	transform: translateY(0);
}

.report-title {
	font-size: 48rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: block;
	text-align: center;
	margin-bottom: 40rpx;
	animation: titleGlow 2s infinite;
}

.report-summary {
	font-size: 32rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	display: block;
	margin-bottom: 40rpx;
	line-height: 1.6;
}

.section-title {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: block;
	margin-bottom: 20rpx;
}

.section-items {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.section-item {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	line-height: 1.6;
	padding-left: 20rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.item-title {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.item-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.report-conclusion {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: block;
	margin-top: 40rpx;
	line-height: 1.6;
	text-align: center;
	font-weight: bold;
}

.element-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
	margin-top: 30rpx;
}

.element-cell {
	background: transparent;
	border-radius: 10rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	opacity: 0;
	transform: scale(0.8);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.element-cell.show {
	opacity: 1;
	transform: scale(1);
	animation: cellGlow 2s infinite;
}

.element-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.element-value {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}
</style> 
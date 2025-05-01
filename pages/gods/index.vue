<template>
	<view class="container">
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="i in 200" :key="i" :style="getStarStyle(i)"></view>
		</view>
		
		<!-- 分析流程 -->
		<view class="analysis-container">
			<!-- 天干十神分析 -->
			<view class="analysis-box" v-if="currentStep === 0">
				<view class="analysis-title">天干十神分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="gods-grid">
						<view class="god-cell" v-for="(god, index) in gods" :key="index"
							:class="{ 'show': god.show }">
							<text class="cell-title">{{god.name}}</text>
							<text class="cell-value">{{god.value}}</text>
							<text class="cell-type">{{god.type}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 地支藏干分析 -->
			<view class="analysis-box" v-if="currentStep === 1">
				<view class="analysis-title">地支藏干分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in branchLines" :key="index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="branch-grid">
						<view class="branch-cell" v-for="(branch, index) in branches" :key="index"
							:class="{ 'show': branch.show }">
							<text class="cell-title">{{branch.name}}</text>
							<view class="hidden-gods">
								<view class="hidden-god" v-for="(god, gIndex) in branch.gods" :key="gIndex">
									<text class="god-name">{{god.name}}</text>
									<text class="god-weight">{{(god.weight * 100).toFixed(0)}}%</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 十神组合分析 -->
			<view class="analysis-box" v-if="currentStep === 2">
				<view class="analysis-title">十神组合分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in combinationLines" :key="index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="combination-grid">
						<view class="combination-cell" v-for="(combo, index) in combinations" :key="index"
							:class="{ 'show': combo.show }">
							<text class="cell-title">{{combo.name}}</text>
							<text class="cell-desc">{{combo.desc}}</text>
							<view class="combo-bar">
								<view class="bar-fill" :style="{width: combo.score + '%'}"></view>
							</view>
							<text class="cell-score">{{combo.score}}%</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 最终报告 -->
			<view class="final-report" v-if="showReport">
				<view class="report-content">
					<view class="report-item" v-for="(item, index) in reportItems" :key="index"
						:class="{ 'show': item.show }">
						<text class="report-title" v-if="index === 0">十神分析报告</text>
						<text class="report-summary" v-if="index === 1">{{report.summary}}</text>
						<view class="section-items" v-if="index === 2">
							<text class="section-title">详细分析</text>
							<view class="section-item" v-for="(value, key) in report.details" :key="key">
								<text class="item-title">{{getReportTitle(key)}}</text>
								<text class="item-desc">{{value}}</text>
							</view>
						</view>
						<text class="report-conclusion" v-if="index === 3">{{report.conclusion}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { calculateTenGods } from '@/utils/tenGodsCalculator.js'

export default {
	data() {
		return {
			showAnimation: true,
			currentStep: 0,
			userInfo: null,
			analysisLines: [
				{ text: '正在分析天干...', show: false },
				{ text: '正在计算十神...', show: false },
				{ text: '正在生成结果...', show: false }
			],
			branchLines: [
				{ text: '正在分析地支...', show: false },
				{ text: '正在计算藏干...', show: false },
				{ text: '正在生成结果...', show: false }
			],
			combinationLines: [
				{ text: '正在分析组合...', show: false },
				{ text: '正在计算影响...', show: false },
				{ text: '正在生成结果...', show: false }
			],
			gods: [],
			branches: [],
			combinations: [],
			showReport: false,
			reportItems: [
				{ show: false },
				{ show: false },
				{ show: false },
				{ show: false }
			],
			report: {
				summary: '',
				details: {},
				conclusion: ''
			}
		}
	},
	onShow() {
		this.checkUserInfo()
	},
	methods: {
		checkUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
				this.userInfo = userInfo
				this.startAnalysis()
			} else {
				uni.switchTab({
					url: '/pages/user/index'
				})
			}
		},
		startAnalysis() {
			this.analyzeTenGods()
		},
		analyzeTenGods() {
			// 重置分析线状态
			this.analysisLines = this.analysisLines.map(line => ({ ...line, show: false }))
			
			// 显示分析线
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算十神
			setTimeout(() => {
				const { gods } = calculateTenGods(this.userInfo.birthDate)
				this.gods = gods.map(god => ({ ...god, show: false }))
				
				// 显示十神结果
				this.gods.forEach((god, index) => {
					setTimeout(() => {
						this.$set(this.gods, index, { ...god, show: true })
					}, index * 200)
				})
				
				setTimeout(() => {
					this.currentStep = 1
					this.analyzeBranchGods()
				}, 2000)
			}, 1500)
		},
		analyzeBranchGods() {
			// 重置分析线状态
			this.branchLines = this.branchLines.map(line => ({ ...line, show: false }))
			
			// 显示分析线
			this.branchLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.branchLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算地支藏干
			setTimeout(() => {
				const { branches } = calculateTenGods(this.userInfo.birthDate)
				this.branches = branches.map(branch => ({ ...branch, show: false }))
				
				// 显示地支藏干结果
				this.branches.forEach((branch, index) => {
					setTimeout(() => {
						this.$set(this.branches, index, { ...branch, show: true })
					}, index * 200)
				})
				
				setTimeout(() => {
					this.currentStep = 2
					this.analyzeCombinations()
				}, 2000)
			}, 1500)
		},
		analyzeCombinations() {
			// 重置分析线状态
			this.combinationLines = this.combinationLines.map(line => ({ ...line, show: false }))
			
			// 显示分析线
			this.combinationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.combinationLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算十神组合
			setTimeout(() => {
				const { combinations } = calculateTenGods(this.userInfo.birthDate)
				this.combinations = combinations.map(combo => ({ ...combo, show: false }))
				
				// 显示组合结果
				this.combinations.forEach((combo, index) => {
					setTimeout(() => {
						this.$set(this.combinations, index, { ...combo, show: true })
					}, index * 200)
				})
				
				setTimeout(() => {
					this.generateReport()
				}, 2000)
			}, 1500)
		},
		generateReport() {
			const { report } = calculateTenGods(this.userInfo.birthDate)
			this.report = report
			
			// 显示报告内容
			this.reportItems.forEach((item, index) => {
				setTimeout(() => {
					this.$set(this.reportItems, index, { ...item, show: true })
				}, index * 500)
			})
			
			setTimeout(() => {
				this.showReport = true
			}, this.reportItems.length * 500)
		},
		getReportTitle(key) {
			const titleMap = {
				dominant: '主导十神',
				strength: '十神力量',
				balance: '五行平衡',
				career: '事业建议',
				wealth: '财运分析',
				relationship: '感情分析'
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

.analysis-container {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 20rpx;
}

.analysis-box {
	background: transparent;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	width: 80%;
	max-width: 600rpx;
	text-align: center;
}

.analysis-title {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	margin-bottom: 20rpx;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.analysis-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
}

.analysis-line {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	text-align: center;
	font-weight: bold;
	letter-spacing: 2rpx;
}

.analysis-line.show {
	opacity: 1;
	transform: translateY(0);
	animation: textGlow 2s infinite;
}

@keyframes textGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.gods-grid, .branch-grid, .combination-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	margin-top: 20rpx;
	width: 100%;
}

.god-cell, .branch-cell, .combination-cell {
	background: rgba(255,215,0,0.1);
	border-radius: 10rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: scale(0.8);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.god-cell.show, .branch-cell.show, .combination-cell.show {
	opacity: 1;
	transform: scale(1);
	animation: cellGlow 2s infinite;
}

@keyframes cellGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.5); }
}

.cell-title {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.cell-value, .cell-type, .cell-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.hidden-gods {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.hidden-god {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.god-name {
	font-size: 28rpx;
	color: #e6d5ff;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.god-weight {
	font-size: 24rpx;
	color: #ffd700;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.combo-bar {
	height: 10rpx;
	background: rgba(255,215,0,0.1);
	border-radius: 5rpx;
	overflow: hidden;
	margin: 10rpx 0;
}

.bar-fill {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 5rpx;
	transition: width 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.cell-score {
	font-size: 24rpx;
	color: #ffd700;
	text-align: right;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
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
	animation: fadeIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes fadeIn {
	from { opacity: 0; transform: scale(0.9); }
	to { opacity: 1; transform: scale(1); }
}

.report-content {
	width: 90%;
	max-height: 90vh;
	overflow-y: auto;
	padding: 40rpx;
	background: transparent;
	border-radius: 20rpx;
}

.report-item {
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	margin-bottom: 40rpx;
	width: 100%;
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
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

@keyframes titleGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.report-summary {
	font-size: 32rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	display: block;
	margin-bottom: 40rpx;
	line-height: 1.8;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	text-align: left;
	white-space: pre-wrap;
	word-wrap: break-word;
}

.section-title {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: block;
	margin-bottom: 20rpx;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.section-items {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	width: 100%;
}

.section-item {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	line-height: 1.8;
	padding: 20rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	background: rgba(255,215,0,0.05);
	border-radius: 10rpx;
}

.item-title {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	margin-bottom: 10rpx;
}

.item-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 1.8;
}

.report-conclusion {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: block;
	margin-top: 40rpx;
	line-height: 1.8;
	text-align: center;
	font-weight: bold;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	white-space: pre-wrap;
	word-wrap: break-word;
}

/* 添加滚动条样式 */
.report-content::-webkit-scrollbar {
	width: 6rpx;
}

.report-content::-webkit-scrollbar-thumb {
	background: rgba(255,215,0,0.3);
	border-radius: 3rpx;
}

.report-content::-webkit-scrollbar-track {
	background: rgba(255,215,0,0.1);
	border-radius: 3rpx;
}
</style> 
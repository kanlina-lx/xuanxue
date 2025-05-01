<template>
	<view class="container">
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="(star, index) in stars" :key="'star-' + index" 
				:style="{
					left: star.x + 'px',
					top: star.y + 'px',
					width: star.size + 'px',
					height: star.size + 'px',
					opacity: star.opacity,
					animationDelay: star.delay + 's'
				}">
			</view>
		</view>

		<!-- 用户信息检查 -->
		<view class="user-info-check" v-if="!userInfoComplete">
			<view class="check-content">
				<text class="check-title">信息不完整</text>
				<text class="check-desc">请先完善您的个人信息</text>
				<button class="check-btn" @click="goToUserCenter">去完善</button>
			</view>
		</view>

		<!-- 今日运势分析 -->
		<view class="analysis-container" v-else>
			<!-- 八字分析 -->
			<view class="analysis-box" v-if="currentStep === 0" :key="'bazi-analysis-' + lastUpdateTime">
				<view class="analysis-title">今日八字</view>
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

			<!-- 运势分析 -->
			<view class="analysis-box" v-if="currentStep === 2" :key="'fortune-analysis-' + lastUpdateTime">
				<view class="analysis-title">运势分析</view>
				<view class="analysis-content">
					<view class="analysis-line" v-for="(line, index) in fortuneLines" :key="'fortune-line-' + index"
						:class="{ 'show': line.show }">{{line.text}}</view>
					<view class="fortune-grid">
						<view class="fortune-cell" v-for="(value, key) in fortune" :key="'fortune-cell-' + key"
							:class="{ 'show': true }">
							<text class="fortune-name">{{getFortuneTitle(key)}}</text>
							<text class="fortune-desc">{{value}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 最终报告 -->
			<view class="final-report" v-if="showReport" :key="'final-report-' + lastUpdateTime">
				<view class="report-content">
					<view class="report-item" :class="{ 'show': reportItem.show }" v-for="(reportItem, index) in reportItems" :key="'report-item-' + index">
						<text class="report-title" v-if="index === 0">今日运势报告</text>
						<text class="report-summary" v-if="index === 1">{{fortune.overall}}</text>
						<view class="section-items" v-if="index === 2">
							<text class="section-title">详细分析</text>
							<view class="section-item" v-for="(value, key) in fortune" :key="'section-item-' + key" v-if="key !== 'overall'">
								<text class="item-title">{{getFortuneTitle(key)}}</text>
								<text class="item-desc">{{value}}</text>
							</view>
						</view>
						<text class="report-conclusion" v-if="index === 3">祝您今日好运！</text>
					</view>
					<!-- 报告底部按钮 -->
					<view class="report-buttons">
						<view class="report-btn recalculate" @click="recalculate">
							<text>重新计算</text>
						</view>
						<view class="report-btn back-home" @click="goToHome">
							<text>返回首页</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { calculateFortune } from '@/utils/fortuneCalculator.js'

export default {
	data() {
		return {
			userInfoComplete: false,
			userInfo: null,
			currentStep: 0,
			pillars: [],
			elements: {},
			fortune: {
				overall: '',
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
			fortuneLines: [
				{ text: '正在分析运势...', show: false },
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
			lastUpdateTime: null,
			stars: [],
			meteors: [],
			showRecalculateBtn: false,
		}
	},
	onShow() {
		this.checkUserInfo()
	},
	onLoad() {
		this.initBackground()
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
		initBackground() {
			// 从缓存中获取星星数据
			const cachedStars = uni.getStorageSync('backgroundStars');
			if (cachedStars && cachedStars.length > 0) {
				this.stars = cachedStars;
				return;
			}
			
			// 如果没有缓存，生成新的星星数据
			const windowWidth = uni.getSystemInfoSync().windowWidth;
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			
			const stars = Array(200).fill().map(() => ({
				x: Math.random() * windowWidth,
				y: Math.random() * windowHeight,
				size: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.5,
				delay: Math.random() * 2
			}));
			
			// 保存到缓存
			uni.setStorageSync('backgroundStars', stars);
			this.stars = stars;
		},
		resetAnalysis() {
			this.currentStep = 0
			this.pillars = []
			this.elements = {}
			this.fortune = {
				overall: '',
				career: '',
				wealth: '',
				love: '',
				health: ''
			}
			this.showReport = false
			this.reportItems = this.reportItems.map(() => ({ show: false }))
			this.lastUpdateTime = new Date().getTime()
			// 清除运势数据缓存
			uni.removeStorageSync('fortuneData')
		},
		checkUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo && userInfo.birthDate && userInfo.birthTime && userInfo.birthPlace) {
				this.userInfoComplete = true
				// 检查用户信息是否有变化
				if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
					this.userInfo = userInfo
					this.resetAnalysis()
					this.startAnalysis()
				}
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
			if (!this.userInfo || !this.userInfo.birthDate) {
				console.error('用户信息不完整')
				uni.switchTab({
					url: '/pages/user/index',
					fail: (err) => {
						console.error('跳转失败:', err)
						uni.showToast({
							title: '请先完善个人信息',
							icon: 'none',
							duration: 2000
						})
					}
				})
				return
			}
			
			// 重置分析状态
			this.currentStep = 0
			this.pillars = []
			this.elements = {}
			this.fortune = {
				overall: '',
				career: '',
				wealth: '',
				love: '',
				health: ''
			}
			this.showReport = false
			this.reportItems = this.reportItems.map(() => ({ show: false }))
			this.lastUpdateTime = new Date().getTime()
			
			// 开始完整的分析流程
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
			
			// 计算今日八字
			setTimeout(() => {
				const today = new Date()
				const birthDate = new Date(this.userInfo.birthDate)
				const birthTime = this.userInfo.birthTime.split(':')
				const birthHour = parseInt(birthTime[0])
				const birthMinute = parseInt(birthTime[1])
				
				// 使用用户生日和出生时间生成种子
				const seed = this.generateSeed(birthDate, birthHour, birthMinute)
				
				// 根据种子生成八字
				const pillars = this.generatePillars(seed, today)
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
				const birthDate = new Date(this.userInfo.birthDate)
				const birthTime = this.userInfo.birthTime.split(':')
				const birthHour = parseInt(birthTime[0])
				const birthMinute = parseInt(birthTime[1])
				
				// 使用用户信息生成五行数据
				const elements = this.calculateElements(birthDate, birthHour, birthMinute)
				this.elements = elements
				
				setTimeout(() => {
					this.currentStep = 2
					this.analyzeFortune()
				}, 2000)
			}, 1500)
		},
		analyzeFortune() {
			// 重置运势分析线状态
			this.fortuneLines = this.fortuneLines.map(line => ({ ...line, show: false }))
			
			// 显示运势分析线
			this.fortuneLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.fortuneLines, index, { ...line, show: true })
				}, index * 500)
			})
			
			// 计算运势
			setTimeout(() => {
				const birthDate = new Date(this.userInfo.birthDate)
				const birthTime = this.userInfo.birthTime.split(':')
				const birthHour = parseInt(birthTime[0])
				const birthMinute = parseInt(birthTime[1])
				const birthPlace = this.userInfo.birthPlace
				
				// 使用用户信息生成运势数据
				const fortune = this.calculateFortune(birthDate, birthHour, birthMinute, birthPlace)
				this.fortune = fortune
				
				// 显示最终报告
				setTimeout(() => {
					this.showReport = true
					
					// 逐项显示报告内容
					this.reportItems.forEach((item, index) => {
						setTimeout(() => {
							this.$set(this.reportItems, index, { ...item, show: true })
						}, index * 500)
					})
				}, 2000)
			}, 1500)
		},
		// 生成种子值
		generateSeed(birthDate, birthHour, birthMinute) {
			const year = birthDate.getFullYear()
			const month = birthDate.getMonth() + 1
			const day = birthDate.getDate()
			return year * 1000000 + month * 10000 + day * 100 + birthHour * 10 + birthMinute
		},
		// 生成八字
		generatePillars(seed, today) {
			const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
			const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
			const elements = ['木', '火', '土', '金', '水']
			
			// 使用种子生成随机但固定的八字
			const yearIndex = (seed + today.getFullYear()) % heavenlyStems.length
			const monthIndex = (seed + today.getMonth() + 1) % heavenlyStems.length
			const dayIndex = (seed + today.getDate()) % heavenlyStems.length
			const hourIndex = (seed + today.getHours()) % heavenlyStems.length
			
			return [
				{
					name: '年柱',
					value: heavenlyStems[yearIndex] + earthlyBranches[yearIndex % earthlyBranches.length],
					element: elements[yearIndex % elements.length]
				},
				{
					name: '月柱',
					value: heavenlyStems[monthIndex] + earthlyBranches[monthIndex % earthlyBranches.length],
					element: elements[monthIndex % elements.length]
				},
				{
					name: '日柱',
					value: heavenlyStems[dayIndex] + earthlyBranches[dayIndex % earthlyBranches.length],
					element: elements[dayIndex % elements.length]
				},
				{
					name: '时柱',
					value: heavenlyStems[hourIndex] + earthlyBranches[hourIndex % earthlyBranches.length],
					element: elements[hourIndex % elements.length]
				}
			]
		},
		// 计算五行
		calculateElements(birthDate, birthHour, birthMinute) {
			const seed = this.generateSeed(birthDate, birthHour, birthMinute)
			const elements = ['木', '火', '土', '金', '水']
			const result = {}
			
			elements.forEach((element, index) => {
				// 使用种子生成每个元素的强度
				const strength = (seed * (index + 1)) % 100
				result[element] = strength
			})
			
			return result
		},
		// 计算运势
		calculateFortune(birthDate, birthHour, birthMinute, birthPlace) {
			const seed = this.generateSeed(birthDate, birthHour, birthMinute)
			const placeSeed = this.hashString(birthPlace)
			const combinedSeed = seed + placeSeed
			
			// 运势描述模板
			const careerTemplates = [
				'工作顺利，有贵人相助',
				'需要谨慎处理工作关系',
				'有新的工作机会出现',
				'工作压力较大，需要调整心态',
				'适合学习新技能，提升自己'
			]
			
			const wealthTemplates = [
				'财运亨通，有意外之财',
				'需要谨慎投资，避免风险',
				'正财稳定，偏财一般',
				'有破财风险，注意理财',
				'适合进行长期投资规划'
			]
			
			const loveTemplates = [
				'桃花运旺盛，易遇良缘',
				'感情稳定，适合进一步发展',
				'需要多沟通，避免误会',
				'单身者有机会遇到心仪对象',
				'注意处理感情中的小矛盾'
			]
			
			const healthTemplates = [
				'身体健康，精力充沛',
				'注意休息，避免过度劳累',
				'需要加强锻炼，提高免疫力',
				'注意饮食健康，避免暴饮暴食',
				'保持良好的作息习惯'
			]
			
			// 使用种子选择运势描述
			const careerIndex = (combinedSeed * 1) % careerTemplates.length
			const wealthIndex = (combinedSeed * 2) % wealthTemplates.length
			const loveIndex = (combinedSeed * 3) % loveTemplates.length
			const healthIndex = (combinedSeed * 4) % healthTemplates.length
			
			// 生成整体运势
			const overallScore = (seed % 60) + 40 // 40-100分
			let overallDesc = ''
			if (overallScore >= 90) {
				overallDesc = '大吉大利，诸事顺遂'
			} else if (overallScore >= 80) {
				overallDesc = '运势不错，把握机会'
			} else if (overallScore >= 70) {
				overallDesc = '运势平稳，稳中求进'
			} else if (overallScore >= 60) {
				overallDesc = '运势一般，谨慎行事'
			} else {
				overallDesc = '运势低迷，韬光养晦'
			}
			
			return {
				overall: overallDesc,
				career: careerTemplates[careerIndex],
				wealth: wealthTemplates[wealthIndex],
				love: loveTemplates[loveIndex],
				health: healthTemplates[healthIndex]
			}
		},
		// 字符串哈希函数
		hashString(str) {
			let hash = 0
			for (let i = 0; i < str.length; i++) {
				const char = str.charCodeAt(i)
				hash = ((hash << 5) - hash) + char
				hash = hash & hash
			}
			return Math.abs(hash)
		},
		getFortuneTitle(key) {
			const titleMap = {
				overall: '整体运势',
				career: '事业运势',
				wealth: '财运分析',
				love: '感情运势',
				health: '健康建议'
			}
			return titleMap[key]
		},
		goToHome() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		closeReport() {
			this.showReport = false
		},
		recalculate() {
			uni.redirectTo({
				url: '/pages/daily/index'
			})
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
.fortune-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.bazi-cell,
.element-cell,
.fortune-cell {
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
.fortune-cell.show {
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
.fortune-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.cell-value,
.element-value,
.fortune-desc {
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

.report-buttons {
	display: flex;
	justify-content: center;
	gap: 40rpx;
	margin-top: 60rpx;
}

.report-btn {
	width: 240rpx;
	height: 80rpx;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 20rpx rgba(255,215,0,0.5);
}

.report-btn text {
	font-size: 32rpx;
	font-weight: bold;
}

.report-btn.recalculate {
	background: linear-gradient(90deg, #ffd700, #ffa500);
}

.report-btn.recalculate text {
	color: #1a0b2e;
}

.report-btn.back-home {
	background: linear-gradient(90deg, #4a90e2, #357abd);
}

.report-btn.back-home text {
	color: #fff;
}
</style> 
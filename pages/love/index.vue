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
		
		<!-- 分析流程 -->
		<view class="analysis-container">
			<!-- 用户命盘 -->
			<view class="analysis-box" v-if="currentStep === 0">
				<view class="analysis-title">用户命盘</view>
				<view class="analysis-content">
					<view class="palace" v-for="(palace, index) in palaces" :key="index"
						:class="{ 'show': palace.show }">
						<text class="palace-name">{{palace.name}}</text>
						<text class="palace-star">{{palace.star}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 夫妻宫主星解析 -->
			<view class="analysis-box" v-if="currentStep === 1">
				<view class="analysis-title">夫妻宫主星解析</view>
				<view class="analysis-content">
					<view class="star-analysis" v-for="(star, index) in spouseStars" :key="index"
						:class="{ 'show': star.show }">
						<text class="star-name">{{star.name}}</text>
						<text class="star-desc">{{star.desc}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 红鸾/天喜星轨迹 -->
			<view class="analysis-box" v-if="currentStep === 2">
				<view class="analysis-title">红鸾/天喜星轨迹</view>
				<view class="analysis-content">
					<view class="star-path" v-for="(path, index) in starPaths" :key="index"
						:class="{ 'show': path.show }">
						<text class="path-name">{{path.name}}</text>
						<text class="path-time">{{path.time}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 大运流年分析 -->
			<view class="analysis-box" v-if="currentStep === 3">
				<view class="analysis-title">大运流年分析</view>
				<view class="analysis-content">
					<view class="year-analysis" v-for="(year, index) in yearAnalysis" :key="index"
						:class="{ 'show': year.show }">
						<text class="year-time">{{year.time}}</text>
						<text class="year-desc">{{year.desc}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 性格特质匹配 -->
			<view class="analysis-box" v-if="currentStep === 4">
				<view class="analysis-title">性格特质匹配</view>
				<view class="analysis-content">
					<view class="trait-match" v-for="(trait, index) in traits" :key="index"
						:class="{ 'show': trait.show }">
						<text class="trait-name">{{trait.name}}</text>
						<view class="match-bar">
							<view class="match-fill" :style="{width: trait.match + '%'}"></view>
						</view>
						<text class="match-value">{{trait.match}}%</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 姻缘时间窗口 -->
			<view class="analysis-box" v-if="currentStep === 5">
				<view class="analysis-title">姻缘时间窗口</view>
				<view class="analysis-content">
					<view class="time-window" v-for="(window, index) in timeWindows" :key="index"
						:class="{ 'show': window.show }">
						<text class="window-time">{{window.time}}</text>
						<text class="window-desc">{{window.desc}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 感情危机预警 -->
			<view class="analysis-box" v-if="currentStep === 6">
				<view class="analysis-title">感情危机预警</view>
				<view class="analysis-content">
					<view class="warning-item" v-for="(warning, index) in warnings" :key="index"
						:class="{ 'show': warning.show }">
						<text class="warning-time">{{warning.time}}</text>
						<text class="warning-desc">{{warning.desc}}</text>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 三维正缘模型 -->
			<view class="analysis-box" v-if="currentStep === 7">
				<view class="analysis-title">三维正缘模型</view>
				<view class="analysis-content">
					<view class="model-dimension" v-for="(dim, index) in dimensions" :key="index"
						:class="{ 'show': dim.show }">
						<text class="dim-name">{{dim.name}}</text>
						<view class="dim-value">
							<text class="value-text">{{dim.value}}</text>
							<view class="value-bar">
								<view class="value-fill" :style="{width: dim.score + '%'}"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="analysis-line" v-for="(line, index) in analysisLines" :key="index"
					:class="{ 'show': line.show }">
					{{line.text}}
				</view>
			</view>
			
			<!-- 最终报告 -->
			<view class="final-report" v-if="finalReport.show" @click="closeReport">
				<view class="report-content">
					<view v-for="(item, index) in finalReport.content" :key="index" 
						:class="['report-item', item.type, { 'show': item.show }]">
						<template v-if="item.type === 'title'">
							<text class="report-title">{{item.text}}</text>
						</template>
						<template v-else-if="item.type === 'summary'">
							<text class="report-summary">{{item.text}}</text>
						</template>
						<template v-else-if="item.type === 'section'">
							<text class="section-title">{{item.title}}</text>
							<view class="section-items">
								<text v-for="(subItem, subIndex) in item.items" :key="subIndex" 
									class="section-item">{{subItem}}</text>
							</view>
						</template>
						<template v-else-if="item.type === 'conclusion'">
							<text class="report-conclusion">{{item.text}}</text>
						</template>
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
export default {
	data() {
		return {
			showAnimation: true,
			showFortune: false,
			currentStep: 0,
			userInfo: null,
			fortuneData: {
				// ... 其他数据
			},
			analysisLines: [],
			palaces: [],
			spouseStars: [],
			starPaths: [],
			yearAnalysis: [],
			traits: [],
			timeWindows: [],
			warnings: [],
			dimensions: [],
			finalReport: {
				show: false,
				content: []
			},
			stars: [],
			showRecalculateBtn: false
		}
	},
	onLoad() {
		this.initBackground()
		this.getUserInfo()
	},
	onShow() {
		// 每次页面显示时检查用户信息是否更新
		this.checkUserInfoUpdate()
	},
	mounted() {
		// 获取用户信息
		this.getUserInfo()
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
			this.analysisLines = []
			this.palaces = []
			this.spouseStars = []
			this.starPaths = []
			this.yearAnalysis = []
			this.traits = []
			this.timeWindows = []
			this.warnings = []
			this.dimensions = []
			this.finalReport = {
				show: false,
				content: []
			}
			
			// 开始完整的分析流程
			this.analyzePalace()
		},
		
		analyzePalace() {
			// 使用用户生日生成种子
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在分析命盘...', show: false },
				{ text: '正在定位夫妻宫...', show: false },
				{ text: '正在分析主星...', show: false }
			]
			
			// 根据用户信息生成宫位数据
			this.palaces = Array(12).fill().map((_, index) => {
				const palaceSeed = this.hashString(seed + index)
				const stars = ['紫微', '天机', '太阳', '武曲', '天同', '廉贞',
					'天府', '太阴', '贪狼', '巨门', '天相', '天梁']
				const starIndex = palaceSeed % stars.length
				
				return {
					name: ['命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫', 
						'迁移宫', '仆役宫', '官禄宫', '田宅宫', '福德宫', '父母宫'][index],
					star: stars[starIndex],
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index === 1) {
						this.$set(this.palaces, 2, { ...this.palaces[2], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 1
				this.analyzeSpouseStar()
			}, 2000)
		},
		
		analyzeSpouseStar() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在解析夫妻宫主星...', show: false },
				{ text: '正在分析星曜特质...', show: false },
				{ text: '正在计算星曜影响...', show: false }
			]
			
			// 根据用户信息生成主星数据
			this.spouseStars = Array(3).fill().map((_, index) => {
				const starSeed = this.hashString(seed + 'spouse' + index)
				const traits = [
					'主贵气，配偶气质高雅',
					'主智慧，配偶聪明机敏',
					'主光明，配偶热情开朗',
					'主刚毅，配偶性格坚毅',
					'主温和，配偶性格温和',
					'主多情，配偶感情丰富'
				]
				const traitIndex = starSeed % traits.length
				
				return {
					name: ['紫微', '天机', '太阳', '武曲', '天同', '廉贞'][starSeed % 6],
					desc: traits[traitIndex],
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.spouseStars, index, { ...this.spouseStars[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 2
				this.analyzeStarPath()
			}, 2000)
		},
		
		analyzeStarPath() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在计算红鸾星轨迹...', show: false },
				{ text: '正在计算天喜星轨迹...', show: false },
				{ text: '正在分析星曜交汇...', show: false }
			]
			
			// 根据用户信息生成星曜轨迹
			this.starPaths = Array(2).fill().map((_, index) => {
				const pathSeed = this.hashString(seed + 'path' + index)
				const currentYear = new Date().getFullYear()
				const yearOffset = (pathSeed % 5) + 1
				
				return {
					name: index === 0 ? '红鸾' : '天喜',
					time: `${currentYear + yearOffset}-${currentYear + yearOffset + 1}`,
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.starPaths, index, { ...this.starPaths[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 3
				this.analyzeYear()
			}, 2000)
		},
		
		analyzeYear() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在分析大运...', show: false },
				{ text: '正在计算流年...', show: false },
				{ text: '正在预测运势...', show: false }
			]
			
			// 根据用户信息生成年份分析
			this.yearAnalysis = Array(3).fill().map((_, index) => {
				const yearSeed = this.hashString(seed + 'year' + index)
				const currentYear = new Date().getFullYear()
				const yearOffset = (yearSeed % 3)
				const descriptions = [
					'桃花运旺盛，易遇正缘',
					'感情稳定，适合结婚',
					'感情考验，需要经营',
					'感情升温，适合表白',
					'感情波动，需要沟通'
				]
				const descIndex = yearSeed % descriptions.length
				
				return {
					time: `${currentYear + yearOffset}年`,
					desc: descriptions[descIndex],
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.yearAnalysis, index, { ...this.yearAnalysis[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 4
				this.analyzeTraits()
			}, 2000)
		},
		
		analyzeTraits() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在分析性格特质...', show: false },
				{ text: '正在计算匹配度...', show: false },
				{ text: '正在生成特质报告...', show: false }
			]
			
			// 根据用户信息生成性格特质
			this.traits = Array(3).fill().map((_, index) => {
				const traitSeed = this.hashString(seed + 'trait' + index)
				const traits = [
					{ name: '性格互补', base: 80 },
					{ name: '价值观', base: 85 },
					{ name: '生活习惯', base: 75 },
					{ name: '兴趣爱好', base: 70 },
					{ name: '沟通方式', base: 90 }
				]
				const traitIndex = traitSeed % traits.length
				const match = Math.min(100, traits[traitIndex].base + (traitSeed % 10))
				
				return {
					name: traits[traitIndex].name,
					match: match,
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.traits, index, { ...this.traits[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 5
				this.analyzeTimeWindow()
			}, 2000)
		},
		
		analyzeTimeWindow() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在计算姻缘时间...', show: false },
				{ text: '正在分析最佳时机...', show: false },
				{ text: '正在生成时间窗口...', show: false }
			]
			
			// 根据用户信息生成时间窗口
			this.timeWindows = Array(3).fill().map((_, index) => {
				const windowSeed = this.hashString(seed + 'window' + index)
				const currentYear = new Date().getFullYear()
				const month = (windowSeed % 12) + 1
				const yearOffset = Math.floor(index / 2)
				const descriptions = [
					'桃花运旺盛，易遇正缘',
					'感情升温，适合表白',
					'感情稳定，适合结婚',
					'感情考验，需要经营',
					'感情波动，需要沟通'
				]
				const descIndex = windowSeed % descriptions.length
				
				return {
					time: `${currentYear + yearOffset}年${month}月`,
					desc: descriptions[descIndex],
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.timeWindows, index, { ...this.timeWindows[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 6
				this.analyzeWarning()
			}, 2000)
		},
		
		analyzeWarning() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在分析感情危机...', show: false },
				{ text: '正在计算预警时间...', show: false },
				{ text: '正在生成预警报告...', show: false }
			]
			
			// 根据用户信息生成预警信息
			this.warnings = Array(3).fill().map((_, index) => {
				const warningSeed = this.hashString(seed + 'warning' + index)
				const currentYear = new Date().getFullYear()
				const month = (warningSeed % 12) + 1
				const yearOffset = Math.floor(index / 2) + 1
				const descriptions = [
					'感情波动期，需要沟通',
					'外界干扰，需要信任',
					'感情考验，需要坚持',
					'价值观冲突，需要理解',
					'生活习惯差异，需要磨合'
				]
				const descIndex = warningSeed % descriptions.length
				
				return {
					time: `${currentYear + yearOffset}年${month}月`,
					desc: descriptions[descIndex],
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.warnings, index, { ...this.warnings[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.currentStep = 7
				this.analyzeDimension()
			}, 2000)
		},
		
		analyzeDimension() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			this.analysisLines = [
				{ text: '正在生成三维模型...', show: false },
				{ text: '正在计算维度得分...', show: false },
				{ text: '正在生成最终报告...', show: false }
			]
			
			// 根据用户信息生成维度分析
			this.dimensions = Array(3).fill().map((_, index) => {
				const dimSeed = this.hashString(seed + 'dimension' + index)
				const dimensions = [
					{ name: '性格维度', value: '互补型', base: 80 },
					{ name: '时间维度', value: '近期型', base: 85 },
					{ name: '空间维度', value: '同城型', base: 75 },
					{ name: '价值观维度', value: '契合型', base: 90 },
					{ name: '生活维度', value: '协调型', base: 70 }
				]
				const dimIndex = dimSeed % dimensions.length
				const score = Math.min(100, dimensions[dimIndex].base + (dimSeed % 10))
				
				return {
					name: dimensions[dimIndex].name,
					value: dimensions[dimIndex].value,
					score: score,
					show: false
				}
			})
			
			this.analysisLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.analysisLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.dimensions, index, { ...this.dimensions[index], show: true })
					}
				}, index * 500)
			})
			
			setTimeout(() => {
				this.generateFinalReport()
			}, 2000)
		},
		
		generateFinalReport() {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			// 根据用户信息生成最终报告
			this.finalReport.content = [
				{ type: 'title', text: '正缘分析报告', show: false },
				{ type: 'summary', text: '基于您的命盘分析，以下是您的正缘特征和姻缘预测：', show: false },
				{ type: 'section', title: '正缘特征', items: [
					`性格互补型，匹配度${this.traits[0].match}%`,
					`价值观高度契合，匹配度${this.traits[1].match}%`,
					`生活习惯基本一致，匹配度${this.traits[2].match}%`
				], show: false },
				{ type: 'section', title: '最佳相遇时间', items: [
					`${this.timeWindows[0].time}：${this.timeWindows[0].desc}`,
					`${this.timeWindows[1].time}：${this.timeWindows[1].desc}`,
					`${this.timeWindows[2].time}：${this.timeWindows[2].desc}`
				], show: false },
				{ type: 'section', title: '感情发展建议', items: [
					`${this.warnings[0].time}：${this.warnings[0].desc}`,
					`${this.warnings[1].time}：${this.warnings[1].desc}`,
					`${this.warnings[2].time}：${this.warnings[2].desc}`
				], show: false },
				{ type: 'conclusion', text: `综合分析显示，您的正缘将在${this.starPaths[0].time}年间出现，建议把握时机，主动出击。`, show: false }
			]
			
			this.finalReport.content.forEach((item, index) => {
				setTimeout(() => {
					this.$set(this.finalReport.content, index, { ...item, show: true })
				}, index * 500)
			})
			
			setTimeout(() => {
				this.finalReport.show = true
			}, this.finalReport.content.length * 500)
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
		},
		
		// 生成种子值
		getSeed(birthday) {
			const birthDate = new Date(birthday)
			// 使用生日的毫秒时间戳作为种子
			return birthDate.getTime().toString()
		},
		
		// 计算运势值
		calculateValue(seed, type) {
			// 使用种子生成固定范围内的随机值
			const hash = this.hashString(seed + type)
			return Math.floor((hash % 30) + 70) // 70-100之间的值
		},
		
		// 简单的字符串哈希函数
		hashString(str) {
			let hash = 0
			for (let i = 0; i < str.length; i++) {
				const char = str.charCodeAt(i)
				hash = ((hash << 5) - hash) + char
				hash = hash & hash
			}
			return Math.abs(hash)
		},
		
		// 获取用户信息
		async getUserInfo() {
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo && userInfo.birthDate) {
					console.log('获取到的用户信息:', userInfo)
					this.userInfo = userInfo
					this.startAnalysis()
				} else {
					console.log('用户信息不完整:', userInfo)
					// 使用 switchTab 跳转到个人中心
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
				}
			} catch (e) {
				console.error('获取用户信息失败:', e)
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
			}
		},
		
		// 检查用户信息是否更新
		async checkUserInfoUpdate() {
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo && userInfo.birthDate) {
					// 检查用户信息是否有变化
					if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
						console.log('用户信息已更新:', userInfo)
						this.userInfo = userInfo
						// 重置分析状态
						this.currentStep = 0
						this.analysisLines = []
						this.palaces = []
						this.spouseStars = []
						this.starPaths = []
						this.yearAnalysis = []
						this.traits = []
						this.timeWindows = []
						this.warnings = []
						this.dimensions = []
						this.finalReport = {
							show: false,
							content: []
						}
						// 重新开始分析
						this.startAnalysis()
					}
				} else {
					console.log('用户信息不完整:', userInfo)
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
				}
			} catch (e) {
				console.error('检查用户信息更新失败:', e)
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
			}
		},
		
		// 计算运势
		calculateFortune() {
			if (!this.userInfo || !this.userInfo.birthDate) {
				console.error('用户信息缺失')
				uni.navigateTo({
					url: '/pages/user/index',
					fail: (err) => {
						console.error('跳转失败:', err)
						uni.redirectTo({
							url: '/pages/user/index',
							fail: (err) => {
								console.error('重定向失败:', err)
								uni.showToast({
									title: '请先完善个人信息',
									icon: 'none',
									duration: 2000
								})
							}
						})
					}
				})
				return
			}
			
			// 使用生日作为种子
			const seed = this.getSeed(this.userInfo.birthDate)
			
			// 计算八字运势
			this.fortuneData.bazi = {
				career: this.calculateValue(seed, 'career'),
				wealth: this.calculateValue(seed, 'wealth'),
				relationship: this.calculateValue(seed, 'relationship')
			}
			
			// 计算紫微斗数运势
			this.fortuneData.ziwei = {
				minggong: this.calculateValue(seed, 'minggong'),
				shengong: this.calculateValue(seed, 'shengong')
			}
			
			// 计算奇门遁甲运势
			this.fortuneData.qimen = {
				tianpan: this.calculateValue(seed, 'tianpan'),
				dipan: this.calculateValue(seed, 'dipan')
			}
			
			// 生成运势建议
			this.fortuneData.advice = {
				good: this.generateAdvice(seed, 'good'),
				bad: this.generateAdvice(seed, 'bad')
			}
			
			// 开始动画
			this.startAnimation()
		},
		
		goToHome() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		
		closeReport() {
			this.finalReport.show = false
		},
		
		recalculate() {
			uni.redirectTo({
				url: '/pages/love/index'
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

.palace {
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.palace.show {
	opacity: 1;
	transform: scale(1);
	animation: palaceGlow 2s infinite;
}

@keyframes palaceGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.palace-name {
	font-size: 24rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.palace-star {
	font-size: 32rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.star-analysis {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.star-analysis.show {
	opacity: 1;
	transform: translateY(0);
	animation: starGlow 2s infinite;
}

@keyframes starGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.star-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.star-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.star-path {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	opacity: 0;
	transform: translateX(-20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.star-path.show {
	opacity: 1;
	transform: translateX(0);
	animation: pathGlow 2s infinite;
}

@keyframes pathGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.path-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.path-time {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.year-analysis {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.year-analysis.show {
	opacity: 1;
	transform: translateY(0);
	animation: yearGlow 2s infinite;
}

@keyframes yearGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.year-time {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.year-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.trait-match {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	gap: 20rpx;
	opacity: 0;
	transform: translateX(-20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	position: relative;
	z-index: 10;
	margin-top: 100rpx;
}

.trait-match.show {
	opacity: 1;
	transform: translateX(0);
	animation: traitGlow 2s infinite;
}

@keyframes traitGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.trait-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	width: 200rpx;
}

.match-bar {
	flex: 1;
	height: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.match-fill {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 10rpx;
	transition: width 0.5s ease;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.match-value {
	font-size: 28rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	width: 80rpx;
	text-align: right;
}

.time-window {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.time-window.show {
	opacity: 1;
	transform: translateY(0);
	animation: windowGlow 2s infinite;
}

@keyframes windowGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.window-time {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.window-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.warning-item {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.warning-item.show {
	opacity: 1;
	transform: translateY(0);
	animation: warningGlow 2s infinite;
}

@keyframes warningGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,0,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,0,0,0.6); }
}

.warning-time {
	font-size: 32rpx;
	color: #ff0000;
	text-shadow: 0 0 10rpx rgba(255,0,0,0.5);
}

.warning-desc {
	font-size: 28rpx;
	color: #ff9999;
	text-shadow: 0 0 10rpx rgba(255,153,153,0.5);
}

.model-dimension {
	width: 100%;
	padding: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	opacity: 0;
	transform: translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.model-dimension.show {
	opacity: 1;
	transform: translateY(0);
	animation: dimensionGlow 2s infinite;
}

@keyframes dimensionGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.dim-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.dim-value {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.value-text {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
	width: 200rpx;
}

.value-bar {
	flex: 1;
	height: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.value-fill {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 10rpx;
	transition: width 0.5s ease;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.5);
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
}

.section-item::before {
	content: '•';
	position: absolute;
	left: 0;
	color: #ffd700;
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
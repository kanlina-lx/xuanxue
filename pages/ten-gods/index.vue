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
			<!-- 十神分析 -->
			<view class="analysis-box" v-if="currentStep === 0">
				<view class="analysis-title">十神分析</view>
				<view class="analysis-content">
					<view class="god-item" v-for="(god, index) in gods" :key="index"
						:class="{ 'show': god.show }">
						<text class="god-name">{{god.name}}</text>
						<text class="god-desc">{{god.desc}}</text>
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
						<view class="report-btn recalculate" @click.stop="recalculate">
							<text>重新计算</text>
						</view>
						<view class="report-btn back-home" @click.stop="goToHome">
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
			currentStep: 0,
			userInfo: null,
			analysisLines: [],
			gods: [],
			finalReport: {
				show: false,
				content: []
			},
			stars: [],
			hasInitializedStars: false
		}
	},
	onLoad() {
		// 初始化背景
		this.initBackground()
		// 获取用户信息
		this.getUserInfo()
	},
	onShow() {
		// 检查用户信息是否更新
		this.checkUserInfoUpdate()
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
			this.gods = []
			this.finalReport = {
				show: false,
				content: []
			}
			
			// 显示是否跳过动画提示
			uni.showModal({
				title: '提示',
				content: '是否跳过动画展示直接查看结果？',
				success: (res) => {
					// 无论用户选择是或否，都会执行相同的计算逻辑，只是展示方式不同
					this.analyzeGods(res.confirm)
				}
			})
		},
		analyzeGods(skipAnimation = false) {
			const seed = this.getSeed(this.userInfo.birthDate)
			
			// 根据用户信息生成十神数据
			this.gods = Array(10).fill().map((_, index) => {
				const godSeed = this.hashString(seed + index)
				const gods = [
					{ name: '正官', desc: '代表权力、地位、名誉' },
					{ name: '偏官', desc: '代表压力、竞争、挑战' },
					{ name: '正印', desc: '代表智慧、学识、贵人' },
					{ name: '偏印', desc: '代表神秘、灵感、偏门' },
					{ name: '正财', desc: '代表财富、稳定、务实' },
					{ name: '偏财', desc: '代表投机、意外、流动' },
					{ name: '食神', desc: '代表才华、享受、福气' },
					{ name: '伤官', desc: '代表创新、叛逆、才华' },
					{ name: '比肩', desc: '代表竞争、合作、朋友' },
					{ name: '劫财', desc: '代表竞争、争夺、破财' }
				]
				const godIndex = godSeed % gods.length
				
				return {
					name: gods[godIndex].name,
					desc: gods[godIndex].desc,
					show: false
				}
			})
			
			if (skipAnimation) {
				// 跳过动画，直接生成报告
				this.generateFinalReport()
			} else {
				// 显示分析过程动画
				this.analysisLines = [
					{ text: '正在分析十神...', show: false },
					{ text: '正在计算影响...', show: false },
					{ text: '正在生成报告...', show: false }
				]
				
				this.analysisLines.forEach((line, index) => {
					setTimeout(() => {
						this.$set(this.analysisLines, index, { ...line, show: true })
						if (index < 2) {
							this.$set(this.gods, index, { ...this.gods[index], show: true })
						}
					}, index * 500)
				})
				
				setTimeout(() => {
					this.generateFinalReport()
				}, 2000)
			}
		},
		generateFinalReport() {
			// 确保十神数据已生成
			if (!this.gods || this.gods.length === 0) {
				this.analyzeGods(true)
				return
			}
			
			// 确保所有十神数据都显示
			this.gods.forEach((god, index) => {
				this.$set(this.gods, index, { ...god, show: true })
			})
			
			// 生成报告内容
			this.finalReport.content = [
				{ type: 'title', text: '十神分析报告', show: false },
				{ type: 'summary', text: '基于您的八字分析，以下是您的十神特征和影响：', show: false },
				{ type: 'section', title: '主要十神', items: [
					`${this.gods[0].name}：${this.gods[0].desc}`,
					`${this.gods[1].name}：${this.gods[1].desc}`,
					`${this.gods[2].name}：${this.gods[2].desc}`
				], show: false },
				{ type: 'section', title: '次要十神', items: [
					`${this.gods[3].name}：${this.gods[3].desc}`,
					`${this.gods[4].name}：${this.gods[4].desc}`,
					`${this.gods[5].name}：${this.gods[5].desc}`
				], show: false },
				{ type: 'conclusion', text: '综合分析显示，您的命局中十神分布均衡，建议把握机遇，发挥优势。', show: false }
			]
			
			// 显示报告内容
			this.finalReport.content.forEach((item, index) => {
				setTimeout(() => {
					this.$set(this.finalReport.content, index, { ...item, show: true })
				}, index * 500)
			})
			
			// 显示报告
			setTimeout(() => {
				this.finalReport.show = true
			}, this.finalReport.content.length * 500)
		},
		// 生成种子值
		getSeed(birthday) {
			const birthDate = new Date(birthday)
			return birthDate.getTime().toString()
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
					this.userInfo = userInfo
					this.startAnalysis()
				} else {
					uni.switchTab({
						url: '/pages/user/index',
						fail: (err) => {
							uni.showToast({
								title: '请先完善个人信息',
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			} catch (e) {
				uni.switchTab({
					url: '/pages/user/index',
					fail: (err) => {
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
					if (JSON.stringify(userInfo) !== JSON.stringify(this.userInfo)) {
						this.userInfo = userInfo
						this.currentStep = 0
						this.analysisLines = []
						this.gods = []
						this.finalReport = {
							show: false,
							content: []
						}
						this.startAnalysis()
					}
				} else {
					uni.switchTab({
						url: '/pages/user/index',
						fail: (err) => {
							uni.showToast({
								title: '请先完善个人信息',
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			} catch (e) {
				uni.switchTab({
					url: '/pages/user/index',
					fail: (err) => {
						uni.showToast({
							title: '请先完善个人信息',
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		},
		goToHome() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		closeReport() {
			this.finalReport.show = false
			this.currentStep = 0
			this.analysisLines = []
			this.gods = []
			this.finalReport = {
				show: false,
				content: []
			}
		},
		recalculate() {
			this.closeReport()
			this.startAnalysis()
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

.god-item {
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

.god-item.show {
	opacity: 1;
	transform: translateY(0);
	animation: godGlow 2s infinite;
}

@keyframes godGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.god-name {
	font-size: 32rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.god-desc {
	font-size: 28rpx;
	color: #e6d5ff;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
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
	transition: all 0.3s ease;
}

.report-btn:active {
	transform: scale(0.95);
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
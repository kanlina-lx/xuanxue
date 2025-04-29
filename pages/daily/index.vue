<template>
	<view class="container">
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="i in 200" :key="i" :style="getStarStyle(i)"></view>
		</view>
		
		<!-- 计算动画 -->
		<view class="calculation-container" v-if="showAnimation">
			<!-- 八字排盘 -->
			<view class="calculation-box" v-if="currentStep === 0">
				<view class="calculation-title">八字排盘</view>
				<view class="calculation-content">
					<view class="bazi-content">
						<view class="bazi-pillar" v-for="(pillar, index) in baziPillars" :key="index"
							:class="{ 'show': pillar.show }">
							<view class="gan">{{pillar.gan}}</view>
							<view class="zhi">{{pillar.zhi}}</view>
						</view>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 紫微斗数 -->
			<view class="calculation-box" v-if="currentStep === 1">
				<view class="calculation-title">紫微斗数</view>
				<view class="calculation-content">
					<view class="ziwei-chart">
						<view class="palace" v-for="(palace, index) in ziweiPalaces" :key="index"
							:style="{transform: `rotate(${index * 30}deg)`}"
							:class="{ 'show': palace.show }">
							<text class="palace-name">{{palace.name}}</text>
						</view>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 奇门遁甲 -->
			<view class="calculation-box" v-if="currentStep === 2">
				<view class="calculation-title">奇门遁甲</view>
				<view class="qimen-grid">
					<view class="grid-cell" v-for="(cell, index) in qimenGrid" :key="index"
						:class="{ 'show': cell.show }">
						{{cell.value}}
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 六爻占卜 -->
			<view class="calculation-box" v-if="currentStep === 3">
				<view class="calculation-title">六爻占卜</view>
				<view class="liuyao-chart">
					<view class="yao" v-for="(yao, index) in liuyaoLines" :key="index"
						:class="{ 'show': yao.show, 'yang': yao.type === 'yang', 'yin': yao.type === 'yin' }">
						<view class="yao-line"></view>
						<view class="yao-text">{{yao.name}}</view>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 梅花易数 -->
			<view class="calculation-box" v-if="currentStep === 4">
				<view class="calculation-title">梅花易数</view>
				<view class="meihua-chart">
					<view class="petal" v-for="(petal, index) in meihuaPetals" :key="index"
						:class="{ 'show': petal.show }">
						<text class="petal-text">{{petal.text}}</text>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 太乙神数 -->
			<view class="calculation-box" v-if="currentStep === 5">
				<view class="calculation-title">太乙神数</view>
				<view class="taiyi-chart">
					<view class="star" v-for="(star, index) in taiyiStars" :key="index"
						:class="{ 'show': star.show }">
						<text class="star-text">{{star.text}}</text>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 大六壬 -->
			<view class="calculation-box" v-if="currentStep === 6">
				<view class="calculation-title">大六壬</view>
				<view class="liuren-chart">
					<view class="palace" v-for="(palace, index) in liurenPalaces" :key="index"
						:class="{ 'show': palace.show }">
						<text class="palace-text">{{palace.text}}</text>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 择日学 -->
			<view class="calculation-box" v-if="currentStep === 7">
				<view class="calculation-title">择日学</view>
				<view class="zeri-chart">
					<view class="day" v-for="(day, index) in zeriDays" :key="index"
						:class="{ 'show': day.show, 'lucky': day.lucky }">
						<text class="day-text">{{day.text}}</text>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
			
			<!-- 风水学 -->
			<view class="calculation-box" v-if="currentStep === 8">
				<view class="calculation-title">风水学</view>
				<view class="fengshui-chart">
					<view class="direction" v-for="(dir, index) in fengshuiDirections" :key="index"
						:class="{ 'show': dir.show, 'lucky': dir.lucky }">
						<text class="direction-text">{{dir.text}}</text>
					</view>
				</view>
				<view class="calculation-animation">
					<view class="calculation-line" v-for="(line, index) in calculationLines" :key="index"
						:class="{ 'show': line.show }">
						{{line.text}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- 运势展示 -->
		<view class="fortune-display" v-if="!showAnimation && showFortune">
			<view class="fortune-header">
				<text class="fortune-title">今日运势</text>
				<text class="fortune-date">{{currentDate}}</text>
			</view>
			
			<view class="fortune-content">
				<!-- 八字运势 -->
				<view class="fortune-section">
					<text class="section-title">八字运势</text>
					<view class="progress-group">
						<view class="progress-item">
							<text class="progress-label">事业运</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.bazi.career + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.bazi.career}}%</text>
						</view>
						<view class="progress-item">
							<text class="progress-label">财运</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.bazi.wealth + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.bazi.wealth}}%</text>
						</view>
						<view class="progress-item">
							<text class="progress-label">感情运</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.bazi.relationship + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.bazi.relationship}}%</text>
						</view>
					</view>
				</view>
				
				<!-- 紫微斗数 -->
				<view class="fortune-section">
					<text class="section-title">紫微斗数</text>
					<view class="progress-group">
						<view class="progress-item">
							<text class="progress-label">命宫</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.ziwei.minggong + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.ziwei.minggong}}%</text>
						</view>
						<view class="progress-item">
							<text class="progress-label">身宫</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.ziwei.shengong + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.ziwei.shengong}}%</text>
						</view>
					</view>
				</view>
				
				<!-- 奇门遁甲 -->
				<view class="fortune-section">
					<text class="section-title">奇门遁甲</text>
					<view class="progress-group">
						<view class="progress-item">
							<text class="progress-label">天盘</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.qimen.tianpan + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.qimen.tianpan}}%</text>
						</view>
						<view class="progress-item">
							<text class="progress-label">地盘</text>
							<view class="progress-bar">
								<view class="progress-fill" :style="{width: fortuneData.qimen.dipan + '%'}"></view>
							</view>
							<text class="progress-value">{{fortuneData.qimen.dipan}}%</text>
						</view>
					</view>
				</view>
				
				<!-- 运势建议 -->
				<view class="fortune-advice">
					<text class="advice-title">运势建议</text>
					<view class="advice-content">
						<text class="advice-text">今日宜：{{fortuneData.advice.good.join('、')}}</text>
						<text class="advice-text">今日忌：{{fortuneData.advice.bad.join('、')}}</text>
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
			currentDate: '',
			userBirthday: '', // 用户生日
			userInfo: null, // 添加用户信息对象
			fortuneData: {
				bazi: {
					career: 0,
					wealth: 0,
					relationship: 0
				},
				ziwei: {
					minggong: 0,
					shengong: 0
				},
				qimen: {
					tianpan: 0,
					dipan: 0
				},
				advice: {
					good: [],
					bad: []
				}
			},
			calculationLines: [],
			baziPillars: [],
			ziweiPalaces: [],
			qimenGrid: [],
			liuyaoLines: [],
			meihuaPetals: [],
			taiyiStars: [],
			liurenPalaces: [],
			zeriDays: [],
			fengshuiDirections: []
		}
	},
	onShow() {
		// 每次页面显示时检查用户信息是否更新
		this.checkUserInfoUpdate()
	},
	mounted() {
		// 获取当前日期
		const now = new Date()
		this.currentDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
		
		// 获取用户信息
		this.getUserInfo()
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo && userInfo.birthDate) {
					console.log('获取到的用户信息:', userInfo)
					this.userInfo = userInfo
					this.userBirthday = userInfo.birthDate
					this.calculateFortune()
				} else {
					console.log('用户信息不完整:', userInfo)
					// 使用 switchTab 跳转到个人中心
					uni.switchTab({
						url: '/pages/user/index'
					})
				}
			} catch (e) {
				console.error('获取用户信息失败:', e)
				uni.switchTab({
					url: '/pages/user/index'
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
						this.userBirthday = userInfo.birthDate
						// 重置运势显示状态
						this.showAnimation = true
						this.showFortune = false
						// 重新计算运势
						this.calculateFortune()
					}
				} else {
					console.log('用户信息不完整:', userInfo)
					uni.switchTab({
						url: '/pages/user/index'
					})
				}
			} catch (e) {
				console.error('检查用户信息更新失败:', e)
				uni.switchTab({
					url: '/pages/user/index'
				})
			}
		},
		
		// 计算运势
		calculateFortune() {
			if (!this.userBirthday) {
				console.error('用户生日信息缺失，当前userBirthday:', this.userBirthday)
				console.error('当前用户信息:', this.userInfo)
				uni.switchTab({
					url: '/pages/user/index'
				})
				return
			}
			
			// 使用生日和当前日期作为种子
			const seed = this.getSeed(this.userBirthday, this.currentDate)
			
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
		
		// 生成种子值
		getSeed(birthday, date) {
			const birthDate = new Date(birthday)
			const currentDate = new Date(date)
			
			// 使用生日和当前日期的组合作为种子
			return `${birthDate.getTime()}_${currentDate.getTime()}`
		},
		
		// 计算运势值
		calculateValue(seed, type) {
			// 使用种子生成固定范围内的随机值
			const hash = this.hashString(seed + type)
			return Math.floor((hash % 30) + 70) // 70-100之间的值
		},
		
		// 生成建议
		generateAdvice(seed, type) {
			const goodAdvices = [
				'投资理财', '商务洽谈', '约会', '学习进修', '健身运动',
				'签订合同', '求职面试', '搬家', '装修', '旅行'
			]
			const badAdvices = [
				'冲动消费', '重大决策', '借贷', '赌博', '争吵',
				'熬夜', '暴饮暴食', '剧烈运动', '危险活动', '拖延'
			]
			
			const hash = this.hashString(seed + type)
			const advices = type === 'good' ? goodAdvices : badAdvices
			const count = (hash % 3) + 1 // 1-3条建议
			
			const result = []
			for (let i = 0; i < count; i++) {
				const index = (hash + i) % advices.length
				result.push(advices[index])
			}
			
			return result
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
		
		getStarStyle(index) {
			// 生成随机位置
			const x = Math.random() * 100
			const y = Math.random() * 100
			// 生成随机大小
			const size = Math.random() * 2 + 1
			// 生成随机闪烁延迟
			const delay = Math.random() * 2
			
			return {
				left: `${x}%`,
				top: `${y}%`,
				width: `${size}rpx`,
				height: `${size}rpx`,
				animationDelay: `${delay}s`
			}
		},
		
		startAnimation() {
			// 重置状态
			this.showAnimation = true
			this.currentStep = 0
			this.calculationLines = []
			this.baziPillars = []
			this.ziweiPalaces = []
			this.qimenGrid = []
			this.liuyaoLines = []
			this.meihuaPetals = []
			this.taiyiStars = []
			this.liurenPalaces = []
			this.zeriDays = []
			this.fengshuiDirections = []
			
			// 开始动画
			this.animateBazi()
		},
		
		animateBazi() {
			this.calculationLines = [
				{ text: '正在计算真太阳时...', show: false },
				{ text: '正在计算年柱...', show: false },
				{ text: '正在计算月柱...', show: false },
				{ text: '正在计算日柱...', show: false },
				{ text: '正在计算时柱...', show: false }
			]
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					// 显示对应的八字柱
					if (index > 0) {
						this.$set(this.baziPillars, index - 1, { 
							gan: ['甲', '乙', '丙', '丁'][index - 1],
							zhi: ['子', '丑', '寅', '卯'][index - 1],
							show: true 
						})
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 1
				this.animateZiwei()
			}, 2000)
		},
		
		animateZiwei() {
			this.calculationLines = [
				{ text: '正在定位命宫...', show: false },
				{ text: '正在计算身宫...', show: false },
				{ text: '正在排布十二宫...', show: false },
				{ text: '正在安放主星...', show: false }
			]
			
			this.ziweiPalaces = Array(12).fill().map((_, index) => ({
				name: ['命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫', 
					'迁移宫', '仆役宫', '官禄宫', '田宅宫', '福德宫', '父母宫'][index],
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					// 显示对应的宫位
					if (index === 0) {
						this.$set(this.ziweiPalaces, 0, { ...this.ziweiPalaces[0], show: true })
					} else if (index === 1) {
						this.$set(this.ziweiPalaces, 6, { ...this.ziweiPalaces[6], show: true })
					} else if (index === 2) {
						// 显示其他宫位
						this.ziweiPalaces.forEach((palace, i) => {
							if (i !== 0 && i !== 6) {
								setTimeout(() => {
									this.$set(this.ziweiPalaces, i, { ...palace, show: true })
								}, (i - 1) * 100)
							}
						})
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 2
				this.animateQimen()
			}, 2000)
		},
		
		animateQimen() {
			this.calculationLines = [
				{ text: '正在排布九宫...', show: false },
				{ text: '正在计算八门...', show: false },
				{ text: '正在定位天盘...', show: false },
				{ text: '正在计算地盘...', show: false }
			]
			
			// 添加九宫格动画
			this.qimenGrid = Array(9).fill().map((_, index) => ({
				show: false,
				value: ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离'][index]
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					// 显示九宫格
					if (index === 0) {
						this.qimenGrid.forEach((cell, i) => {
							setTimeout(() => {
								this.$set(this.qimenGrid, i, { ...cell, show: true })
							}, i * 100)
						})
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 3
				this.animateLiuyao()
			}, 2000)
		},
		
		animateLiuyao() {
			this.calculationLines = [
				{ text: '正在起卦...', show: false },
				{ text: '正在排卦...', show: false },
				{ text: '正在分析卦象...', show: false },
				{ text: '正在解读爻辞...', show: false }
			]
			
			this.liuyaoLines = Array(6).fill().map((_, index) => ({
				name: ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][index],
				type: Math.random() > 0.5 ? 'yang' : 'yin',
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 2) {
						this.$set(this.liuyaoLines, index, { ...this.liuyaoLines[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 4
				this.animateMeihua()
			}, 2000)
		},
		
		animateMeihua() {
			this.calculationLines = [
				{ text: '正在取数...', show: false },
				{ text: '正在计算卦象...', show: false },
				{ text: '正在分析卦辞...', show: false },
				{ text: '正在解读结果...', show: false }
			]
			
			this.meihuaPetals = Array(5).fill().map((_, index) => ({
				text: ['乾', '兑', '离', '震', '巽'][index],
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 3) {
						this.$set(this.meihuaPetals, index, { ...this.meihuaPetals[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 5
				this.animateTaiyi()
			}, 2000)
		},
		
		animateTaiyi() {
			this.calculationLines = [
				{ text: '正在计算太乙数...', show: false },
				{ text: '正在排布太乙盘...', show: false },
				{ text: '正在分析太乙卦...', show: false },
				{ text: '正在解读太乙数...', show: false }
			]
			
			this.taiyiStars = Array(9).fill().map((_, index) => ({
				text: ['天乙', '太乙', '文昌', '天马', '禄存', '天厨', '天福', '天德', '天贵'][index],
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 3) {
						this.$set(this.taiyiStars, index, { ...this.taiyiStars[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 6
				this.animateLiuren()
			}, 2000)
		},
		
		animateLiuren() {
			this.calculationLines = [
				{ text: '正在计算六壬数...', show: false },
				{ text: '正在排布六壬盘...', show: false },
				{ text: '正在分析六壬卦...', show: false },
				{ text: '正在解读六壬数...', show: false }
			]
			
			this.liurenPalaces = Array(12).fill().map((_, index) => ({
				text: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][index],
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 3) {
						this.$set(this.liurenPalaces, index, { ...this.liurenPalaces[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 7
				this.animateZeri()
			}, 2000)
		},
		
		animateZeri() {
			this.calculationLines = [
				{ text: '正在计算黄历...', show: false },
				{ text: '正在分析吉凶...', show: false },
				{ text: '正在选择吉日...', show: false },
				{ text: '正在确定时辰...', show: false }
			]
			
			this.zeriDays = Array(7).fill().map((_, index) => ({
				text: ['初一', '初二', '初三', '初四', '初五', '初六', '初七'][index],
				lucky: Math.random() > 0.5,
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 3) {
						this.$set(this.zeriDays, index, { ...this.zeriDays[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				this.currentStep = 8
				this.animateFengshui()
			}, 2000)
		},
		
		animateFengshui() {
			this.calculationLines = [
				{ text: '正在计算方位...', show: false },
				{ text: '正在分析风水...', show: false },
				{ text: '正在确定吉位...', show: false },
				{ text: '正在解读风水...', show: false }
			]
			
			this.fengshuiDirections = Array(8).fill().map((_, index) => ({
				text: ['东', '东南', '南', '西南', '西', '西北', '北', '东北'][index],
				lucky: Math.random() > 0.5,
				show: false
			}))
			
			this.calculationLines.forEach((line, index) => {
				setTimeout(() => {
					this.$set(this.calculationLines, index, { ...line, show: true })
					if (index < 3) {
						this.$set(this.fengshuiDirections, index, { ...this.fengshuiDirections[index], show: true })
					}
				}, index * 300)
			})
			
			setTimeout(() => {
				// 先隐藏动画
				this.showAnimation = false
				// 延迟一小段时间后显示运势结果
				setTimeout(() => {
					this.$nextTick(() => {
						// 确保DOM更新后再显示运势结果
						this.showFortune = true
					})
				}, 500)
			}, 2000)
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

.constellation {
	position: absolute;
	width: 100%;
	height: 100%;
}

.star-line {
	position: absolute;
	height: 1rpx;
	background: linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent);
	transform-origin: 0 0;
}

.divination-process {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 2;
	overflow: visible;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}

.bazi-animation,
.ziwei-animation,
.qimen-animation,
.liuyao-animation,
.meihua-animation,
.taiyi-animation,
.liuren-animation,
.zeri-animation,
.fengshui-animation {
	position: absolute;
	background: transparent;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	width: 300rpx;
	height: 300rpx;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-sizing: border-box;
}

.bazi-title,
.ziwei-title,
.qimen-title,
.liuyao-title,
.meihua-title,
.taiyi-title,
.liuren-title,
.zeri-title,
.fengshui-title {
	font-size: 36rpx;
	color: #ffd700;
	margin-bottom: 30rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.bazi-content {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	margin-bottom: 30rpx;
	width: 100%;
}

.bazi-pillar {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10rpx;
	width: 100%;
	height: 100rpx;
}

.gan, .zhi {
	width: 100%;
	height: 100%;
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border-radius: 10rpx;
	position: relative;
	overflow: hidden;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.gan {
	grid-column: 1;
	grid-row: 1;
}

.zhi {
	grid-column: 2;
	grid-row: 1;
}

.ziwei-chart {
	width: 400rpx;
	height: 400rpx;
	position: relative;
	margin: 20rpx 0;
}

.palace {
	position: absolute;
	top: 0;
	left: 50%;
	transform-origin: 0 200rpx;
	width: 100%;
	height: 100%;
	opacity: 0;
	transform: rotate(0deg) scale(0.8);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.palace.show {
	opacity: 1;
	transform: rotate(var(--rotation)) scale(1);
}

.palace-name {
	position: absolute;
	top: 10rpx;
	left: 50%;
	transform: translateX(-50%);
	color: #ffd700;
	font-size: 32rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	animation: nameGlow 2s infinite;
	width: 100%;
	text-align: center;
}

@keyframes nameGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.stars {
	position: absolute;
	top: 40rpx;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.star {
	color: #e6d5ff;
	font-size: 20rpx;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.calculation-animation {
	position: absolute;
	bottom: 20rpx;
	left: 0;
	width: 100%;
	padding: 10rpx;
	z-index: 1;
}

.calculation-line {
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

.calculation-line.show {
	opacity: 1;
	transform: translateX(0);
}

.calculation-line::before {
	content: '>';
	display: inline-block;
	margin-right: 10rpx;
	color: #ffd700;
	animation: blink 1s infinite;
}

.calculation-line::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -2rpx;
	width: 0;
	height: 1rpx;
	background: linear-gradient(90deg, transparent, #ffd700, transparent);
	animation: lineGrow 0.5s forwards;
}

@keyframes lineGrow {
	from { width: 0; }
	to { width: 100%; }
}

.calculation-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.calculation-box {
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

.calculation-title {
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

.calculation-content {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	position: relative;
	z-index: 2;
	margin-top: 30rpx;
	width: 100%;
}

.calculation-line {
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

.gan, .zhi {
	width: 100rpx;
	height: 100rpx;
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border-radius: 10rpx;
	position: relative;
	overflow: hidden;
}

.palace-name {
	position: absolute;
	top: 10rpx;
	left: 50%;
	transform: translateX(-50%);
	color: #ffd700;
	font-size: 32rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	animation: nameGlow 2s infinite;
	width: 100%;
	text-align: center;
}

@keyframes nameGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.qimen-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 15rpx;
	width: 100%;
	margin: 30rpx 0;
}

.grid-cell {
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffd700;
	font-size: 36rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	opacity: 0;
	transform: scale(0.8);
	transition: all 0.3s ease;
}

.calculation-animation {
	position: absolute;
	bottom: 20rpx;
	left: 0;
	width: 100%;
	padding: 20rpx;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

@keyframes blink {
	0%, 100% { opacity: 0; }
	50% { opacity: 1; }
}

.liuyao-chart {
	display: flex;
	flex-direction: column;
	gap: 40rpx;
	width: 100%;
	margin: 40rpx 0;
	position: relative;
}

.yao {
	display: flex;
	align-items: center;
	gap: 40rpx;
	opacity: 0;
	transform: translateX(-20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.yao.show {
	opacity: 1;
	transform: translateX(0);
}

.yao-line {
	width: 300rpx;
	height: 4rpx;
	background: #ffd700;
	position: relative;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	animation: lineGlow 2s infinite;
}

@keyframes lineGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.yao-text {
	color: #ffd700;
	font-size: 36rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	margin-left: 20rpx;
}

.meihua-chart {
	position: relative;
	width: 400rpx;
	height: 400rpx;
	margin: 40rpx 0;
	transform-style: preserve-3d;
}

.petal {
	position: absolute;
	width: 120rpx;
	height: 120rpx;
	background: transparent;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8) rotate(0deg);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.petal.show {
	opacity: 1;
	transform: scale(1) rotate(360deg);
	animation: petalFloat 3s infinite;
}

@keyframes petalFloat {
	0%, 100% { transform: translateY(0) rotate(0deg); }
	50% { transform: translateY(-10rpx) rotate(5deg); }
}

.petal-text {
	color: #ffd700;
	font-size: 36rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.taiyi-chart {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30rpx;
	width: 100%;
	margin: 40rpx 0;
	padding: 20rpx;
	perspective: 1000rpx;
}

.star {
	width: 120rpx;
	height: 120rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8) rotateY(0deg);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.star.show {
	opacity: 1;
	transform: scale(1) rotateY(360deg);
	animation: starPulse 2s infinite;
}

@keyframes starPulse {
	0%, 100% { transform: scale(1) rotateY(0deg); }
	50% { transform: scale(1.1) rotateY(180deg); }
}

.star-text {
	color: #ffd700;
	font-size: 36rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.liuren-chart {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30rpx;
	width: 100%;
	margin: 40rpx 0;
	padding: 20rpx;
	position: relative;
}

.palace {
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8) translateY(20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.palace.show {
	opacity: 1;
	transform: scale(1) translateY(0);
	animation: palaceGlow 2s infinite;
}

@keyframes palaceGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.palace-text {
	color: #ffd700;
	font-size: 36rpx;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.zeri-chart {
	display: flex;
	flex-wrap: wrap;
	gap: 30rpx;
	width: 100%;
	margin: 40rpx 0;
	padding: 20rpx;
	justify-content: center;
	perspective: 1000rpx;
}

.day {
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8) rotateX(0deg);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.day.show {
	opacity: 1;
	transform: scale(1) rotateX(360deg);
	animation: dayFloat 2s infinite;
}

.day.lucky {
	background: rgba(255,215,0,0.2);
	animation: luckyGlow 2s infinite;
}

@keyframes dayFloat {
	0%, 100% { transform: translateY(0) rotateX(0deg); }
	50% { transform: translateY(-10rpx) rotateX(180deg); }
}

@keyframes luckyGlow {
	0%, 100% { box-shadow: 0 0 10rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 20rpx rgba(255,215,0,0.6); }
}

.fengshui-chart {
	position: relative;
	width: 400rpx;
	height: 400rpx;
	margin: 40rpx 0;
	transform-style: preserve-3d;
}

.direction {
	position: absolute;
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transform: scale(0.8) rotate(0deg);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.direction.show {
	opacity: 1;
	transform: scale(1) rotate(360deg);
	animation: directionFloat 3s infinite;
}

.direction.lucky {
	background: rgba(255,215,0,0.2);
	animation: luckyGlow 2s infinite;
}

@keyframes directionFloat {
	0%, 100% { transform: translate(0, 0) rotate(0deg); }
	25% { transform: translate(10rpx, -10rpx) rotate(90deg); }
	50% { transform: translate(0, -20rpx) rotate(180deg); }
	75% { transform: translate(-10rpx, -10rpx) rotate(270deg); }
}

.calculation-line {
	color: #ffd700;
	font-size: 36rpx;
	margin-bottom: 30rpx;
	opacity: 0;
	transform: translateX(-20rpx);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	position: relative;
	width: 100%;
	text-align: center;
}

.calculation-line.show {
	opacity: 1;
	transform: translateX(0);
	animation: textGlow 2s infinite;
}

@keyframes textGlow {
	0%, 100% { text-shadow: 0 0 10rpx rgba(255,215,0,0.5); }
	50% { text-shadow: 0 0 20rpx rgba(255,215,0,0.8); }
}

.fortune-display {
	position: relative;
	z-index: 2;
	width: 100%;
	padding: 40rpx;
	box-sizing: border-box;
	opacity: 0;
	transform: translateY(20rpx);
	animation: fortuneShow 0.5s forwards;
}

@keyframes fortuneShow {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.fortune-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40rpx;
}

.fortune-title {
	font-size: 48rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	margin-bottom: 20rpx;
}

.fortune-date {
	font-size: 32rpx;
	color: #e6d5ff;
}

.fortune-content {
	background: transparent;
	border-radius: 20rpx;
	padding: 30rpx;
}

.fortune-section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 36rpx;
	color: #ffd700;
	margin-bottom: 20rpx;
	display: block;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.progress-group {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.progress-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.progress-label {
	font-size: 32rpx;
	color: #e6d5ff;
	width: 120rpx;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}

.progress-bar {
	flex: 1;
	height: 20rpx;
	background: transparent;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.3);
}

.progress-fill {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 10rpx;
	transition: width 0.5s ease;
	box-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.progress-value {
	font-size: 28rpx;
	color: #ffd700;
	width: 80rpx;
	text-align: right;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.fortune-advice {
	margin-top: 40rpx;
	padding-top: 30rpx;
	border-top: 1rpx solid rgba(255,215,0,0.2);
}

.advice-title {
	font-size: 36rpx;
	color: #ffd700;
	margin-bottom: 20rpx;
	display: block;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
}

.advice-content {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.advice-text {
	font-size: 32rpx;
	color: #e6d5ff;
	line-height: 1.5;
	text-shadow: 0 0 10rpx rgba(230,213,255,0.5);
}
</style> 
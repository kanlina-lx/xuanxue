<template>
	<view class="container">
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="i in 200" :key="i" :style="getStarStyle(i)"></view>
		</view>
		
		<!-- 占卜动画 -->
		<view class="tarot-animation" v-if="showAnimation">
			<view class="tarot-deck" :class="{ 'shuffling': isShuffling }">
				<view class="tarot-card" v-for="(card, index) in deck" :key="index"
					:style="getCardStyle(index)"
					:class="{ 'selected': card.selected }">
					<view class="card-back"></view>
					<view class="card-front" v-if="card.selected">
						<text class="card-name">{{card.name}}</text>
						<text class="card-meaning">{{card.meaning}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 占卜结果 -->
		<view class="tarot-result" v-if="!showAnimation">
			<!-- 问题输入 -->
			<view class="question-card">
				<view class="card-header">
					<text class="title">塔罗占卜</text>
					<text class="subtitle">请默念您的问题</text>
				</view>
				<view class="question-content">
					<textarea v-model="question" placeholder="请输入您想问的问题..." class="question-input" />
					<button class="submit-btn" @click="startDivination">开始占卜</button>
				</view>
			</view>
			
			<!-- 牌阵展示 -->
			<view class="cards-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌阵分析</text>
					<text class="subtitle">{{spread.name}}</text>
				</view>
				<view class="cards-content">
					<view class="cards-grid">
						<view class="card-item" v-for="(card, index) in spread.cards" :key="index">
							<view class="card-image">
								<text class="card-name">{{card.name}}</text>
							</view>
							<text class="card-position">{{card.position}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 牌意分析 -->
			<view class="interpretation-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌意分析</text>
				</view>
				<view class="interpretation-content">
					<view class="interpretation-item" v-for="(card, index) in spread.cards" :key="index">
						<text class="label">{{card.position}}</text>
						<text class="value">{{card.meaning}}</text>
					</view>
				</view>
			</view>
			
			<!-- 综合解读 -->
			<view class="summary-card" v-if="showResult">
				<view class="card-header">
					<text class="title">综合解读</text>
				</view>
				<view class="summary-content">
					<view class="summary-item">
						<text class="label">整体运势</text>
						<text class="value">{{summary.overall}}</text>
					</view>
					<view class="summary-item">
						<text class="label">建议提醒</text>
						<text class="value">{{summary.advice}}</text>
					</view>
				</view>
			</view>
			
			<!-- 运势提醒 -->
			<view class="reminder-card" v-if="showResult">
				<view class="card-header">
					<text class="title">运势提醒</text>
				</view>
				<view class="reminder-content">
					<view class="reminder-item" v-for="(item, index) in summary.reminders" :key="index">
						<text class="icon">{{item.type === 'good' ? '✓' : '!'}}</text>
						<text class="text">{{item.content}}</text>
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
			question: '',
			showResult: false,
			showAnimation: false,
			isShuffling: false,
			deck: [],
			selectedCards: [],
			spread: {
				name: '三张牌阵',
				cards: [
					{
						name: '愚者',
						position: '过去',
						meaning: '代表新的开始和冒险精神'
					},
					{
						name: '女祭司',
						position: '现在',
						meaning: '代表直觉和内在智慧'
					},
					{
						name: '太阳',
						position: '未来',
						meaning: '代表成功和光明前景'
					}
				]
			},
			summary: {
				overall: '整体运势较好，新的开始带来机遇，需要保持开放和积极的心态。',
				advice: '建议多倾听内心的声音，保持乐观积极的态度。',
				reminders: [
					{type: 'good', content: '适合尝试新事物'},
					{type: 'good', content: '多关注内心感受'},
					{type: 'bad', content: '避免过度理想化'}
				]
			},
			// 塔罗牌数据
			tarotCards: [
				{ name: '愚者', meaning: '新的开始，冒险，天真' },
				{ name: '魔术师', meaning: '创造力，技能，专注' },
				{ name: '女祭司', meaning: '直觉，神秘，智慧' },
				// ... 其他牌
			]
		}
	},
	methods: {
		// 开始占卜
		startDivination() {
			if (!this.question) {
				uni.showToast({
					title: '请输入问题',
					icon: 'none'
				})
				return
			}
			this.showAnimation = true
			this.isShuffling = true
			this.initializeDeck()
			
			// 洗牌动画
			setTimeout(() => {
				this.isShuffling = false
				// 抽牌动画
				this.drawCards()
			}, 2000)
		},
		
		// 初始化牌组
		initializeDeck() {
			this.deck = this.tarotCards.map(card => ({
				...card,
				selected: false,
				position: Math.random() * 360
			}))
		},
		
		// 获取卡片样式
		getCardStyle(index) {
			const card = this.deck[index]
			return {
				transform: `rotate(${card.position}deg)`,
				zIndex: card.selected ? 100 : index
			}
		},
		
		// 抽牌
		drawCards() {
			// 随机选择3张牌
			const selectedIndices = []
			while (selectedIndices.length < 3) {
				const index = Math.floor(Math.random() * this.deck.length)
				if (!selectedIndices.includes(index)) {
					selectedIndices.push(index)
				}
			}
			
			// 依次展示选中的牌
			selectedIndices.forEach((index, i) => {
				setTimeout(() => {
					this.$set(this.deck[index], 'selected', true)
					this.selectedCards.push(this.deck[index])
					
					// 所有牌都展示完后，显示结果
					if (i === selectedIndices.length - 1) {
						setTimeout(() => {
							this.showAnimation = false
							this.showResult = true
						}, 1000)
					}
				}, i * 500)
			})
		},
		
		// 获取星星样式
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

.tarot-animation {
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

.tarot-deck {
	position: relative;
	width: 300rpx;
	height: 500rpx;
	perspective: 1000rpx;
}

.tarot-card {
	position: absolute;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tarot-deck.shuffling .tarot-card {
	animation: shuffle 2s infinite;
}

@keyframes shuffle {
	0% { transform: rotate(0deg) translateY(0); }
	25% { transform: rotate(90deg) translateY(-20rpx); }
	50% { transform: rotate(180deg) translateY(0); }
	75% { transform: rotate(270deg) translateY(20rpx); }
	100% { transform: rotate(360deg) translateY(0); }
}

.card-back, .card-front {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 20rpx;
	box-shadow: 0 0 20rpx rgba(255,215,0,0.3);
}

.card-back {
	
	background-image: url('../../static/tarot/tarot_backend.jpeg');
	background-size: cover;
	transform: rotateY(180deg);
}

.card-front {
	background: rgba(255,215,0,0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	transform: rotateY(0deg);
}

.card-name {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	margin-bottom: 20rpx;
}

.card-meaning {
	font-size: 28rpx;
	color: #e6d5ff;
	text-align: center;
	line-height: 1.5;
}

.tarot-card.selected {
	transform: translateY(-100rpx) rotateY(180deg);
	animation: cardGlow 2s infinite;
}

@keyframes cardGlow {
	0%, 100% { box-shadow: 0 0 20rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 40rpx rgba(255,215,0,0.6); }
}

.tarot-result {
	position: relative;
	z-index: 2;
	width: 100%;
	padding: 40rpx;
	box-sizing: border-box;
	opacity: 0;
	transform: translateY(20rpx);
	animation: resultShow 0.5s forwards;
}

@keyframes resultShow {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.question-card,
.cards-card,
.interpretation-card,
.summary-card,
.reminder-card {
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

.question-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.question-input {
	width: 100%;
	height: 200rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	padding: 20rpx;
	color: #fff;
	font-size: 28rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
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

.cards-content {
	display: flex;
	justify-content: center;
}

.cards-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.card-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.card-image {
	width: 120rpx;
	height: 200rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-position {
	font-size: 24rpx;
	color: #e6d5ff;
}

.interpretation-content,
.summary-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.interpretation-item,
.summary-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
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

.reminder-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.reminder-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	border: 1rpx solid rgba(255,215,0,0.05);
}

.reminder-item .icon {
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

.reminder-item .text {
	font-size: 28rpx;
	color: #e6d5ff;
}
</style> 
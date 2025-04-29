<template>
	<view class="container">
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
</template>

<script>
export default {
	data() {
		return {
			question: '',
			showResult: false,
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
			}
		}
	},
	methods: {
		startDivination() {
			if (!this.question) {
				uni.showToast({
					title: '请输入问题',
					icon: 'none'
				})
				return
			}
			this.showResult = true
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

.card-name {
	font-size: 24rpx;
	color: #ffd700;
	text-align: center;
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
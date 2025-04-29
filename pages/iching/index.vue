<template>
	<view class="container">
		<!-- 占卜问题 -->
		<view class="question-card">
			<view class="card-header">
				<text class="title">周易占卜</text>
				<text class="subtitle">请默念您的问题</text>
			</view>
			<view class="question-content">
				<textarea v-model="question" placeholder="请输入您想问的问题..." class="question-input" />
				<button class="submit-btn" @click="startDivination">开始占卜</button>
			</view>
		</view>
		
		<!-- 卦象展示 -->
		<view class="hexagram-card" v-if="showResult">
			<view class="card-header">
				<text class="title">卦象分析</text>
				<text class="subtitle">{{hexagram.name}}</text>
			</view>
			<view class="hexagram-content">
				<view class="hexagram-lines">
					<view class="line" v-for="(line, index) in hexagram.lines" :key="index">
						<view class="line-content" :class="{'yang': line.type === 'yang', 'yin': line.type === 'yin'}"></view>
					</view>
				</view>
				<view class="hexagram-info">
					<text class="label">卦象含义</text>
					<text class="value">{{hexagram.meaning}}</text>
				</view>
			</view>
		</view>
		
		<!-- 解卦分析 -->
		<view class="interpretation-card" v-if="showResult">
			<view class="card-header">
				<text class="title">解卦分析</text>
			</view>
			<view class="interpretation-content">
				<view class="interpretation-item">
					<text class="label">整体运势</text>
					<text class="value">{{interpretation.overall}}</text>
				</view>
				<view class="interpretation-item">
					<text class="label">事业分析</text>
					<text class="value">{{interpretation.career}}</text>
				</view>
				<view class="interpretation-item">
					<text class="label">感情分析</text>
					<text class="value">{{interpretation.love}}</text>
				</view>
				<view class="interpretation-item">
					<text class="label">财运分析</text>
					<text class="value">{{interpretation.wealth}}</text>
				</view>
			</view>
		</view>
		
		<!-- 建议提醒 -->
		<view class="advice-card" v-if="showResult">
			<view class="card-header">
				<text class="title">建议提醒</text>
			</view>
			<view class="advice-content">
				<view class="advice-item" v-for="(item, index) in advice" :key="index">
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
			hexagram: {
				name: '乾卦',
				meaning: '天行健，君子以自强不息',
				lines: [
					{type: 'yang'},
					{type: 'yang'},
					{type: 'yang'},
					{type: 'yang'},
					{type: 'yang'},
					{type: 'yang'}
				]
			},
			interpretation: {
				overall: '整体运势较为顺利，但需保持谦逊谨慎。',
				career: '事业发展前景良好，适合开拓进取。',
				love: '感情运势平稳，需多沟通交流。',
				wealth: '财运亨通，但需注意理财规划。'
			},
			advice: [
				{type: 'good', content: '近期适合开展新项目'},
				{type: 'good', content: '多与贵人交流合作'},
				{type: 'bad', content: '避免冲动决策'}
			]
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
.hexagram-card,
.interpretation-card,
.advice-card {
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

.hexagram-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30rpx;
}

.hexagram-lines {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.line {
	width: 200rpx;
	height: 20rpx;
	background: rgba(255,255,255,0.1);
	border-radius: 10rpx;
	overflow: hidden;
}

.line-content {
	width: 100%;
	height: 100%;
}

.line-content.yang {
	background: linear-gradient(90deg, #ffd700, #ffa500);
}

.line-content.yin {
	background: linear-gradient(90deg, #e6d5ff, #b388ff);
}

.hexagram-info {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	text-align: center;
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

.interpretation-content,
.advice-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.interpretation-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.advice-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	border: 1rpx solid rgba(255,215,0,0.05);
}

.advice-item .icon {
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

.advice-item .text {
	font-size: 28rpx;
	color: #e6d5ff;
}
</style> 